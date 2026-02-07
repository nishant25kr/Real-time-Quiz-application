

const QuizController = ({socket, roomId}) => {
    return <div className="mx-auto bg-black text-white py-2 px-10 rounded mt-4">
        <button
            onClick={() => {
                socket.emit("next", {
                    roomId
                })
            }}>Next problem</button>
    </div>
}

export default QuizController