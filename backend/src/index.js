import { IoManager } from "./managers/IoManager.js";

const io = IoManager.getInstance();

io.listen(3030);

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
  });
})