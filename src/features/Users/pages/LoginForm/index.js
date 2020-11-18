import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { useHistory } from "react-router-dom";
import "./style.css";
import { useAuthContext } from "../../../../context/AuthContext";

const LoginForm = () => {
  const history = useHistory();
  const { onLogin } = useAuthContext();

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {
      const res = await axios.post("http://localhost:3001/users/login", values);

      if (res.data.status == "success") {
        onLogin(res.data.data);

        console.log(res.data.data);
        history.push("/boards");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const responseGoogle = async (response) => {
    console.log(response);
    try {
      // call api
      const res = await axios.post("http://localhost:3001/users/google-login", {
        tokenId: response.tokenId,
      });

      console.log(res);

      // get response and save to local storage
      if (res.data.status == "success") {
        onLogin(res.data.data);

        console.log(res.data.data);
        history.push("/boards");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const responseFacebook = async (response) => {
    console.log(response);

    try {
      const res = await axios.post(
        "http://localhost:3001/users/facebook-login",
        {
          accessToken: response.accessToken,
          userID: response.userID,
        }
      );

      if (res.data.status == "success") {
        onLogin(res.data.data);

        console.log(res.data.data);
        history.push("/boards");
      }
    } catch (err) {
      console.log(err);
    }
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
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="/users/register">register now!</a>
      </Form.Item>

      <GoogleLogin
        clientId="365584952975-peumpl7kdkkqurb72c7n325lveopap25.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />

      <FacebookLogin
        appId="804911767017673" //APP ID NOT CREATED YET
        fields="name,email,picture"
        callback={responseFacebook}
      />
    </Form>
  );
};

export default LoginForm;
