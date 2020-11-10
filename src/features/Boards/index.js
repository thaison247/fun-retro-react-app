import React from "react";
import { Switch, Route } from "react-router-dom";
import ListBoard from "./pages/ListBoards";
import BoardDetail from "./pages/BoardDetail";

const Board = () => {
  return (
    <Switch>
      <Route path="/boards/:userId" exact component={ListBoard}></Route>
      {/* <Route path="/boards" exact component={ListBoard}></Route> */}
      <Route
        path="/boards/:userId/:boardId"
        exact
        component={BoardDetail}
      ></Route>
    </Switch>
  );
};

export default Board;
