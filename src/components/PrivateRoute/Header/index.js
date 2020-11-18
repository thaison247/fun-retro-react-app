import React from "react";
import { Avatar, Layout, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuthContext } from "context/AuthContext";

import "./index.scss";

const { Title } = Typography;
const { Header: AntHeader } = Layout;

const Header = () => {
  const { authData } = useAuthContext();
  const { userInfo } = authData;

  return (
    <AntHeader
      className="test"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link to="/boards">
        <Title type="danger" style={{ margin: 0 }}>
          FunRetro
        </Title>
      </Link>
      <div>
        <Avatar
          style={{ backgroundColor: "#87d068" }}
          icon={<UserOutlined />}
        />
        <Link to="/user" style={{ marginLeft: 10 }}>
          {userInfo.username}
        </Link>
      </div>
    </AntHeader>
  );
};

export default Header;
