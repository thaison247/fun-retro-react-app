import axios from "axios";
import React, { useEffect, useState } from "react";
import Column from "../../components/Columns";

const BoardDetail = ({ match }) => {
  const [boardInfo, setBoardInfo] = useState({});
  console.log("match: ----> ", match);
  const { userId, boardId } = match.params;

  useEffect(() => {
    const fetchBoardInfo = async () => {
      const res = await axios.get(
        `http://localhost:3001/boards/${userId}/${boardId}/`
      );

      if (res.data.status === "success") {
        console.log(res.data.data);
        setBoardInfo(res.data.data.board);
      }
    };
    fetchBoardInfo();
  }, []);

  return (
    <div>
      <h2>{boardInfo.board_name}</h2>
      {boardInfo.columns &&
        boardInfo.columns.map((col, id) => <Column key={id} col={col} />)}
    </div>
  );
};

export default BoardDetail;
