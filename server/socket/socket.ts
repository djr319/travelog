import { nanoid } from "nanoid";
import { Server, Socket } from "socket.io";

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

// const rooms: Record<string, { name: string }> = {};

function socket({ io }: { io: Server }) {
  console.log(`Sockets enabled`);
  io.on('connection', (socket: Socket) => {
    socket.on('to-all', (messageData) => {

      // do some stuff
      socket.broadcast.emit("to-all", {
        room: '0',
        // from: messageData.from,
        from: 'Tenzing',
        to: 'all',
        message: messageData.message,
        // photo: messageData.photo,
        photo: "https://firebasestorage.googleapis.com/v0/b/travelog-bf015.appspot.com/o/funny.jpg?alt=media&token=3f709f6f-d721-475b-bf85-bf1b37002a3d",
        date: messageData.date
      });
    });
  });
};

  // IVANS:
  // io.on(CHATS.connection, (socket: Socket) => {

  //   console.log(`User connected ${socket.id}`);

  //   socket.emit(CHATS.SERVER.ROOM, rooms);

  //   socket.on(CHATS.CLIENT.CREATE_ROOM, (room) => {
  //     console.log(room);
  //     const roomId = nanoid();
  //     rooms[roomId] = {
  //       name: roomId,
  //     };

  //     socket.join(roomId);
  //     socket.broadcast.emit(CHATS.SERVER.ROOM, rooms);
  //     socket.emit(CHATS.SERVER.JOINED_ROOM, roomId);

  //     // // emit back to the room creator with all the rooms, probably not needed for this project
  //     // socket.emit(CHATS.SERVER.ROOM, rooms);
  //   });

  //   socket.on(CHATS.CLIENT.SEND_MESSAGE, ({ roomId, message, username, date, photo }) => {
  //       socket.to(roomId).emit(CHATS.SERVER.RECEIVE_MESSAGE, {
  //         rooms,
  //         message,
  //         username,
  //         photo,
  //         date
  //       });
  //     }
  //   );

  //   socket.on(CHATS.CLIENT.JOIN_ROOM, (roomId) => {
  //     socket.join(roomId);
  //     socket.emit(CHATS.SERVER.JOINED_ROOM, roomId);
  //   });

  //   socket.on(CHATS.disconnect, () => {
  //     console.log(`User disconnected ${socket.id}`);
  //   });
  // });
// }

export default socket;
