import {
  BarsOutlined,
  DeleteOutlined,
  EditOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { Button, Card, Input, Modal, Row, Space } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import "./style.css";

function ListBoards() {
  // const { userId } = match.params;
  const [listBoard, setListBoard] = useState([]);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [name, setName] = useState("");
  const [boardId, setBoardId] = useState(null);
  const history = useHistory();

  useEffect(() => {
    async function fetchBoardList() {
      // const result = await axios.get("http://localhost:3001/boards/" + userId);
      const result = await axios.get("http://localhost:3001/boards/", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`, //"Bearer " + localStorage.getItem("accessToken"),
        },
      });
      console.log(result.data.data.listBoards);
      setListBoard(result.data.data.listBoards);
    }

    fetchBoardList();
  }, []);

  // ADD
  const handleAddBoard = () => {
    setVisibleAdd(true);
  };

  const handleAddOk = async () => {
    const result = await axios.post(
      `http://localhost:3001/boards/`,
      { board_name: name },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`, //"Bearer " + localStorage.getItem("accessToken"),
        },
      }
    );

    if (result) {
      console.log(result.data.data.boardId);
      history.push(`/boards/${result.data.data.boardId}`);
    }
    setVisibleAdd(false);
    setName("");
  };

  const handleAddCancel = () => {
    setName("");
    setVisibleAdd(false);
  };

  // EDIT
  const handleEdit = (boardId) => {
    setVisibleEdit(true);
    const editName = listBoard
      .filter((board) => {
        return board.board_id === boardId;
      })
      .map((board) => board.board_name)[0];
    console.log(editName);
    setName(editName);
    setBoardId(boardId);
  };

  const handleEditOk = async () => {
    const result = await axios.patch(
      `http://localhost:3001/boards/${boardId}`,
      {
        board_name: name,
      }
    );

    setListBoard(
      listBoard.map((board) => {
        if (board.board_id === boardId) {
          return result.data.data.updatedBoard;
        }
        return board;
      })
    );

    console.log(listBoard);

    setVisibleEdit(false);
    setName("");
  };

  const handleEditCancel = () => {
    setName("");
    setVisibleEdit(false);
  };

  //
  const handleChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    }
  };

  const handleDelete = async (boardId) => {
    const result = await axios.delete(
      `http://localhost:3001/boards/${boardId}`,
      {
        userId: 1,
      }
    );

    setListBoard(
      listBoard.filter(
        (board) => board.board_id !== +result.data.data.deletedBoardId
      )
    );
  };

  const handleViewDetail = (boardId) => {
    history.push(`/boards/${boardId}`);
  };

  const handleCopyUrl = (boardId) => {
    const el = document.createElement("textarea");
    el.value = `http://localhost:3000/boards/${boardId}`;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  return (
    <div>
      <Row size="large">
        {listBoard &&
          listBoard.map((board, index) => {
            return (
              <Card
                key={index}
                bordered={true}
                style={{ width: 250, margin: 5 }}
                hoverable={true}
                actions={[
                  <EditOutlined
                    key="edit"
                    onClick={() => handleEdit(board.board_id)}
                  />,
                  <DeleteOutlined
                    key="delete"
                    onClick={() => handleDelete(board.board_id)}
                  />,
                  <BarsOutlined
                    key="view"
                    onClick={() => handleViewDetail(board.board_id)}
                  />,
                  <CopyOutlined
                    key="copy-url"
                    onClick={() => handleCopyUrl(board.board_id)}
                  />,
                ]}
              >
                {board.board_name}
              </Card>
            );
          })}
      </Row>
      <Button onClick={handleAddBoard}>Thêm</Button>
      <Modal
        title={"Add Board"}
        visible={visibleAdd}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
      >
        <Input
          placeholder="Board Name"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </Modal>
      <Modal
        title={"Edit Board"}
        visible={visibleEdit}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <Input
          placeholder="Board Name"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </Modal>
    </div>
  );
}

export default ListBoards;
