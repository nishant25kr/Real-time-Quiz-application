import { useEffect, useState } from "react";
import { io } from "socket.io-client"

const CurrentQuestion = ({ question, userId, roomId }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [socket, setSocket] = useState();

    useEffect(() => {
        const socket = io(`${import.meta.env.VITE_BASE_URL}`)
        console.log(userId)
        setSocket(socket);
    }, [])

    if (!question) {
        return (
            <div className="question-container">
                <div className="empty-state">
                    <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <p className="empty-text">No question available</p>
                </div>

                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@600;700&display=swap');

                    .question-container {
                        min-height: 100vh;
                        background: #fafafa;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                        padding: 2rem 1rem;
                    }

                    .empty-state {
                        text-align: center;
                    }

                    .empty-icon {
                        width: 48px;
                        height: 48px;
                        color: #999999;
                        margin: 0 auto 1rem;
                    }

                    .empty-text {
                        font-size: 1rem;
                        color: #666666;
                    }
                `}</style>
            </div>
        );
    }

    const handleSelect = (optionId, questionId) => {
        setSelectedOption(optionId);
        socket.emit("submit", {
            userId: userId,
            problemId: questionId,
            submission: optionId - 1,
            roomId: roomId
        })
    };

    return (
        <div className="question-container">
            <div className="question-card">
                <div className="question-header">
                    <h1 className="question-title">{question.title}</h1>
                    {question.description && (
                        <p className="question-description">{question.description}</p>
                    )}
                </div>

                <div className="options-container">
                    {question.options.map((option) => (
                        <label
                            key={option.id}
                            className={`option-card ${selectedOption === option.id ? 'selected' : ''}`}
                        >
                            <input
                                type="radio"
                                name="current-question"
                                value={option.id}
                                checked={selectedOption === option.id}
                                onChange={() => handleSelect(option.id, question.id)}
                                className="option-radio"
                            />
                            <span className="option-text">{option.title}</span>
                            {selectedOption === option.id && (
                                <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                            )}
                        </label>
                    ))}
                </div>

                {selectedOption && (
                    <div className="confirmation">
                        <svg className="confirmation-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                        <span className="confirmation-text">Answer submitted</span>
                    </div>
                )}
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@600;700&display=swap');

                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                .question-container {
                    min-height: 100vh;
                    background: #fafafa;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                    padding: 2rem 1rem;
                }

                .question-card {
                    background: #ffffff;
                    border-radius: 12px;
                    padding: 2.5rem;
                    max-width: 700px;
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

                .question-header {
                    margin-bottom: 2rem;
                }

                .question-title {
                    font-family: 'Sora', sans-serif;
                    font-size: 1.75rem;
                    font-weight: 700;
                    letter-spacing: -0.02em;
                    color: #1a1a1a;
                    margin-bottom: 0.75rem;
                    line-height: 1.3;
                }

                .question-description {
                    font-size: 1rem;
                    color: #666666;
                    line-height: 1.6;
                }

                .options-container {
                    display: flex;
                    flex-direction: column;
                    gap: 0.875rem;
                    margin-bottom: 1.5rem;
                }

                .option-card {
                    position: relative;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1.125rem 1.25rem;
                    border: 2px solid #e0e0e0;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    background: #ffffff;
                }

                .option-card:hover {
                    border-color: #c0c0c0;
                    background: #fafafa;
                }

                .option-card.selected {
                    border-color: #1a1a1a;
                    background: #f8f8f8;
                }

                .option-radio {
                    width: 20px;
                    height: 20px;
                    cursor: pointer;
                    accent-color: #1a1a1a;
                    flex-shrink: 0;
                }

                .option-text {
                    font-size: 1rem;
                    color: #1a1a1a;
                    flex: 1;
                    line-height: 1.5;
                }

                .check-icon {
                    width: 20px;
                    height: 20px;
                    color: #1a1a1a;
                    flex-shrink: 0;
                }

                .confirmation {
                    display: flex;
                    align-items: center;
                    gap: 0.625rem;
                    padding: 0.875rem 1.125rem;
                    background: #f5f5f5;
                    border-radius: 8px;
                    border: 1px solid #e8e8e8;
                }

                .confirmation-icon {
                    width: 18px;
                    height: 18px;
                    color: #1a1a1a;
                    flex-shrink: 0;
                }

                .confirmation-text {
                    font-size: 0.9375rem;
                    font-weight: 500;
                    color: #1a1a1a;
                }

                @media (max-width: 640px) {
                    .question-card {
                        padding: 2rem 1.5rem;
                    }

                    .question-title {
                        font-size: 1.5rem;
                    }

                    .option-card {
                        padding: 1rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default CurrentQuestion;