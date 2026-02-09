import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Admin } from "./components/Admin.jsx"
import { User } from "./components/Users.jsx";
import Home from "./components/Home.jsx";


function App() {
    return (


        <BrowserRouter>
            <Routes>
                <Route  >
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/user" element={<User />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )

}

export default App