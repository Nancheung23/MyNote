import React from "react"
import { NavLink } from "react-router-dom"

const NavBar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <ul className="flex space-x-4">
                <li>
                    {/* apply hover style and bold,underline while active */}
                    <NavLink
                        to="/Home"
                        className={({ isActive }) =>
                            isActive
                                ? "text-white font-bold border-b-2 border-yellow-400"
                                : "text-gray-300 hover:text-white"
                        }
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/TaskCreation"
                        className={({ isActive }) =>
                            isActive
                                ? "text-white font-bold border-b-2 border-yellow-400"
                                : "text-gray-300 hover:text-white"
                        }
                    >
                        Create A Task
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/Statistics"
                        className={({ isActive }) =>
                            isActive
                                ? "text-white font-bold border-b-2 border-yellow-400"
                                : "text-gray-300 hover:text-white"
                        }
                    >
                        Statistics
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/Logs"
                        className={({ isActive }) =>
                            isActive
                                ? "text-white font-bold border-b-2 border-yellow-400"
                                : "text-gray-300 hover:text-white"
                        }
                    >
                        Logs
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/Settings"
                        className={({ isActive }) =>
                            isActive
                                ? "text-white font-bold border-b-2 border-yellow-400"
                                : "text-gray-300 hover:text-white"
                        }
                    >
                        Settings
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}


export default NavBar