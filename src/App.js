import "./App.css";
import ListBoards from "./features/Boards/components/ListBoards";
import "antd/dist/antd.css";
import { PageHeader } from "antd";

function App() {
  return (
    <div className="App">
      <div>
        <PageHeader
          className="site-page-header"
          onBack={() => null}
          title="List Boards"
          subTitle="Showing list boards from API"
        />
      </div>
      <ListBoards />
    </div>
  );
}

export default App;
