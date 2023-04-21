import * as http from "http";
import * as socketIO from "socket.io";

let socketIOServer = null;

export async function initSocketIOServer(app: http.Server) {
  socketIOServer = new socketIO.Server(app, {
    pingTimeout: 1000,
    path: "/socket",
    cors: {
      origin: "*", //origin: "https://localhost:8080",
      //origin: "http://localhost:5173",
      //methods: ["GET", "POST"]
    },
  });

  socketIOServer.on("connection", (socket: socketIO.Socket) => {
    console.log("-> income new client");
    socket.on("user-add-todo", async (data: any) => {
      socket.emit("user-update-todo", data);
    });

    socket.on("team-add-todo", async (data: any) => {
      socket.emit("team-update-todo", data);
    });

    socket.on("todo-update-status", async (data: any) => {
      socket.emit("todo-update-status", data);
    });

    socket.on("disconnection", async (data: any) => {
      console.log("disconnection");
    });
  });
}
