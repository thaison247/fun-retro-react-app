import { Layout, Menu, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import "./App.css";
import Board from "./features/Boards";
import User from "./features/Users";
import LoginForm from "./features/Users/pages/LoginForm";
import AuthProvider from "./context/AuthContext";
import { useAuthContext } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
const { Header, Content, Footer } = Layout;

function App() {
  const { authData } = useAuthContext();

  if (authData) {
    const userInfo = authData.userInfo;
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout className="layout">
          <Header>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <span>List Boards</span>
                <Link to="/boards" />
              </Menu.Item>

              <Menu.Item key="3">
                <span>Register</span>
                <Link to="/users/register" />
              </Menu.Item>
              {authData ? (
                <Menu.Item key="4">
                  <Avatar
                    style={{ backgroundColor: "#87d068" }}
                    icon={<UserOutlined />}
                  />
                  <Link to="/users/register"></Link>
                </Menu.Item>
              ) : (
                <Menu.Item key="2">
                  <span>Login</span>
                  <Link to="/users/login" />
                </Menu.Item>
              )}
            </Menu>
          </Header>
          <Content style={{ padding: "0 50px" }}>
            <div className="site-layout-content">
              <Switch>
                <Route path="/" exact component={LoginForm} />
                <PrivateRoute path="/boards" component={Board} />
                <Route path="/users" component={User} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
