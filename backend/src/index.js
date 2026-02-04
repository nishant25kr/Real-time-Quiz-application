import { IoManager } from "./managers/IoManager.js";
import { UserManager } from "./managers/UserManager.js";

const socket = IoManager.getInstance();
const userManager = new UserManager()

socket.listen(3030);

socket.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  userManager.addUser(socket);


  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
  });
})