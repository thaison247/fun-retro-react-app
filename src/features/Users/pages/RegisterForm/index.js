import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import "./style.css";
import axios from "axios";

const RegisterForm = () => {
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    if (values.password != values.repeat_password) {
      console.log("Error");
    } else {
      const res = await axios.post(
        "http://localhost:3001/users/register",
        values
      );
      console.log("after post req: ", res);
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
    </Form>
  );
};

export default RegisterForm;
