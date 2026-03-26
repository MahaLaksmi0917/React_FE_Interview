import React, { useState } from "react";
import "../styles/ChatApp.css";

function ChatApp() {
  const [message, setMessage] = useState("");
  const [messageY, setMessageY] = useState("");
  const [UsersMessageData, setUsersMessageData] = useState([]);
  const [userTyping, setUserTyping] = useState({
    isXTyping: false,
    isYTyping: false,
  });

  const sendMessage = (userMessage, from, to) => {
    // store previous messages and then add ..
    setUsersMessageData((prev) => [
      ...prev,
      {
        createdAt: Date.now(),
        message: userMessage,
        from: from,
        to: to,
      },
    ]);
    setMessage(""); // empty for future typing ...
    if (from === "X" || from === "Y") {
      setUserTyping({ isXTyping: false, isYTyping: false });
    }
  };

  return (
    <section className="chatContainer">
      <header>
        <h1>Demo Chat Application...</h1>
      </header>
      <div className="col">
        <div className="row">
          <h1>x</h1>
          {/* render UsersMessageData list items here .... */}
          <div className="messageContainer">
            {UsersMessageData.map((message, index) => {
              return (
                <div
                  key={message}
                  className={`messageRow ${
                    message.from === "X"
                      ? "applyMarginleft"
                      : "applyMarginRight"
                  } `}
                >
                  <p>{message.message}</p>
                </div>
              );
            })}
          </div>

          <div className="inputContainer">
            <input
              type="text"
              placeholder={
                userTyping.isYTyping
                  ? "Y Is typingg...."
                  : "Please Enter your message "
              }
              value={message}
              onChange={(e) => {
                setUserTyping({ isXTyping: true, isYTyping: false });
                setMessage(e.target.value);
              }}
            />
            <button onClick={() => sendMessage(message, "X", "Y")}>Send</button>
          </div>
        </div>
        <div className="row">
          <h1>y</h1>

          {/* render UsersMessageData list items here .... */}
          <div className="messageContainer">
            {UsersMessageData.map((message, index) => {
              return (
                <div
                  key={message}
                  className={`messageRow ${
                    message.from === "X"
                      ? "applyMarginleft"
                      : "applyMarginRight"
                  } `}
                >
                  <p>{message.message}</p>
                </div>
              );
            })}
          </div>
          <div className="inputContainer">
            <input
              value={messageY}
              onChange={(e) => {
                setUserTyping({ isXTyping: false, isYTyping: true });
                setMessageY(e.target.value);
              }}
              type="text"
              placeholder={
                userTyping.isXTyping
                  ? "X Is typingg...."
                  : "Please Enter your message "
              }
            />
            <button onClick={() => sendMessage(messageY, "Y", "X")}>
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChatApp;
