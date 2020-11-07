import React, { useEffect, useState } from "react";
import { Button, Modal, Input, Card, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  BarsOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import axios from "axios";

const Column = ({ col }) => {
  const [listCard, setListCard] = useState([]);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [content, setContent] = useState("");
  const [cardId, setCardId] = useState(null);

  useEffect(() => {
    // Call api get card
    const fetchCards = async () => {
      console.log(col);
      const result = await axios.get(
        "http://localhost:3001/columns/" + col.columnId
      );
      console.log(result);
      setListCard(result.data.data.listCards);
    };
    fetchCards();
  }, []);

  // ADD
  const handleAddCard = () => {
    setVisibleAdd(true);
  };

  const handleAddOk = async () => {
    const result = await axios.post("http://localhost:3001/cards/", {
      columnId: col.columnId,
      cardContent: content,
    });

    console.log(result);

    setListCard([...listCard, result.data.data.card]);
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
      return card.cardId == cardId;
    })[0].cardContent;
    console.log(editContent);
    setContent(editContent);
    setCardId(cardId);
  };

  const handleEditOk = async () => {
    const result = await axios.patch(`http://localhost:3001/cards/${cardId}`, {
      columnId: col.columnId,
      cardContent: content,
    });

    const updatedListCard = listCard.map((card) => {
      if (card.cardId === cardId) {
        return result.data.data.card;
      }
      return card;
    });

    setListCard(updatedListCard);
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
    const result = await axios.delete(`http://localhost:7000/cards/${cardId}`, {
      userId: 1,
    });

    setListCard(listCard.filter((card) => card.cardId !== cardId));
  };

  return (
    <div>
      <label>{col.columnName}</label>
      <br />
      <Button onClick={handleAddCard}>Add Card To Column</Button>
      {listCard &&
        listCard.map((card) => {
          return (
            <Card
              key={card.card_id}
              bordered={false}
              style={{ width: 300 }}
              actions={[
                <EditOutlined
                  key="edit"
                  onClick={() => handleEdit(card.card_id)}
                />,
                <DeleteOutlined
                  key="delete"
                  onClick={() => handleDelete(card.card_id)}
                />,
              ]}
            >
              <p>{card.content}</p>
            </Card>
          );
        })}
      ;
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
