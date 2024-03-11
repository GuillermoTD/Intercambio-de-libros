import "./LoginPageStyles.css";
import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useContext, useState} from "react";
import {useNavigate} from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase.config";
import { ContextApp } from "../../context/ContextApp";



const LoginPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate()
  
  const {isAuthenticated,setIsAuthenticated} = useContext(ContextApp)
  console.log(isAuthenticated);

  const handleLogin = async()=>{
    await signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
      const user = userCredential
      console.log(user)
      setIsAuthenticated(true)
      console.log("usuario logueado")
      navigate("/")
    })
    .catch((error)=>{
      if(error.message == "Firebase: Error (auth/missing-email)."){
        console.log("usuario incorrecto")
        return
      }
      console.log(error.message)
    })
  }

  return (
    <div className="LoginPage">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        style={{
          background: "white",
          padding: "4rem 4rem",
          display: "flex",
          flexDirection: "column",
          justifyContent:"center",
          alignContent:"center"
        }}
      >
        <h1 style={{ marginBottom: "2rem" }}>Login</h1>

        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Username"
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
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Item>
        {/* <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item> */}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%" }}
            onClick={()=>handleLogin()}
          >
            Log in
          </Button>
          Or <Link to="/signup">register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};
export default LoginPage;
