import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Overview from '../views/Overview.jsx'
import TaskCreation from '../views/TaskCreation.jsx'
import Statistics from '../views/StatisticsView.jsx'
import LogsView from '../views/LogsView.jsx'
import SettingsView from '../views/SettingsView.jsx'
import NavBar from "../components/NavBar.jsx";

const AppRoutes = () => {
    return (
        <Router>
            {/* navigation */}
            <NavBar />
            <Routes>
                {/* default route redirect to /Home */}
                <Route path='/' element={<Navigate to='/Home' replace />} />
                {/* routes */}
                <Route path='/Home' element={<Overview />} />
                <Route path='/TaskCreation' element={<TaskCreation />} />
                <Route path='/Statistics' element={<Statistics />} />
                <Route path='/Logs' element={<LogsView />} />
                <Route path='/Settings' element={<SettingsView />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes
