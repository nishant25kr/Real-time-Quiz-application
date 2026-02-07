import { useEffect } from "react";
import { useState } from "react";
import { io } from "socket.io-client"

const CurrentQuestion = ({ question, userId, roomId }) => {
    // alert(userId)
    // alert(roomId)
    const [selectedOption, setSelectedOption] = useState(null);
    const [problemId, setProblemId] = useState("")
    const [socket, setSocket] = useState();
    // const [userId, setUserID] = useState(userId);

    useEffect(() => {
        const socket = io("http://localhost:3030")
        console.log(userId)
        setSocket(socket);
    }, [])

    if (!question) return <div>No question available</div>;

    const handleSelect = (optionId, questionId) => {
        setSelectedOption(optionId);
        socket.emit("submit", {
            userId:userId,
            problemId: questionId,
            submission: optionId-1,
            roomId:roomId
        })
    };

    return (
        <div style={{ padding: "16px", border: "1px solid #ddd" }}>
            <h2>{question.title}</h2>
            <p>{question.description}</p>

            <div>
                {question.options.map((option) => (
                    <label
                        key={option.id}
                        style={{
                            display: "block",
                            marginBottom: "8px",
                            cursor: "pointer",
                        }}
                    >
                        <input
                            type="radio"
                            name="current-question"
                            value={option.id}
                            checked={selectedOption === option.id}
                            onChange={() => handleSelect(option.id, question.id)}
                            style={{ marginRight: "8px" }}
                        />
                        {option.title}
                    </label>
                ))}
            </div>

            {selectedOption && (
                <p style={{ marginTop: "12px" }}>
                    ✅ Selected option ID: <strong>{selectedOption}</strong>
                </p>
            )}
        </div>
    );
};

export default CurrentQuestion;
