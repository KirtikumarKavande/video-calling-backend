import { Socket } from "socket.io";
import { v4 as uuid } from "uuid";

const roomHandler = (socket: Socket) => {
  const createRoom = () => {
    const roomId = uuid();
    socket.join(roomId);
    socket.emit("room-created", {roomId});
    console.log("room created with id", roomId);
  };

  const joinRoom = () => {
    console.log("joined room")
  };

  socket.on("create-room", createRoom);
  socket.on("join-room", joinRoom);
};

export default roomHandler;
