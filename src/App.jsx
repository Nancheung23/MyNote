import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { ThemeProvider } from "./contexts/ThemeContext"

const App = () => {
    return (
        <ThemeProvider>
            <AppRoutes />
        </ThemeProvider>
    )
}

export default App
