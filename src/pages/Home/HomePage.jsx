import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { auth } from "../../Firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import NewBookPage from "../NewBook/NewBookPage";
import { PlusOutlined } from "@ant-design/icons";
import { blue } from "@ant-design/colors";
import { Outlet, Route, Routes } from "react-router-dom";
import LoginPage from "../Login/LoginPage";
import { Link } from "react-router-dom";
import FilteredBooksPage from "../FilteredBooksPage/FilteredBooksPage";
import { useNavigate } from "react-router-dom";
import Chat from "../../components/Chat";

const { Header, Sider, Content } = Layout;

const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const Navigate = useNavigate();

  function getItem(label, key, icon = "", children, type, link) {
    return {
      key,
      icon,
      children,
      label,
      type,
      link,
    };
  }
  // const items = [
  //   {label:"Web Development",key:"/books/:webdevelopment"},
  //   {label:"Hacking",key:"/books/:hacking"},
  //   {label:"CyberSecurity",key:"/books/:cybersecurity"}
  // ]

  const authenticate = () => {
    signInWithEmailAndPassword(auth, "guillermotd23@gmail.com", "123456")
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("usuario logueado");
        console.log(user);
      })
      .catch((error) => {
        console.log("no se pudo loguear");
        console.log(error.message);
      });
  };
  authenticate();
  return (
    <div style={{ width: "100vw", height: "100vh", overflowX: "hidden" }}>
      <Layout style={{ height: "100%", width: "100%" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="Dropdown">
            <div className="Dropdown_Top">Category</div>
            {!collapsed && (
              <nav className="Dropdown_List">
                <Link to="/books/:webdevelopment">Web Development</Link>
                <Link to="/books/:hacking">Hacking</Link>
                <Link to="/books/:cybersecurity">Cyber Security</Link>
                <Link to="/books/:I.A">I.A</Link>
                <Link to="/books/:robotics">Robotics</Link>
                <Link to="/books/:datascience">Data science</Link>
              </nav>
            )}
          </div>
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <Link
              to="/newbook"
              className="AddBook"
              style={{ background: blue.primary }}
            >
              <PlusOutlined style={{ color: "white", fontSize: "1.5rem" }} />
            </Link>
            <Link to="chat">
              CHAT
            </Link>
          </Header>
          <Content
            style={{
              margin: "20px 10px",
              padding: 15,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
        <Outlet/>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default HomePage;

// const items = [
//   getItem('Navigation One', 'sub1', <MailOutlined />, [
//     <Link key={} to="/books/:webdevelopment">Web Development</Link>
//   ]),

// ];
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
