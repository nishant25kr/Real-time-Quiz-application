import { IoManager } from "./IoManager";
let globalProblemId = 0;

export class QuizManager{
    #quizes = [];
    constructor() {
        this.quizes = [];
    }

    static Start(roomId){
        const io = IoManager.getInstance();
        const quiz = this.getQuiz(roomId);
        if(!quiz){
            return;
        }
        quiz.start();
    }

    static addProblem(roomId, problem){
        const quiz = this.getQuiz(roomId);
        if(!quiz){
            return;
        }
        quiz.addProblem({
            ...problem,
            id: globalProblemId++,
            startTime: Date.now(),
            submission: []
        });
    }

    static next(roomId){
        const quiz = this.getQuiz(roomId);
        if(!quiz){
            return;
        }
        quiz.next();
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

    addQuiz(roomId, hasStarted = false){
        const quiz = new Quix(roomId, hasStarted);
        this.quizes.push(quiz);
        return quiz;
    }
    



}