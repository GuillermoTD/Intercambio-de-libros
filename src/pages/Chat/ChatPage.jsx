import { SendOutlined } from "@ant-design/icons";
import "./ChatPageStyles.css";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../Firebase.config';
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
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [err, setErr] = useState(false);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
    });
    return () => {
      unsub();
    }
  }, []);
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "usersChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,

          },
          [combinedId + ".date"]: serverTimestamp(),

        });
        await updateDoc(doc(db, "usersChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

      }
    } catch (err) { }
    setUser(null);
    setUsername("")
  };
  

  return (
    <div className="container">
      <div className="sidebar">
        <div className="search">
          <div className="searchForm">
            <input
              type="text"
              placeholder="Busca al usuario..."
              onKeyDown={handleKey}
              onChange={(event) => setUsername(event.target.value)}
             value={username}
            />
          </div>
          {user && (
            <div className="userChat" onClick={handleSelect}>
              <img src="https://images.pexels.com/photos/20440051/pexels-photo-20440051/free-photo-of-moda-gente-mujer-relajacion.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
              <div className="userChatInfo">
                <span>{user.displayName}</span>
              </div>
            </div>
          )}
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
          <span>{user?.displayName}</span>
          </div>
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

  
  );
};

export default Chat;
