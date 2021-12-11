import './Chat.css';
import { useState, useEffect, useContext, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Message } from 'Types/Message.type';
import moment from 'moment';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { UserContext } from 'Context';

const SOCKET_URL = "http://localhost:3001";
const socket: Socket = io(SOCKET_URL);
socket.connect();

function Chat (): JSX.Element {

  const { uid, userName, photoURL } = useContext(UserContext);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState<Message[]>([]);

  const sendMessage = () => {
    console.log("message send fired");
    if (currentMessage !== "") {
      const messageData = {
        room: '0',
        from: userName,
        message: currentMessage,
        photo: photoURL,
        date: `${new Date(Date.now())}`
      };

      socket.emit("to-all", messageData);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
      document.getElementById('input')?.focus();
    }
  };

  const messagesEndRef = useRef(document.createElement("div"))
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messageList]);

  useEffect(() => {
    socket.on('to-all', (messageData) => {
      const message: Message = {
        roomId: '0',
        message: messageData.message,
        from: messageData.from,
        to: 'all',
        photo: messageData.photo,
        date: messageData.date
      }
      setMessageList((list) => [...list, message]);
    });
  }, [socket]);

  return (
    <div className="chat">
      <h2>Live Chat</h2>
      <div className="chat-wrapper">
        <div className="chat-body">
          <SimpleBar style={{ height: '100%' }}>
            {messageList.map((messageContent) => {
              return (
                <div className={userName === messageContent.from ? "message me" : "message you"}>
                  <div className="message-data">
                    <img className="photo" key={uid} src={messageContent.photo} alt="" />
                    <p className="user">{messageContent.from}</p>
                    <p className="time">{moment(messageContent.date).format('HH:mm')}</p>
                  </div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </SimpleBar>
        </div>
        <div className="chat-footer">
          <input
            id="input"
            type="text"
            placeholder="Message..."
            value={currentMessage}
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
          < button className="button"  onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
