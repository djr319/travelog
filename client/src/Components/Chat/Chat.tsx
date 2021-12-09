import './Chat.css';
import { useState, useEffect, useContext, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Message } from 'Types/Message.type';
import moment from 'moment';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
// import { User } from 'Types/User.type';
import { UserContext } from 'Context';

const SOCKET_URL = "http://localhost:3001";
const socket: Socket = io(SOCKET_URL);
socket.connect();

// const CHATS = {
//   connection: "connection",
//   disconnect: "disconnect",
//   CLIENT: {
//     CREATE_ROOM: "CREATE_ROOM",
//     SEND_MESSAGE: "SEND_MESSAGE",
//     JOIN_ROOM: "JOIN_ROOM"
//   },
//   SERVER: {
//     ROOM: "ROOM",
//     JOINED_ROOM: "JOINED_ROOM",
//     RECEIVE_MESSAGE: "RECEIVE_MESSAGE",
//   }
// };

function Chat (): JSX.Element {

  const { uid, userName, photoURL } = useContext(UserContext);

  // const [loggedIn, setLoggedIn] = useState(authenticated);
  // const [username, setUsername] = useState("");
  // const [room, setRoom] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState<Message[]>([]);
  // const [showChat, setShowChat] = useState(false);

  // Check if the user is loggedIn -> fn
  // Create room on the journal page and pass roomId as room name
  // Add pop up window to annotate other user about the new room/chat
  // Implement joinRoom function

  // const joinRoom = () => {
  //   if (userName !== "" && room !== "") {
  //     socket.emit(CHATS.CLIENT.JOIN_ROOM, room);
  //     setShowChat(true);
  //   }
  // };

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



  // useEffect(() => {
  //   socket.on(CHATS.SERVER.RECEIVE_MESSAGE, (message) => {
  //     setMessageList((list) => [...list, message]);
  //   });
  // }, [socket]);

  // https://stackoverflow.com/questions/55677600/typescript-how-to-pass-object-is-possibly-null-error
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
