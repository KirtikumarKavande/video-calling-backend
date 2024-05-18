import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import serverConfig from "./config/server.config";
import cors from "cors";
import roomHandler from "./handlers/RoomHandlers";
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://video-calling-frontend-nu.vercel.app",
    methods: ["GET", "POST"],
    credentials: true

  },
});

app.use(cors());

io.on("connection", (socket) => {
  console.log("new user connected");

 roomHandler(socket)
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(serverConfig.PORT ||3000, () => {
  console.log(`server running at ${serverConfig.PORT}`);
});
