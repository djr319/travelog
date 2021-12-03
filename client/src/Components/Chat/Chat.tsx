import './Chat.css';
import { useState, useEffect, useContext } from "react";
import { io, Socket } from "socket.io-client";
import { Message } from 'Types/Message.type';
// import { User } from 'Types/User.type';
import { UserContext } from 'Context';
// import ScrollToBottom from 'react-scroll-to-bottom';

const SOCKET_URL = "http://localhost:3001";
const socket: Socket = io(SOCKET_URL);
socket.connect();

const CHATS = {
  connection: "connection",
  disconnect: "disconnect",
  CLIENT: {
    CREATE_ROOM: "CREATE_ROOM",
    SEND_MESSAGE: "SEND_MESSAGE",
    JOIN_ROOM: "JOIN_ROOM"
  },
  SERVER: {
    ROOM: "ROOM",
    JOINED_ROOM: "JOINED_ROOM",
    RECEIVE_MESSAGE: "RECEIVE_MESSAGE",
  }
};

function Chat () {

  const { uid, userName, photoURL } = useContext(UserContext);

  // const [loggedIn, setLoggedIn] = useState(authenticated);
  // const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [showChat, setShowChat] = useState(false);

  // Check if the user is loggedIn -> fn
  // Create room on the journal page and pass roomId as room name
  // Add pop up window to annotate other user about the new room/chat
  // Implement joinRoom function

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit(CHATS.CLIENT.JOIN_ROOM, room);
      setShowChat(true);
    }
  };

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        username: userName,
        message: currentMessage,
        photo: photoURL,
        date: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`
      };

      await socket.emit(CHATS.CLIENT.SEND_MESSAGE, messageData);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on(CHATS.SERVER.RECEIVE_MESSAGE, (message) => {
      setMessageList((list) => [...list, message]);
    });
  }, [socket]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Live Chat</h2>
      </div>
      <div className="chat-body">
        {/* <ScrollToBottom className="message-container"> */}
          {messageList.map((messageContent) => {
            return (
              <div className="message" id={userName === messageContent.username ? "me" : "you"}>
                <div>
                  <div className="message-data">
                    <img className="photo" key={uid} src={messageContent.photo} alt="Profile picture" />
                    <p className="user">{messageContent.username}</p>
                    <p className="time">{messageContent.date}</p>
                  </div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        {/* </ScrollToBottom> */}
      </div>
      <div className="chat-footer">
        <input
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
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
