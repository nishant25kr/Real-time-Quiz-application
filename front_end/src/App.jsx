import { useEffect } from 'react'
import { useState } from 'react'
import { io } from "socket.io-client"

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const socket = io("http://localhost:3030")

    socket.on("connect", () => {
      console.log(socket.id)
      socket.emit("joinAdmin",{
        password: "ADMIN_PASSWORD"
      })
    })

  }, [])

  return (
    <>
      <h1>H from Quiz</h1>

    </>
  )
}

export default App
