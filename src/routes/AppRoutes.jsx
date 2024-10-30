import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const AppRoutes = () => {
    return (
        <Router>
            <Switch>
                <Route path='/Home' element={<Overview />}></Route>
                <Route path='/TaskCreation' element={<TaskCreation />}></Route>
                <Route path='/Statistics' element={<Statistics />}></Route>
                <Route path='/Logs' element={<LogsView />}></Route>
                <Route path='/Settings' element={<SettingsView />}></Route>
            </Switch>
        </Router>
    )
}

export default AppRoutes
