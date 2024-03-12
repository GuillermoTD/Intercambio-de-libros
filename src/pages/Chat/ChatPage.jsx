import { SendOutlined } from "@ant-design/icons";
import "./ChatPageStyles.css";
import { ContextApp } from "../../context/ContextApp";
import { useContext } from "react";

const Chat = () => {
  const { setUserProfileInfo, useProfileInfo } = useContext(ContextApp);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  // const {} = useProfileInfo
  console.log(currentUser);
  console.log("mi usuario " + currentUser?._tokenResponse?.displayName);
  return (
    <div className="container">
      <div className="sidebar">
        <div className="search">
          <div className="searchForm">
            <input type="text" placeholder="Busca al usuario..." />
          </div>
          <div className="userChat">
            <img src="https://images.pexels.com/photos/20440051/pexels-photo-20440051/free-photo-of-moda-gente-mujer-relajacion.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            <div className="userChatInfo">
              <span>Pablo</span>
            </div>
          </div>
        </div>
        <div className="chats">
          <div className="userChat">
            <img src="https://images.pexels.com/photos/20440051/pexels-photo-20440051/free-photo-of-moda-gente-mujer-relajacion.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            <div className="userChatInfo">
              <span>Pablo</span>
              <p>Hooola</p>
            </div>
          </div>
        </div>
      </div>
      <div className="msgbox">
        <div className="msginput">
          <input type="text" placeholder="Escriba algo..." />
        </div>
        <div className="send-btn">
          <button>
            <SendOutlined />
          </button>
        </div>
      </div>
      <div className="namebox">
        <div className="chatInfo">
          <span>{currentUser?._tokenResponse?.displayName}</span>
          <div className="chatInfo_ProfileImage"></div>
        </div>
        <div className="messages owner">
          <div className="messageInfo">
            <img src="https://images.pexels.com/photos/18625018/pexels-photo-18625018/free-photo-of-mar-playa-mujer-sentado.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            <span>Just now</span>
          </div>
          <div className="messageContent">
            <p>Hola</p>
            <img src="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
