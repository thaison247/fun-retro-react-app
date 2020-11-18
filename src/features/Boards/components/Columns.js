import React, { useEffect, useState } from "react";
import { Button, Modal, Input, Card, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  BarsOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import axios from "axios";
import "./column.css";
import io from "socket.io-client";

let socket;

const Column = ({ col }) => {
  const [listCard, setListCard] = useState([]);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [content, setContent] = useState("");
  const [cardId, setCardId] = useState(null);

  useEffect(() => {
    // socket connection
    socket = io("http://localhost:3001");

    // join to room
    socket.emit("join-column", { room: col.columnId });

    // get initial data
    socket.emit("initial-data", { column_id: col.columnId });

    socket.on("get-data", ({ listCards }) => {
      console.log("list cards: ", listCards);
      setListCard(listCards);
    });

    return function cleanUp() {
      // socket.off("join-column");
      // socket.off("get-data");
    };
  }, []);

  // ADD
  const handleAddCard = () => {
    setVisibleAdd(true);
  };

  const handleAddOk = async () => {
    socket.emit("add-card", {
      column_id: col.columnId,
      content: content,
    });

    setContent("");
    setVisibleAdd(false);
  };

  const handleAddCancel = () => {
    setContent("");
    setVisibleAdd(false);
  };

  // EDIT
  const handleEdit = (cardId) => {
    console.log(cardId);
    setVisibleEdit(true);
    const editContent = listCard.filter((card) => {
      return card.card_id == cardId;
    })[0].content;
    console.log(editContent);
    setContent(editContent);
    setCardId(cardId);
  };

  const handleEditOk = async () => {
    socket.emit("edit-card", {
      card_id: cardId,
      content: content,
      column_id: col.columnId,
    });

    setContent("");
    setVisibleEdit(false);
  };

  const handleEditCancel = () => {
    setContent("");
    setVisibleEdit(false);
  };

  const handleChange = (e) => {
    if (e.target.name === "content") {
      setContent(e.target.value);
    }
  };

  const handleDelete = async (cardId) => {
    // const result = await axios.delete(`http://localhost:3001/cards/${cardId}`, {
    //   userId: 1,
    // });

    socket.emit("delete-card", {
      card_id: cardId,
      column_id: col.columnId,
    });

    setListCard(listCard.filter((card) => card.card_id !== cardId));
  };

  return (
    <div className="column">
      <h3>{col.columnName}</h3>
      <br />
      <Button onClick={handleAddCard}>Add Card To Column</Button>
      {listCard &&
        listCard.map((card) => {
          return (
            <Card
              key={card.card_id}
              bordered={true}
              hoverable={true}
              style={{ width: 350, marginTop: 5 }}
              size={"small"}
              actions={[
                <EditOutlined
                  key="edit"
                  style={{ fontSize: 12 }}
                  onClick={() => handleEdit(card.card_id)}
                />,
                <DeleteOutlined
                  key="delete"
                  style={{ fontSize: 12 }}
                  onClick={() => handleDelete(card.card_id)}
                />,
              ]}
            >
              <p>{card.content}</p>
            </Card>
          );
        })}
      <Modal
        title="Add Card"
        visible={visibleAdd}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
      >
        <Input
          placeholder="Card Content"
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Modal>
      <Modal
        title="Edit Card"
        visible={visibleEdit}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <Input
          placeholder="Card Content"
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Modal>
    </div>
  );
};

export default Column;
