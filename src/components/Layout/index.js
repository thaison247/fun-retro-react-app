import React from "react";
import { Layout as AntLayout } from "antd";
import Header from "components/Header";

const { Content } = AntLayout;

const Layout = ({ children }) => {
  return (
    <AntLayout>
      {children && (
        <>
          <Header />
          <Content>{children}</Content>
        </>
      )}
    </AntLayout>
  );
};

export default Layout;
