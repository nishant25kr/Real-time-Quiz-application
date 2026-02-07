import { useEffect } from "react"
import { useState } from "react"
import { io } from "socket.io-client"
import CurrentQuestion from "./CurrentQuestion"
import LeaderBoard from "./LeaderBoard"

export const User = () => {
    const searchParams = new URLSearchParams(document.location.search);
    const [name, setName] = useState();
    const [submit, setSubmit] = useState(false);

    if(!submit){
        return(
            <div>
                name<input type="text" onChange={(e)=> setName(e.target.value)} placeholder="enter your name" />
                <button onClick={()=>{
                    setSubmit(true);
                }}  >submit</button>
            </div>
        )
    }

    return <UsersLoggedIn name={name} />

}

export const UsersLoggedIn = ({name}) =>{
    const searchParams = new URLSearchParams(document.location.search)
    
    const roomId = searchParams.get("roomId")
    const [socket, setSocket] = useState(null)
    const [currentState, setCurrentState] = useState("not_started")
    const [currentQuestion, setCurrentQuestion] = useState(null)
    const [leaderboard, setLeaderboard] = useState([])
    const [userId, setUserId] = useState("")

    useEffect(()=>{

        const socket = io("http://localhost:3030")
        setSocket(socket)
        
        socket.on("connect",()=>{
            console.log(socket.id)
            socket.emit("join",{
                roomId,
                name
            })
        })

        socket.on('init',({userId, state})=>{
            setUserId(userId)
            setCurrentState(state.type)
            if(state.leaderboard){
                setLeaderboard(state.leaderboard)
            }
            if(state.problem){
                setCurrentQuestion(state.problem)
            }
        })

        socket.on("leaderboard",(data)=>{
            setCurrentState("leaderboard")
            setLeaderboard(data.leaderboard)
        })

        socket.on("problem",(data)=>{
            setCurrentState("questions")
            setCurrentQuestion(data.problem)
        })

    },[])

    if(currentState == "not_started"){
        return (
            <div><h1>this quiz has not started yet</h1></div>
        )
    }

    if(currentState == "questions"){
        return(
            <div>
                <CurrentQuestion  question = {currentQuestion} userId = {userId} roomId = {roomId}/>
            </div>
        )
    }

    if(currentState == "leaderboard"){
        return(
            <div>
                <LeaderBoard leaderboard={leaderboard} />
            </div>
        )
    }
    return (
        <div>
            <h1>quiz has ended</h1>

        </div>
    )
}
