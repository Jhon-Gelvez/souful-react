import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "../UI/pages/Home";
import { Admin } from "../UI/pages/Admin";

export function AppRouter() {
    return (
        <Router>
            {/* <nav className='text-white text-xl font-bold m-4'>
                <Link to="/souful-react/">Inicio</Link> <Link to="/admin">Admin</Link>
            </nav> */}
            <Routes>
                <Route path="/souful-react/" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Router>
    );
}
