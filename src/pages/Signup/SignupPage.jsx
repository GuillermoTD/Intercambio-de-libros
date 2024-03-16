import "./SignupPageStyles.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "../../Firebase.config";
import { doc, setDoc } from "firebase/firestore";

import { Button, Form, Input } from "antd";
import { auth } from "../../Firebase.config";
import { useContext, useState } from "react";
import { ContextApp } from "../../context/ContextApp";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [email, setEmail] = useState();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const { setUserProfileInfo } = useContext(ContextApp);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User registered:", user);

      await updateProfile(user, {
        displayName: userName,
      });
      console.log("Username updated successfully.");

      // Agrega el usuario a la colección "users"
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: userName,
        email: email,
        messages: []
      });
      console.log("User added to 'users' collection.");

      // Agrega el usuario a la colección "usersChats"
      await setDoc(doc(db, "usersChats", user.uid), {});
      console.log("User added to 'usersChats' collection.");

      if (!localStorage.getItem("user")) {
        localStorage.setItem("user", JSON.stringify(user));
      }
      console.log(JSON.parse(localStorage.getItem("user")));

      navigate("/");
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <div className="SignupPage">
      <Form
        className="SignInForm"
        name="basic"
        labelCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={() => {}}
        autoComplete="off"
        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}
      >
        <h1 style={{ marginBottom: "3rem", fontSize: "2rem" }}>SignIn</h1>
        <div className="SignInInputs">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input onChange={(event) => setEmail(event.target.value)} />
          </Form.Item>
          <Form.Item
            label="UserName"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input onChange={(event) => setUserName(event.target.value)} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password onChange={(event) => setPassword(event.target.value)} />
          </Form.Item>
        </div>
        <Button
          style={{ height: "2.5rem", width: "7rem", marginTop: "1.4rem" }}
          type="primary"
          htmlType="submit"
          onClick={handleSignup}
        >
          Submit
        </Button>
        <a style={{ marginTop: "1.2rem", textAlign: "center" }} href="#">
          Do you have an account? <br />
          <a href="">Log in</a>
        </a>
      </Form>
    </div>
  );
};
export default SignupPage;
