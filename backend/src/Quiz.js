import { IoManager } from "./managers/IoManager.js";

const PROBLEM_TIME_LIMIT = 10;

/**
 * @typedef {Object} Option
 * @property {string|number} id
 * @property {string} title
 */
 
/**
 * @typedef {Object} Submission
 * @property { string } problemId
 * @property { string|number } submissionId
 * @property { string } userId
 * @property { boolean } isCorrect
 * @property { string } optionSelected
 */

/**
 * @typedef {Object} User
 * @property {string} name
 * @property {number} id
 * @property {number} points
 */

/**
 * @typedef {Object} Problem
 * @property { string} id
 * @property {string} title
 * @property {string} description
 * @property {number} startTime
 * @property {string} image
 * @property {string} answer
 * @property {Option[]} options
 * @property {Submission []} submission 
 */

export class Quiz {
    #roomId;
    #hasStarted;
    #problems;
    #activeProblem;
    #users;
    #currentState;

    constructor(roomId, hasStarted = false) {

        this.#roomId = roomId;
        this.#hasStarted = hasStarted;
        this.#problems = [];
        this.#users = [];
        this.#activeProblem = 0;
        this.#currentState = "not_started"; 

        setInterval(()=>{
            this.debug()
        },10000)

    }
    debug(){
        console.log("-----degub----")
        console.log(this.#roomId)
        console.log(this.#problems)
        console.log(this.#users)
    }

    get roomId() {
        return this.#roomId;
    }

    addProblem(roomId,problem) {
        this.#problems.push(problem);
    }

    start() {
        if (this.#hasStarted) return;
        this.#hasStarted = true;

        const io = IoManager.getInstance();
        io.to(this.#roomId).emit("CHANGE_PROBLEM", {
            problem: this.#problems[0],
        });
        this.setActiveProblem(this.#problems[0]);

    }

    setActiveProblem(problem) {
        const io = IoManager.getInstance();

        problem.startTime = Date.now();
        problem.submission = [];

        io.to(this.#roomId).emit("CHANGE_PROBLEM", { problem });

        setTimeout(() => {
            this.sendLeaderboard();
        }, PROBLEM_TIME_LIMIT * 1000);
    }


    getLeaderBoard() {
        return [...this.#users].sort((a, b) => b.points - a.points).slice(0, 20);
    }


    sendLeaderboard() {
        const leaderboard = this.getLeaderBoard();
        IoManager.getInstance().to(this.#roomId).emit("LEADERBOARD_UPDATE", {
            leaderboard
        })
    }

    next() {

        console.log('In quiznext')
        this.#activeProblem++;
        // console.log(this.#problems[0])
        // console.log(this.#activeProblem)
        const problem = this.#problems[this.#activeProblem-1];
        console.log(problem)
        const io = IoManager.getInstance();

        if (problem) {
            this.setActiveProblem(problem);
        } else {
            // IoManager.getInstance().emit("QUIZ_END", {
            //     problem
            // });
        }
    }

    generateUserId() {
        return Date.now() + Math.floor(Math.random() * 1000);
    }

    addUser(name) {
        const id = this.generateUserId();
        this.#users.push({ name, id, points: 0 });
        return id;
    }

    submit(userId, roomId, problemId, submission) {
        const problem = this.#problems.find(p => p.id === problemId);
        const user = this.#users.find(u => u.id === userId);

        if (!problem || !user) {
            return;
        }
        const existingSubmission = problem.submission.find(s => s.userId === userId);
        if (existingSubmission) {
            return;
        }
        problem.submission.push({
            problemId,
            submissionId: Date.now() + Math.floor(Math.random() * 1000),
            userId,
            isCorrect: problem.answer === submission,
            optionSelected: submission
        });

        user.points += new Date().getTime() - problem.startTime <= 10000 ? 10 : 5;
    }

    getCurrentState() {
        if(this.#currentState == "not_started"){
            return {
                type: "not_started"
            }
        }
        if(this.#currentState == "questions"){
            return {
                type: "questions",
                problem: this.#problems[this.#activeProblem]
            }
        }
        if(this.#currentState == "leaderboard"){
            return {
                type: "leaderboard",
                leaderboard: this.getLeaderBoard()
            }
        }
        if(this.#currentState == "ended"){
            return {
                type: "ended",
                leaderboard: this.getLeaderBoard()
            }
        }
    }
    
}