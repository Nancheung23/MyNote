// src/contexts/ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from "react"
import noteServices from "../services/noteServices"

// ThemeContext
const ThemeContext = createContext()

// ThemeProvider
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState({
        bgColor: "bg-white",
        textColor: "text-black",
    })

    // get stored themes
    useEffect(() => {
        const fetchTheme = async () => {
            try {
                const optionsData = await noteServices.getAll('options')
                const savedTheme = optionsData[0]?.theme || "default"

                // select theme by name
                switch (savedTheme) {
                    case "Dark":
                        setTheme({ bgColor: "bg-gray-800", textColor: "text-white" })
                        break
                    case "Light Blue":
                        setTheme({ bgColor: "bg-blue-100", textColor: "text-blue-900" })
                        break
                    case "Warm":
                        setTheme({ bgColor: "bg-yellow-100", textColor: "text-yellow-900" })
                        break
                    default:
                        setTheme({ bgColor: "bg-white", textColor: "text-black" })
                        break
                }
            } catch (error) {
                console.error("Failed to fetch theme:", error)
            }
        }
        fetchTheme()
    }, [])

    const updateTheme = async (newTheme) => {
        setTheme(newTheme)
        // change theme
        try {
            await noteServices.update("options", { id: 1, theme: newTheme.name })
        } catch (error) {
            console.error("Failed to update theme:", error)
        }
    }

    return (
        <ThemeContext.Provider value={{ theme, updateTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)
