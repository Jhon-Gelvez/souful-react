import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "../UI/pages/Home";
import { Admin } from "../UI/pages/Admin";

export function AppRouter() {
    console.log("omaga")
    return (
        <Router>
            <nav className='text-white text-6xl font-bold'>
                <Link to="/souful-react/">Inicio</Link> | <Link to="/admin">Admin</Link>
            </nav>
            <Routes>
                <Route path="/souful-react/" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Router>
    );
}
