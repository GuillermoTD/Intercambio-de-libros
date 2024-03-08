import React, { useState, useEffect } from 'react';
import sendIcon from '../Components/images/send.png'; 
import chatIcon from '../Components/images/chatcircle.png'

const Chat = () => {
    const [formVisible, setFormVisible] = useState(true);

    const toggleFormVisibility = () => {
        setFormVisible(!formVisible); 
    } 
    useEffect(() => {
        console.log('Form visibility changed:', formVisible);
    }, [formVisible]); 

    return (
        <div>
            <div className="container">
                {/* chat box */}
                <div className={`chat-box ${formVisible ? 'visible' : 'hidden'}`}>
                    {/* client */}
                    <div className="client">
                        <img src="logo.png" alt="logo" />
                        <div className="client-info">
                            <h2>Thanos</h2>
                            <p>online</p>
                        </div>
                    </div>
                    <div className="chats">
                        <div className="client-chat">Hi!</div>
                        <div className="my-chat">Hi!</div>
                        <div className="client-chat">How can i help you?</div>
                        <div className="my-chat">How you create this chat box?</div>
                        <div className="client-chat">Watch complete video for your answer.</div>
                    </div>
                    <div className="chat-input">
                        <input type="text" placeholder="Enter Message" />
                        <button className="send-btn">
                            <img src={sendIcon} alt="send-btn" />
                        </button>
                    </div>
                </div>
                <div className="chat-btn" onClick={toggleFormVisibility}>
                    <img src={chatIcon} alt="chat box icon btn" />
                </div>
            </div>
        </div>
    );
}

export default Chat;
