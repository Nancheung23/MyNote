import React from "react"
import { useTheme } from "../contexts/ThemeContext"

const themes = [
    { name: "Default", bgColor: "bg-white", textColor: "text-black" },
    { name: "Dark", bgColor: "bg-gray-800", textColor: "text-white" },
    { name: "Light Blue", bgColor: "bg-blue-100", textColor: "text-blue-900" },
    { name: "Warm", bgColor: "bg-yellow-100", textColor: "text-yellow-900" },
]

const SettingsView = () => {
    const { theme, updateTheme } = useTheme()

    return (
        <div className={`p-8 min-h-screen ${theme.bgColor} ${theme.textColor}`}>
            <h1 className="text-3xl font-bold mb-6">Settings</h1>
            <h2 className="text-xl font-semibold mb-4">Select Theme</h2>
            <div className="space-y-4">
                {themes.map((t) => (
                    <div key={t.name} className="flex items-center">
                        <input
                            type="radio"
                            id={`theme-${t.name}`}
                            name="theme"
                            value={t.name}
                            checked={theme.bgColor === t.bgColor}
                            onChange={() => updateTheme(t)}
                            className="mr-2"
                        />
                        <label htmlFor={`theme-${t.name}`} className="cursor-pointer">
                            {t.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SettingsView
