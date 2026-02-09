const QuizController = ({socket, roomId}) => {
    return (
        <div className="controller-container">
            <div className="controller-card">
                <h3 className="controller-title">Quiz Controls</h3>
                <button
                    className="next-btn"
                    onClick={() => {
                        socket.emit("next", {
                            roomId
                        })
                    }}
                >
                    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 18 15 12 9 6"/>
                    </svg>
                    Next Question
                </button>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@600;700&display=swap');

                .controller-container {
                    width: 100%;
                }

                .controller-card {
                    background: #ffffff;
                    border-radius: 12px;
                    padding: 1.5rem;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
                    border: 1px solid #e8e8e8;
                    max-width: 700px;
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 1rem;
                }

                .controller-title {
                    font-family: 'Sora', sans-serif;
                    font-size: 1rem;
                    font-weight: 600;
                    letter-spacing: -0.01em;
                    color: #1a1a1a;
                    margin: 0;
                }

                .next-btn {
                    padding: 0.625rem 1.25rem;
                    font-size: 0.9375rem;
                    font-weight: 500;
                    font-family: 'Inter', sans-serif;
                    background: #1a1a1a;
                    color: #ffffff;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    white-space: nowrap;
                }

                .btn-icon {
                    width: 16px;
                    height: 16px;
                    transition: transform 0.2s ease;
                }

                .next-btn:hover {
                    background: #000000;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }

                .next-btn:hover .btn-icon {
                    transform: translateX(2px);
                }

                .next-btn:active {
                    transform: translateY(0);
                }

                @media (max-width: 640px) {
                    .controller-card {
                        flex-direction: column;
                        align-items: stretch;
                    }

                    .next-btn {
                        width: 100%;
                        justify-content: center;
                    }
                }
            `}</style>
        </div>
    )
}

export default QuizController