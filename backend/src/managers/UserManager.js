import { Socket } from "socket.io";
import { QuizManager } from "./QuizManager";

ADMIN_PASSWORD = "supersecretpassword";

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
            socketId.emit("init",{
                userId,
                state: this.QuizManager.getCurrentState(data.roomId)
            })
        })

        Socket.on("join_admin",(data)=>{
            const userId = this.QuizManager.addUser(data.roomId, data.name);

            if(data.passoword !== ADMIN_PASSWORD){
                return;
            }

            socketId.emit("adminInit",{
                userId,
                state: this.QuizManager.getCurrentState(data.roomId)

            })

            socketId.emit("createProblem", (data)=>{
                const roomId = data.roomId;
                this.QuizManager.addProblem(data.roomId, data.problem);
            })
            socketId.emit("next", (data)=>{
                const roomId = data.roomId;
                this.QuizManager.next(roomId);
            })

            socketId.emit("createQuiz", (data)=>{
                this.QuizManager.addQuiz(data.roomId);
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

        socket.on
    }
  
};