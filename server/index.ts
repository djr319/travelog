import express, { Application } from 'express';
import cors from 'cors';
import router from './router';
import { createServer } from 'http';
import { Server } from 'socket.io';
import socket from './socket/socket';

const app: Application = express();
const SERVER_PORT = 3001;
const CLIENT_PORT = 3000;
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: `http://localhost:${CLIENT_PORT}`,
    credentials: true
  }
});

app.use(express.json());
app.use(cors());
app.use(router);

(async function (): Promise<void> {
  try {
    httpServer.listen(SERVER_PORT, (): void => {
      console.log(`Server is UP at http://localhost:${SERVER_PORT}`);
      socket({ io });
    });
  } catch (err) {
    console.error(err);
  }
})();
