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



}