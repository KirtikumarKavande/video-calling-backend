import { Socket } from "socket.io";
import { v4 as uuid } from "uuid";
const rooms: Record<string, string[]> = {};

const roomHandler = (socket: Socket) => {
  const createRoom = ({ userId }: { userId: string }) => {
    console.log("userID check", userId);
    const roomId = uuid();
    socket.join(roomId);
    rooms[roomId] = [];

    socket.emit("room-created", { roomId  });
    console.log("room created with id", roomId + " joined by user", userId);
  };

  const joinRoom = ({ userId, roomId }: { userId: string; roomId: string }) => {
    if (rooms[roomId]) {
      rooms[roomId].push(userId);
      socket.join(roomId);
      socket.on("ready", () => {
        socket.to(roomId).emit("user-joined", {userId});
      });
      console.log(`new user with id ${userId} joined room ${roomId}`);
    }
    console.log("lets see", rooms);
  };

  socket.on("create-room", createRoom);
  socket.on("join-room", joinRoom);
};

export default roomHandler;
