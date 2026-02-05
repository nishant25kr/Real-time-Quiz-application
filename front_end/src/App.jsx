import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./components/Admin.jsx"
import Users from "./components/Users.jsx";
import LeaderBoard from "./components/LeaderBoard.jsx";


function App() {
    return (

        <BrowserRouter>
            <Routes>
                <Route  >
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/leaderboard" element={<LeaderBoard/>} />
                    <Route path="/users" element={<Users />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )

}

export default App