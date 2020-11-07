// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import BoardItem from "./components/BoardItem";
// // import "./style.css";

// function ListBoards() {
//   const [boards, setBoards] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       const fetchURL = "https://sonnt-api-fun-retro.herokuapp.com/boards";
//       const response = await axios.get(fetchURL);
//       setBoards(response.data);
//     }

//     fetchData();
//   }, []);

//   return (
//     <ul className="list-boards">
//       {boards.map((board) => (
//         <li key={board.board_id}>
//           <BoardItem
//             boardName={board.board_name}
//             boardCreatedDate={board.created_date}
//           />
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default ListBoards;
