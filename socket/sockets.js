import MessageController from "./controllers/MessageControll.js";
import RoomController from "./controllers/RoomController.js";
import TypingController from "./controllers/TypingController.js";
import fs from "fs";

const sockets = (socket) => {
    const typingController = new TypingController(socket);
    const roomController = new RoomController(socket);
    const messageController = new MessageController(socket);


    socket.on("send-message", messageController.sendMessage);

    socket.on("typing-started", typingController.typingStarted);

    socket.on("typing-stoped", typingController.typingStoped);

    socket.on("join-room", roomController.joinRoom);

    socket.on("new-room-created", roomController.newRoomCreated);

    socket.on("remove-room", roomController.roomRemoved);

    socket.on("upload", ({ data , roomId }) => {
        console.log(roomId);
        fs.writeFile("upload/" + "test.png", data, { encoding: "base64" },
            () => { });
            
        socket.broadcast.to(roomId).emit("uploaded", { Buffer: data.toString("base64") })
    });

    socket.on('disconnect', (socket) => {
        console.log("user left")
    });
}

export default sockets