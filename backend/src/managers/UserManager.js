import { Socket } from "socket.io";
import { QuizManager } from "./QuizManager";

export class UserManager{
    constructor() {
        this.users = [];
    }


    addUser(userId, socketId){
        this.users.push({userId, socketId});

        this.createHandler(roomId,socketId);
    }

    createHandler(roomId, socketId) {
        Socket.on("join",(data)=>{
            const userId = this.QuizManager.addUser(data.roomId, data.name)
            socketId.emit("userId",{
                userId,
                state: this.QuizManager.getCurrentState(data.roomId)
            })
        })

        Socket.on("admin_join",(data)=>{
            if(data.passoword !== A)
            socketId.emit("admin_joined",{
                type: "admin_joined"
            })
        })

        Socket.on("submit",(data)=>{
            const userId = data.userId;
            const problemId = data.problemId;
            const submission = data.submission;

            if(submission != 0 && submission != 1 && submission != 2 && submission != 3){
                socketId.emit("INVALID_SUBMISSION",{
                    message: "Invalid submission"
                })
            }else{
                this.QuizManager.submit(userId, data.roomId, problemId, submission);
            }
        })
    }



    
};