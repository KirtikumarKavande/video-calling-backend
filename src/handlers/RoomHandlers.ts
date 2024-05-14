import { Socket } from "socket.io";
import { v4 as uuid } from "uuid";

const roomHandler = (socket: Socket) => {
  const createRoom = ({userId}) => {
    const roomId = uuid();
    socket.join(roomId);
    socket.emit("room-created", {roomId});
    console.log("room created with id", roomId +"joined by user",userId);
  };

  const joinRoom = (data:{useId:string,roomId:string}) => {
    console.log(`new user with id ${data.useId} joined room ${data.roomId}`);
  };

  socket.on("create-room", createRoom);
  socket.on("join-room", joinRoom);
};

export default roomHandler;
