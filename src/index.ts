import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import serverConfig from "./config/server.config";
import cors from "cors"
const app = express();
const server = createServer(app);
const io = new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
});

app.use(cors())
app.get('/', (_, res) => {
    res.send('Hello World!');
});

io.on('connection', (socket) => {
  console.log("new user connected");
  socket.on('disconnect', () => {
      console.log("user disconnected")
  })
});

server.listen(serverConfig.PORT, () => {
  console.log(`server running at ${serverConfig.PORT}`);
});