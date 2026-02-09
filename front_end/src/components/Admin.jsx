import { useEffect, useState } from 'react'
import { io } from "socket.io-client"
const ADMIN_PASSWORD = "supersecretpassword";

import CreateProblem from './CreateProblem.jsx'
import QuizController from "./QuizController.jsx"

export const Admin = () => {
    const [socket, setSocket] = useState(null)
    const [roomId, setRoomId] = useState("")
    const [quizId, setQuizId] = useState("")

    useEffect(() => {
        const socket = io(`${import.meta.env.VITE_BASE_URL}`)

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
            <div className="admin-container">
                <div className="create-card">
                    <div className="card-header">
                        <div className="icon-wrapper">
                            <svg className="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                                <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                            </svg>
                        </div>
                        <h1 className="card-title">Create Quiz Room</h1>
                        <p className="card-subtitle">Set up a new quiz session for participants</p>
                    </div>

                    <div className="form-section">
                        <label htmlFor="roomId" className="input-label">Room ID</label>
                        <input
                            id="roomId"
                            type="text"
                            placeholder="Enter unique room identifier"
                            className="input-field"
                            onChange={(e) => setRoomId(e.target.value)}
                        />
                        <p className="input-hint">Choose a memorable ID that participants will use to join</p>
                    </div>

                    <button
                        className="create-btn"
                        onClick={() => {
                            socket.emit("createQuiz", {
                                roomId
                            });
                            setQuizId(roomId);
                        }}
                    >
                        Create Room
                    </button>
                </div>

                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@600;700&display=swap');

                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }

                    .admin-container {
                        min-height: 100vh;
                        background: #fafafa;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                        padding: 2rem 1rem;
                    }

                    .create-card {
                        background: #ffffff;
                        border-radius: 12px;
                        padding: 3rem;
                        max-width: 480px;
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
                        text-align: center;
                        margin-bottom: 2.5rem;
                    }

                    .icon-wrapper {
                        width: 56px;
                        height: 56px;
                        background: #f5f5f5;
                        border-radius: 12px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 1.25rem;
                    }

                    .header-icon {
                        width: 28px;
                        height: 28px;
                        color: #1a1a1a;
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

                    .form-section {
                        margin-bottom: 2rem;
                    }

                    .input-label {
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

                    .input-hint {
                        font-size: 0.8125rem;
                        color: #999999;
                        margin-top: 0.5rem;
                        line-height: 1.4;
                    }

                    .create-btn {
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
                    }

                    .create-btn:hover {
                        background: #000000;
                        transform: translateY(-1px);
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    }

                    .create-btn:active {
                        transform: translateY(0);
                    }

                    @media (max-width: 640px) {
                        .create-card {
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

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div className="header-content">
                    <div className="room-info">
                        <span className="room-label">Room ID</span>
                        <span className="room-id">{quizId}</span>
                    </div>
                </div>
            </div>

            <div className="dashboard-grid">
                <CreateProblem roomId={quizId} socket={socket} />
                <QuizController socket={socket} roomId={roomId} />
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@600;700&display=swap');

                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                .dashboard-container {
                    min-height: 100vh;
                    background: #fafafa;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                }

                .dashboard-header {
                    background: #ffffff;
                    border-bottom: 1px solid #e8e8e8;
                    padding: 1.5rem 2rem;
                    position: sticky;
                    top: 0;
                    z-index: 100;
                }

                .header-content {
                    max-width: 1400px;
                    margin: 0 auto;
                }

                .room-info {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .room-label {
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: #666666;
                }

                .room-id {
                    font-family: 'Sora', sans-serif;
                    font-size: 1.125rem;
                    font-weight: 600;
                    color: #1a1a1a;
                    padding: 0.375rem 0.75rem;
                    background: #f5f5f5;
                    border-radius: 6px;
                }

                .dashboard-grid {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 2rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                @media (max-width: 768px) {
                    .dashboard-header {
                        padding: 1.25rem 1rem;
                    }

                    .dashboard-grid {
                        padding: 1.5rem 1rem;
                    }

                    .room-info {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 0.5rem;
                    }
                }
            `}</style>
        </div>
    )
}