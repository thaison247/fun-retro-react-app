import React from "react";
import PropTypes from "prop-types";
import { Card, Avatar } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

BoardItem.propTypes = {
  //   boardId: PropTypes.number,
  boardName: PropTypes.string,
  //   boardUserId: PropTypes.number,
  boardCreatedDate: PropTypes.string,
};

function BoardItem(props) {
  const { boardName, boardCreatedDate } = props;

  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        avatar={
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        }
        title={boardName}
        description={boardCreatedDate}
        typography={boardCreatedDate}
      />
    </Card>
  );
}

export default BoardItem;
