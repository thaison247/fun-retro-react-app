import "antd/dist/antd.css";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Board from "./features/Boards";

function App() {
  return (
    <BrowserRouter>
      <Route to="/boards" component={Board} />
    </BrowserRouter>
  );
}

export default App;
