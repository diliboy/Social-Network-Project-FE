import React from "react";  
import { BrowserRouter as Router, Routes,  Route} from "react-router-dom";
import Login from "./Login";
import Registration from "./Registration";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";

export default function RouterPage() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" Component={Login} />
                <Route path="/registration" Component={Registration} />
                <Route path="/registration" Component={Registration} />
                <Route path="/userDashborad" Component={UserDashboard} />
                <Route path="/adminDashborad" Component={AdminDashboard} />
            </Routes>
        </Router>
    );
}