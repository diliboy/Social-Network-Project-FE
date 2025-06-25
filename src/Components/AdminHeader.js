import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminHeader() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");

    useEffect(() => {
        setUserName(localStorage.getItem("username"));
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("username");
        navigate("/");
    }

    console.log("userName Admin Header", localStorage.getItem("username"));

    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">Social Network</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">
                                Welcome <span className="visually-hidden">(current)</span>
                                {userName ? userName : "Guest"}
                            </a>
                        </li>
                        <li className="nav-item">
                            <Link to="/registrationlist" className="nav-link">
                                Registration Management
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/articleList" className="nav-link">
                                Article Management
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/newsList" className="nav-link">
                                News Management
                            </Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link to="/staff" className="nav-link">
                                Staff Management
                            </Link>
                        </li>
                    </ul>
                    <button className="btn btn-outline-success d-flex" type="submit" onClick={(e) => handleLogout(e)}>
                        Logout
                    </button>
                </div>
            </nav>
        </Fragment>

    )
}