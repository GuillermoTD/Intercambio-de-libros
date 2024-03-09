import "./LoginPageStyles.css";
import { Button, Form, Input } from "antd";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const LoginPage = () => (
  <div className="LoginPage">
    <Form
      className="LoginFom"
      name="basic"
      labelCol={{
        span: 8,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h1 style={{ marginBottom: "3rem", fontSize: "2rem" }}>Login</h1>

      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Button
        style={{ height: "2.5rem", width: "7rem", marginTop: "1.4rem" }}
        type="primary"
        htmlType="submit"
      >
        Submit
      </Button>
      <a style={{ marginTop: "1.2rem" }} href="#">
        {`Don't`} you have an account? <br />
        <a href="">Create one</a>
      </a>
    </Form>
  </div>
);
export default LoginPage;
