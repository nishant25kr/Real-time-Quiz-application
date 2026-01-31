import { Socket } from "socket.io";

export class UserManager{
    constructor() {
        this.users = [];
    }


    addUser(userId, socketId){
        this.users.push({userId, socketId});

        this.createHandler(roomId,socketId);
    }

    createHandler(roomId, socketId) {
        Socket.on("submission",(event)=>{
            
        })
    }



    
};