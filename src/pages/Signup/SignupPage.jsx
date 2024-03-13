import "./SignupPageStyles.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "../../Firebase.config";
import { doc, setDoc } from "firebase/firestore";

import { Button, Form, Input } from "antd";
import { auth } from "../../Firebase.config";
import { useContext, useState } from "react";
import { ContextApp } from "../../context/ContextApp";
import { useNavigate } from "react-router-dom";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const SignupPage = () => {
  const [email, setEmail] = useState();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const { useProfileInfo, setUserProfileInfo } = useContext(ContextApp);
  const navigate = useNavigate();



  const handleSignup = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((useCredential) => {
        const user = useCredential;
        console.log("user registered");
        console.log(user);
        setUserProfileInfo(user)

      })
      .catch((error) => {
        console.log(error.message);
      });

    const user = auth.currentUser;

    if (user) {
      // Actualiza el displayName con el nombre deseado
      updateProfile(user, {
        displayName: userName,
      })
        .then(() => {
          console.log("Nombre de usuario actualizado correctamente");
        })
        .catch((error) => {
          console.error("Error al actualizar el nombre de usuario:", error);
        });
    }
    await setDoc(doc(db, "users", res.user.uid), {
      uid: res.user.uid,
      displayName,
      email,
      messages:[]
    }); //create user firestore
    if (!localStorage.getItem("user")) {
      localStorage.setItem("user", JSON.stringify(user))
    }

    console.log(JSON.parse(localStorage.getItem("user")))

    navigate("/");
  };
  console.log(useProfileInfo)
  return (
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
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input onChange={(event) => setEmail(event.target.value)} />
          </Form.Item>
          <Form.Item
            label="UserName"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input onChange={(event) => setUserName(event.target.value)} />
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
            <Input.Password
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Item>
        </div>

        <Button
          style={{ height: "2.5rem", width: "7rem", marginTop: "1.4rem" }}
          type="primary"
          htmlType="submit"
          onClick={() => handleSignup()}
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
