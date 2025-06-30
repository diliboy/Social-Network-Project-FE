import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function UserHeader() {

    const navigate = useNavigate();
    const [userName, setUserName] = useState("");

    useEffect(() => {
        console.log("UserHeader username", localStorage.getItem("username"))
        setUserName(localStorage.getItem("username"));
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("username");
        navigate("/");
    }

    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to="/userDashboard" className="navbar-brand">
                    Social Network
                </Link>
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
                            <Link to="/userDashboard" className="nav-link">
                                Welcome <span className="visually-hidden">(current)</span>
                                {userName ? userName : "Guest"}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/userArticle" className="nav-link">
                                Add Article
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/userNews" className="nav-link">
                                News
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