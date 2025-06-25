import React from "react";  
import { BrowserRouter as Router, Routes,  Route} from "react-router-dom";
import Login from "./Login";
import Registration from "./Registration";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import RegistrationList from "./RegistrationList";
import ArticleList from "./ArticleList";
import News from "./News";
import Staff from "./Staff";
import UserArticle from "./UserArticle";

export default function RouterPage() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" Component={Login} />
                <Route path="/registration" Component={Registration} />
                <Route path="/registration" Component={Registration} />
                <Route path="/userDashborad" Component={UserDashboard} />
                <Route path="/adminDashborad" Component={AdminDashboard} />
                <Route path="/registrationList" Component={RegistrationList} />
                <Route path="/articleList" Component={ArticleList} />
                <Route path="/newsList" Component={News} />
                <Route path="/staff" Component={Staff} />
                <Route path="/userArticle" Component={UserArticle} />
            </Routes>
        </Router>
    );
}