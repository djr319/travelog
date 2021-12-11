import { Server, Socket } from "socket.io";

function socket({ io }: { io: Server }) {
  
  io.on('connection', (socket: Socket) => {
    
    socket.on('to-all', (messageData) => {

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

export default socket;
