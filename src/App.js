import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import { BrowserRouter, Link, Route } from "react-router-dom";
import "./App.css";
import Board from "./features/Boards";
import User from "./features/Users";
const { Header, Content, Footer } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout className="layout">
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <span>List Boards</span>
              <Link to="/boards" />
            </Menu.Item>
            <Menu.Item key="2">
              <span>Login</span>
              <Link to="/users/login" />
            </Menu.Item>
            <Menu.Item key="3">
              <span>Register</span>
              <Link to="/users/register" />
            </Menu.Item>
            {/* <Menu.Item key="1">
              <Link to="/boards">List Boards</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/boards">Login</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/boards">Register</Link>
            </Menu.Item> */}
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div className="site-layout-content">
            <Route to="/boards" component={Board} />
            <Route to="/users" component={User} />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
