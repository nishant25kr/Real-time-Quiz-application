import { QuizManager } from "./QuizManager.js";
const ADMIN_PASSWORD = "supersecretpassword";

export class UserManager {
    static quizManager;

    constructor() {
        this.quizManager = new QuizManager();
    }

    addUser(socket) {
        this.createHandler(socket);
    }

    createHandler(socket) {

        socket.on("join", (data) => {

            console.log("inside join")
            const userId = this.quizManager.addUser(data.roomId, data.name)
            socket.emit("init", {
                userId,
                state: this.quizManager.getCurrentState(data.roomId)
            })
            socket.join(data.roomId);
        })

        socket.on("joinAdmin", (data) => {
            if (data.password !== ADMIN_PASSWORD) {
                return;
            }
            
            socket.on("createQuiz", data => {
                this.quizManager.addQuiz(data.roomId);
            })
            
            socket.on("createProblem", data => {
                this.quizManager.addProblem(data.roomId, data.problem);
            });
            
            socket.on("next", data => {
                console.log("inside next");
                this.quizManager.next(data.roomId);
            });
            
        })

        socket.on("submit", (data) => {
            const userId = data.userId;
            const problemId = data.problemId;
            const submission = data.submission;
            const roomId = data.roomId;

            if (submission != 0 && submission != 1 && submission != 2 && submission != 3) {
                console.error("issue while getting input " + submission)
                return;
            }

            console.log("submitting")
            this.quizManager.submit(userId, roomId, problemId, submission)
        });
    }

};