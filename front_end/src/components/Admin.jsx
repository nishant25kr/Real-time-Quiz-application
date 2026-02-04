import react from "react"
import { useEffect } from 'react'
import { useState } from 'react'
import { io } from "socket.io-client"
const ADMIN_PASSWORD = "supersecretpassword";

import CreateProblem from './CreateProblem.jsx'
import QuizController from "./QuizController.jsx"

const Admin = () => {
    const [socket, setSocket] = useState(null)
    const [roomId, setRoomId] = useState("")
    const [quiz, setQuiz] = useState("")
    const [quizId, setQuizId] = useState("")

    useEffect(() => {
        const socket = io("http://localhost:3030")

        setSocket(socket)

        socket.on("connect", () => {
            console.log(socket.id)
            socket.emit("joinAdmin", {
                password: ADMIN_PASSWORD
            })
        })

    }, [])

    if (!quizId) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="border rounded-lg p-6 w-80 bg-white shadow-md">
                    <h1 className="text-xl font-semibold text-center mb-4">
                        Host a Quiz
                    </h1>

                    <input
                        type="text"
                        placeholder="Enter Room ID"
                        className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
                        onChange={(e) => setRoomId(e.target.value)}
                    />

                    <button
                        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                        onClick={() => {
                            socket.emit("createQuiz",{
                                roomId
                            });
                            setQuizId(roomId);
                        }}
                    >
                        Create Room
                    </button>
                </div>
            </div>

        )
    }

    return (
        <>
            <CreateProblem roomId = {quizId} socket={socket} />
            <QuizController/>
        </>
    )
}

export default Admin