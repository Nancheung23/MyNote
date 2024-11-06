import React from "react"
import Info from '../components/Info'
import { useTheme } from "../contexts/ThemeContext"

const LogView = () => {
    // get current theme
    const { theme } = useTheme()

    return (
        <div className={`p-8 min-h-screen ${theme.bgColor} ${theme.textColor}`}>
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Log Page</h1>
            <Info />
        </div>
    )
}

export default LogView
