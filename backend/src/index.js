import { IoManager } from "./managers/IoManager";

const io = new IoManager.getInstance().io

io.listen(3000)

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
  });
})