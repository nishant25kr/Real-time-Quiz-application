import { IoManager } from "./IoManager";

export class QuizManager{
    #quizes = [];
    constructor() {
        this.quizes = [];
    }

    static Start(roomId){
        const io = IoManager.getInstance();
        io.to(roomId).emit({
            type:"START_ROOM"
        })
    }

    static next(roomId){
        const io = IoManager.getInstance();
        io.to(roomId).emit({
            type:"NEXT_QUESTION"
        })
    }

    addUser(roomId, name){
        const quiz = this.getQuiz(roomId);
        if(quiz){
            quiz.addUser(name);
        }   
    }

    submit(roomId, userId, problemId, submission){
        return this.getQuiz(roomId)?.submit(userId, roomId, problemId, submission);
    }

    getQuiz(roomId){
        const quiz = this.quizes.find((x) => x.roomId === roomId);
        return quiz ?? null;
    }

    getCurrentState(roomId){
        const quiz = this.getQuiz(roomId);
        if(!quiz){
            return null;
        }
        return quiz.getCurrentState();
    }

    



}