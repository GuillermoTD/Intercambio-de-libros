import { SendOutlined } from "@ant-design/icons";
import "./ChatPageStyles.css";
import { ContextApp } from "../../context/ContextApp";
import { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../Firebase.config";
import { Flex, Radio } from "antd";

const Chat = () => {
  const { setUserProfileInfo, useProfileInfo } = useContext(ContextApp);
  const [filteredUser, setFilteredUser] = useState();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const handleSearch = async (search) => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", search)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // setUser(doc.data());
        console.log(doc.data());
        setFilteredUser(doc.data());
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  // const {} = useProfileInfo
  console.log(currentUser);
  console.log("mi usuario " + currentUser?._tokenResponse?.displayName);
  return (
    <div className="container">
      <div className="sidebar">
        <div className="search">
          <div className="searchForm">
            <input
              type="text"
              placeholder="Busca al usuario..."
              onChange={(event) => handleSearch(event.target.value)}
            />
          </div>
          {filteredUser !== undefined ? (
            <div className="userChat">
              <img src="https://images.pexels.com/photos/20440051/pexels-photo-20440051/free-photo-of-moda-gente-mujer-relajacion.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
              <div className="userChatInfo">
                <span>{filteredUser.displayName}</span>
              </div>
            </div>
          ) : null}
        </div>
        {/* <div className="chats">
          <div className="userChat">
            <img src="https://images.pexels.com/photos/20440051/pexels-photo-20440051/free-photo-of-moda-gente-mujer-relajacion.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            <div className="userChatInfo">
              <span>Pablo</span>
              <p>Hooola</p>
            </div>
          </div>
        </div> */}
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
        <div className="messages">
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
