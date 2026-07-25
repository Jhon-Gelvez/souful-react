import { NavLink } from "react-router-dom";

export function NavBar() {
    return (
        <nav className="flex gap-4 px-4 py-2 text-sm font-medium">
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `transition-colors ${isActive ? "text-primary" : "text-white/60 hover:text-white"}`
                }
            >
                Inicio
            </NavLink>
            <NavLink
                to="/admin"
                className={({ isActive }) =>
                    `transition-colors ${isActive ? "text-primary" : "text-white/60 hover:text-white"}`
                }
            >
                Admin
            </NavLink>
        </nav>
    );
}
