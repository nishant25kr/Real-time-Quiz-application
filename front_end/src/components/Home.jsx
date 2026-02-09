import React from "react"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const navigate = useNavigate()

    return (
        <div className="quiz-landing">
            <div className="container">
                <div className="content">
                    <div className="brand">
                        <div className="logo-mark"></div>
                        <span className="brand-name">QuizHub</span>
                    </div>

                    <h1 className="headline">
                        Knowledge testing made simple
                    </h1>
                    
                    <p className="description">
                        Join interactive quizzes or build your own. A streamlined platform for learning and assessment.
                    </p>

                    <div className="actions">
                        <button 
                            className="btn btn-primary"
                            onClick={() => navigate("/user")}
                        >
                            Join Quiz
                        </button>

                        <button 
                            className="btn btn-secondary"
                            onClick={() => navigate("/admin")}
                        >
                            Create Quiz
                        </button>
                    </div>

                    <div className="features">
                        <div className="feature">
                            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                            </svg>
                            <span>Instant access</span>
                        </div>
                        <div className="feature">
                            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            </svg>
                            <span>Secure & reliable</span>
                        </div>
                        <div className="feature">
                            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12 6 12 12 16 14"/>
                            </svg>
                            <span>Real-time results</span>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@600;700&display=swap');

                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                .quiz-landing {
                    min-height: 100vh;
                    background: #ffffff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                    color: #1a1a1a;
                    padding: 2rem 1rem;
                }

                .container {
                    width: 100%;
                    max-width: 680px;
                }

                .content {
                    animation: fadeIn 0.6s ease-out;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .brand {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 3.5rem;
                    animation: slideDown 0.5s ease-out;
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .logo-mark {
                    width: 32px;
                    height: 32px;
                    background: #1a1a1a;
                    border-radius: 6px;
                    position: relative;
                }

                .logo-mark::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 12px;
                    height: 12px;
                    background: #ffffff;
                    border-radius: 2px;
                }

                .brand-name {
                    font-family: 'Sora', sans-serif;
                    font-size: 1.25rem;
                    font-weight: 600;
                    letter-spacing: -0.02em;
                }

                .headline {
                    font-family: 'Sora', sans-serif;
                    font-size: clamp(2.25rem, 5vw, 3.5rem);
                    font-weight: 700;
                    line-height: 1.1;
                    letter-spacing: -0.03em;
                    margin-bottom: 1.5rem;
                    color: #1a1a1a;
                }

                .description {
                    font-size: 1.125rem;
                    line-height: 1.7;
                    color: #666666;
                    margin-bottom: 2.5rem;
                    max-width: 540px;
                }

                .actions {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 4rem;
                    flex-wrap: wrap;
                }

                .btn {
                    padding: 0.875rem 2rem;
                    font-size: 1rem;
                    font-weight: 500;
                    font-family: 'Inter', sans-serif;
                    border-radius: 8px;
                    border: none;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    letter-spacing: -0.01em;
                }

                .btn-primary {
                    background: #1a1a1a;
                    color: #ffffff;
                }

                .btn-primary:hover {
                    background: #000000;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }

                .btn-primary:active {
                    transform: translateY(0);
                }

                .btn-secondary {
                    background: #f5f5f5;
                    color: #1a1a1a;
                }

                .btn-secondary:hover {
                    background: #e8e8e8;
                    transform: translateY(-1px);
                }

                .btn-secondary:active {
                    transform: translateY(0);
                }

                .features {
                    display: flex;
                    gap: 2.5rem;
                    padding-top: 2rem;
                    border-top: 1px solid #e8e8e8;
                    flex-wrap: wrap;
                }

                .feature {
                    display: flex;
                    align-items: center;
                    gap: 0.625rem;
                    color: #666666;
                    font-size: 0.9375rem;
                }

                .icon {
                    width: 18px;
                    height: 18px;
                    color: #1a1a1a;
                    flex-shrink: 0;
                }

                @media (max-width: 640px) {
                    .quiz-landing {
                        padding: 1.5rem 1rem;
                    }

                    .brand {
                        margin-bottom: 2.5rem;
                    }

                    .headline {
                        margin-bottom: 1.25rem;
                    }

                    .description {
                        font-size: 1rem;
                        margin-bottom: 2rem;
                    }

                    .actions {
                        flex-direction: column;
                        margin-bottom: 3rem;
                    }

                    .btn {
                        width: 100%;
                        text-align: center;
                    }

                    .features {
                        flex-direction: column;
                        gap: 1.25rem;
                    }
                }
            `}</style>
        </div>
    )
}

export default Home