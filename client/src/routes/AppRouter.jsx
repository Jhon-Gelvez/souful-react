import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "../UI/pages/Home";
import { Admin } from "../UI/pages/Admin";
import { NavBar } from "../UI/components/common/NavBar";

export function AppRouter() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Router>
    );
}
