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
        const quiz = this.getQuiz(roomId);
        if (!quiz) {
            return;
        }
        quiz.next();
    }

    addUser(roomId, name) {
        const quiz = this.getQuiz(roomId);
        if (quiz) {
            const userId = quiz.addUser(name);

            return userId
        }
        else{
            console.error("Error while adding User")
        }
    }

    submit(roomId, userId, problemId, submission) {
        const room = this.getQuiz(roomId);

        return this.getQuiz(roomId)?.submit(userId, problemId, submission);
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