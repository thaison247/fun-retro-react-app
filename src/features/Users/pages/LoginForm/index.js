import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./style.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
  const history = useHistory();

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {
      const res = await axios.post("http://localhost:3001/users/login", values);

      if (res.data.data.accessToken) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(res.data.data.accessToken)
        );
      }

      history.push(`/boards/${res.data.data.user.user_id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <h1>Login</h1>
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
          prefix={<UserOutlined className="site-form-item-icon" />}
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
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
