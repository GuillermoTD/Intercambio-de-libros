import "./SignupPageStyles.css";

import { Button, Form, Input } from "antd";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const SignupPage = () => (
  <div className="SignupPage">
    <Form
      className="SignInForm"
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
      <h1 style={{ marginBottom: "3rem", fontSize: "2rem" }}>SignIn</h1>

      <div className="SignInInputs">
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
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email",
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
      </div>

      <Button
        style={{ height: "2.5rem", width: "7rem", marginTop: "1.4rem" }}
        type="primary"
        htmlType="submit"
      >
        Submit
      </Button>
      <a style={{ marginTop: "1.2rem",textAlign:"center" }} href="#">
        Do you have an account? <br />
        <a href="">Log in</a>
      </a>
    </Form>
  </div>
);
export default SignupPage;
