import { IoManager } from "./IoManager.js";
import { Quiz } from "../Quiz.js"
let globalProblemId = 0;

export class QuizManager {
    #quizes = [];

    constructor() {
        this.#quizes = [];
    }

    Start(roomId) {
        const quiz = this.getQuiz(roomId);
        if (!quiz) {
            // addQuiz
            // this.addQuiz(roomId);
            return;
        }
        quiz.start();
    }

    addProblem(roomId, problem) {
        let quiz = this.getQuiz(roomId);
        if (!quiz) {
            console.error("quiz has not been created")
            return;
        }

        quiz.addProblem(roomId, {
            ...problem,
            id: globalProblemId++,
            startTime: Date.now(),
            submission: []
        });
    }

    next(roomId) {
        console.log("in")
        const quiz = this.getQuiz(roomId);
        if (!quiz) {
            return;
        }
        console.log(quiz)
        quiz.next();
    }

    addUser(roomId, name) {
        const quiz = this.getQuiz(roomId);
        if (quiz) {
            quiz.addUser(name);
        }
    }

    submit(roomId, userId, problemId, submission) {
        return this.getQuiz(roomId)?.submit(userId, roomId, problemId, submission);
    }

    getQuiz(roomId) {
        return this.#quizes.find((x) => x.roomId === roomId) ?? null;
    }

    getCurrentState(roomId) {
        const quiz = this.getQuiz(roomId);
        if (!quiz) {
            return null;
        }
        return quiz.getCurrentState();
    }

    addQuiz(roomId, hasStarted = false) {
        const quiz = new Quiz(roomId, hasStarted);
        this.#quizes.push(quiz);
        return quiz;
    }

}