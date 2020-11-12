import { Layout } from "antd";
import "antd/dist/antd.css";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Board from "./features/Boards";
import User from "./features/Users";

function App() {
  return (
    <BrowserRouter>
      <Route to="/boards" component={Board} />
      <Route to="/users" component={User} />
    </BrowserRouter>
  );
}

export default App;
