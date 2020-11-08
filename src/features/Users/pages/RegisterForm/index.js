import { Form, Input, Button, Alert } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import "./style.css";
import axios from "axios";
import { useState } from "react";

const RegisterForm = () => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);

    if (values.repeat_password != values.password) {
      setAlertType("error");
      setAlertMessage("Repeated password does not match with password!");
    } else {
      try {
        const res = await axios.post(
          "http://localhost:3001/users/register",
          values
        );

        console.log(res.data);
        setAlertType("success");
        setAlertMessage(res.data.message);
      } catch (err) {
        console.log(err);
        setAlertType("error");
        setAlertMessage(err.message);
      } finally {
        setAlertVisible(true);
      }
    }
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      // initialValues={{
      //   remember: true,
      // }}
      onFinish={onFinish}
    >
      <h1>Register</h1>
      <Form.Item
        name="user_name"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your Email!",
          },
        ]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
        name="repeat_password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Repeat password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Register
        </Button>
        Or <a href="">Login now!</a>
      </Form.Item>
      {alertVisible && (
        <Alert
          message={alertMessage}
          // description="You have changed your information."
          type={alertType}
          closable={true}
          style={{ width: 500 }}
          showIcon
          onClose={() => {
            setAlertVisible(false);
          }}
        />
      )}
    </Form>
  );
};

export default RegisterForm;
