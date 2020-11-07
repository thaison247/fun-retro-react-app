import { Button, Form, Input, Alert } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Profile = ({ match }) => {
  const [form] = Form.useForm();
  const { userId } = match.params;

  const [user, setUser] = useState({});
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("http://localhost:3001/users/" + userId);

      if (res.data.status === "success") {
        console.log(res.data.data.user);
        setUser(res.data.data.user);
        form.setFieldsValue({
          user_name: res.data.data.user.user_name,
          email: res.data.data.user.email,
        });
      }
    };
    fetchUser();
  }, []);

  const onFinish = async (values) => {
    // values = { ...values, user_id: userId };
    const res = await axios.patch(
      `http://localhost:3001/users/${userId}`,
      values
    );

    if (res.data.status === "success") {
      setUser(res.data.data.user);
      setAlertVisible(true);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      {...layout}
      form={form}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="user_name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          UPDATE
        </Button>
      </Form.Item>

      <Form.Item className="alert">
        {alertVisible && (
          <Alert
            message="Updated Successfully!"
            description="You have changed your information."
            type="success"
            closable={true}
            style={{ width: 500 }}
            showIcon
            onClose={() => {
              setAlertVisible(false);
            }}
          />
        )}
      </Form.Item>
    </Form>
  );
};

export default Profile;
