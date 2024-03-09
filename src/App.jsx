import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,

  AppstoreOutlined,
  MailOutlined
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";

import {auth} from "./Firebase.config"
import { signInWithEmailAndPassword } from "firebase/auth";
import NewBookPage from "./pages/NewBook/NewBookPage";



const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  console.log(auth)

  const authenticate = ()=>{
    signInWithEmailAndPassword(auth,"guillermotd23@gmail.com","123456")
    .then((userCredential)=>{
      const user = userCredential.user
      console.log("usuario logueado")
      console.log(user)
    })
    .catch((error)=>{
      console.log("no se pudo loguear")
      console.log(error.message)
    })
  }
  authenticate()
  return (
    <div style={{width:"100vw",height:"100vh",overflowX:"hidden"}}>
      <Layout style={{ height: "100%", width: "100%" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
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
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              display:"flex",
              flexDirection:"column",
              alignItems:"center",
              justifyContent:"center"
            }}
          >
            <NewBookPage/>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default App;



function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Option 1', '1'),
    getItem('Option 2', '2'),
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
  ]),
  getItem('Categories', 'sub2', <AppstoreOutlined />, [
    getItem('Web Development', '0'),
    getItem('Hacking', '1'),
    getItem('CiberSecurity', '2'),
    getItem('Artifitial Intelligence', '3'),
    getItem('Data Science', '4'),
    getItem('Robotics', '5'),
    // getItem('Ro', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),

];