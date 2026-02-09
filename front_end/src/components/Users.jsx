import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import CurrentQuestion from "./CurrentQuestion"
import LeaderBoard from "./LeaderBoard"
import { useNavigate } from "react-router-dom"

export const User = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [submit, setSubmit] = useState(false);
    const [roomId, setRoomId] = useState("");

    if (!submit) {
        return (
            <div className="user-container">
                <div className="join-card">
                    <div className="card-header">
                        <h1 className="card-title">Join Quiz</h1>
                        <p className="card-subtitle">Enter your details to get started</p>
                    </div>

                    <div className="form-group">
                        <label htmlFor="roomId">Room ID</label>
                        <input 
                            id="roomId"
                            type="text" 
                            onChange={(e) => setRoomId(e.target.value)} 
                            placeholder="Enter room code"
                            className="input-field"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Your Name</label>
                        <input 
                            id="name"
                            type="text" 
                            onChange={(e) => setName(e.target.value)} 
                            placeholder="Enter your name"
                            className="input-field"
                        />
                    </div>

                    <button 
                        className="submit-btn"
                        onClick={() => {
                            setSubmit(true);
                            navigate(`/user?roomId=${roomId}`)
                        }}
                    >
                        Join Quiz
                    </button>
                </div>

                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@600;700&display=swap');

                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }

                    .user-container {
                        min-height: 100vh;
                        background: #fafafa;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                        padding: 2rem 1rem;
                    }

                    .join-card {
                        background: #ffffff;
                        border-radius: 12px;
                        padding: 3rem;
                        max-width: 440px;
                        width: 100%;
                        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
                        border: 1px solid #e8e8e8;
                        animation: fadeIn 0.5s ease-out;
                    }

                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                            transform: translateY(10px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    .card-header {
                        margin-bottom: 2rem;
                    }

                    .card-title {
                        font-family: 'Sora', sans-serif;
                        font-size: 1.75rem;
                        font-weight: 700;
                        letter-spacing: -0.02em;
                        color: #1a1a1a;
                        margin-bottom: 0.5rem;
                    }

                    .card-subtitle {
                        font-size: 0.9375rem;
                        color: #666666;
                        line-height: 1.5;
                    }

                    .form-group {
                        margin-bottom: 1.5rem;
                    }

                    .form-group label {
                        display: block;
                        font-size: 0.875rem;
                        font-weight: 500;
                        color: #1a1a1a;
                        margin-bottom: 0.5rem;
                    }

                    .input-field {
                        width: 100%;
                        padding: 0.875rem 1rem;
                        font-size: 1rem;
                        font-family: 'Inter', sans-serif;
                        border: 1px solid #e0e0e0;
                        border-radius: 8px;
                        transition: all 0.2s ease;
                        background: #ffffff;
                        color: #1a1a1a;
                    }

                    .input-field::placeholder {
                        color: #999999;
                    }

                    .input-field:focus {
                        outline: none;
                        border-color: #1a1a1a;
                        box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.05);
                    }

                    .submit-btn {
                        width: 100%;
                        padding: 0.875rem 2rem;
                        font-size: 1rem;
                        font-weight: 500;
                        font-family: 'Inter', sans-serif;
                        background: #1a1a1a;
                        color: #ffffff;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        margin-top: 0.5rem;
                    }

                    .submit-btn:hover {
                        background: #000000;
                        transform: translateY(-1px);
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    }

                    .submit-btn:active {
                        transform: translateY(0);
                    }

                    @media (max-width: 640px) {
                        .join-card {
                            padding: 2rem 1.5rem;
                        }

                        .card-title {
                            font-size: 1.5rem;
                        }
                    }
                `}</style>
            </div>
        )
    }

    return <UsersLoggedIn name={name} />
}

export const UsersLoggedIn = ({ name }) => {
    const searchParams = new URLSearchParams(document.location.search)
    const navigate = useNavigate()
    const roomId = searchParams.get("roomId")
    const [socket, setSocket] = useState(null)
    const [currentState, setCurrentState] = useState("not_started")
    const [currentQuestion, setCurrentQuestion] = useState(null)
    const [leaderboard, setLeaderboard] = useState([])
    const [userId, setUserId] = useState("")

    useEffect(() => {
        const socket = io(`${import.meta.env.VITE_BASE_URL}`)
        setSocket(socket)

        socket.on("connect", () => {
            socket.emit("join", {
                roomId,
                name
            })
        })

        socket.on("join-error", (res) => {
            alert(res)
            navigate("/user")
        })

        socket.on('init', ({ userId, state }) => {
            setUserId(userId)
            setCurrentState(state.type)
            if (state.leaderboard) {
                setLeaderboard(state.leaderboard)
            }
            if (state.problem) {
                setCurrentQuestion(state.problem)
            }
        })

        socket.on("leaderboard", (data) => {
            setCurrentState("leaderboard")
            setLeaderboard(data.leaderboard)
        })

        socket.on("problem", (data) => {
            setCurrentState("questions")
            setCurrentQuestion(data.problem)
        })

    }, [])

    if (currentState === "not_started") {
        return (
            <div className="status-container">
                <div className="status-card">
                    <div className="status-icon waiting">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                        </svg>
                    </div>
                    <h1 className="status-title">Waiting to Start</h1>
                    <p className="status-message">The quiz hasn't started yet. Please wait for the host to begin.</p>
                </div>

                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@600;700&display=swap');

                    .status-container {
                        min-height: 100vh;
                        background: #fafafa;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                        padding: 2rem 1rem;
                    }

                    .status-card {
                        background: #ffffff;
                        border-radius: 12px;
                        padding: 3rem 2rem;
                        max-width: 480px;
                        width: 100%;
                        text-align: center;
                        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
                        border: 1px solid #e8e8e8;
                        animation: fadeIn 0.5s ease-out;
                    }

                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                            transform: translateY(10px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    .status-icon {
                        width: 64px;
                        height: 64px;
                        margin: 0 auto 1.5rem;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .status-icon.waiting {
                        background: #f5f5f5;
                        color: #666666;
                    }

                    .status-icon.ended {
                        background: #f5f5f5;
                        color: #1a1a1a;
                    }

                    .status-icon svg {
                        width: 32px;
                        height: 32px;
                    }

                    .status-title {
                        font-family: 'Sora', sans-serif;
                        font-size: 1.75rem;
                        font-weight: 700;
                        letter-spacing: -0.02em;
                        color: #1a1a1a;
                        margin-bottom: 0.75rem;
                    }

                    .status-message {
                        font-size: 1rem;
                        color: #666666;
                        line-height: 1.6;
                        max-width: 360px;
                        margin: 0 auto;
                    }
                `}</style>
            </div>
        )
    }

    if (currentState === "questions") {
        return (
            <div>
                <CurrentQuestion question={currentQuestion} userId={userId} roomId={roomId} />
            </div>
        )
    }

    if (currentState === "leaderboard") {
        return (
            <div>
                <LeaderBoard leaderboard={leaderboard} />
            </div>
        )
    }

    return (
        <div className="status-container">
            <div className="status-card">
                <div className="status-icon ended">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                </div>
                <h1 className="status-title">Quiz Completed</h1>
                <p className="status-message">Thank you for participating! The quiz has ended.</p>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@600;700&display=swap');

                .status-container {
                    min-height: 100vh;
                    background: #fafafa;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                    padding: 2rem 1rem;
                }

                .status-card {
                    background: #ffffff;
                    border-radius: 12px;
                    padding: 3rem 2rem;
                    max-width: 480px;
                    width: 100%;
                    text-align: center;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
                    border: 1px solid #e8e8e8;
                    animation: fadeIn 0.5s ease-out;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .status-icon {
                    width: 64px;
                    height: 64px;
                    margin: 0 auto 1.5rem;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .status-icon.ended {
                    background: #f5f5f5;
                    color: #1a1a1a;
                }

                .status-icon svg {
                    width: 32px;
                    height: 32px;
                }

                .status-title {
                    font-family: 'Sora', sans-serif;
                    font-size: 1.75rem;
                    font-weight: 700;
                    letter-spacing: -0.02em;
                    color: #1a1a1a;
                    margin-bottom: 0.75rem;
                }

                .status-message {
                    font-size: 1rem;
                    color: #666666;
                    line-height: 1.6;
                    max-width: 360px;
                    margin: 0 auto;
                }
            `}</style>
        </div>
    )
}