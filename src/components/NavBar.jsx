import React from "react"
import { NavLink } from "react-router-dom"

const NavBar = () => {
    // for each element of NavBar, when it's the current view, classname switch to **_activated, otherwise will be **_default
    return (
        <nav id="navbar">
            <ul>
                <li>
                    <NavLink to={'/Home'} className={({ isActive }) => "home_" + (isActive ? "activated" : "default")}>Home</NavLink>
                </li>
                <li>
                    <NavLink to={'/TaskCreation'} className={({ isActive }) => "taskCreation_" + (isActive ? "activated" : "default")}>Create A Task</NavLink>
                </li>
                <li>
                    <NavLink to={'/Statistics'} className={({ isActive }) => "statistics_" + (isActive ? "activated" : "default")}>Statistics</NavLink>
                </li>
                <li>
                    <NavLink to={'/Logs'} className={({ isActive }) => "logs_" + (isActive ? "activated" : "default")}>Logs</NavLink>
                </li>
                <li>
                    <NavLink to={'/Settings'} className={({ isActive }) => "settings_" + (isActive ? "activated" : "default")}>Settings</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar