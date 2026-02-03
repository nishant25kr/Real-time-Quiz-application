import http from "http";
import { Server } from "socket.io";

const server = http.createServer();

export class IoManager {
  static io;

  static getInstance() {
    if (!this.io) {
      this.io = new Server(server);
    }
    return this.io;
  }
}

export { server };
