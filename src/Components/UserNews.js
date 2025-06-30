// src/components/UserNews.js
import React, { useEffect, useState, Fragment } from "react";
import UserHeader from "./UserHeader";
import axios from "axios";

export default function UserNews() {
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const url = "https://localhost:44321/api/News/NewsList";
                const response = await axios.get(url);
                if (response.data.statusCode === 200) {
                    setNewsList(response.data.listNews);
                } else {
                    alert(response.data.statusMessage || "Failed to load news");
                }
            } catch (error) {
                console.error("Error fetching news:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);



    return (
        <Fragment>
            <UserHeader />
            <div className="container mt-4">
                <h3 className="col-md-12">Latest News</h3>
                {loading ? (
                    <div className="alert alert-info">Loading news...</div>
                ) : newsList.length > 0 ? (
                    <div className="row">
                        {newsList.map((item, index) => (
                            <div className="col-md-6" key={index}>
                                <div className="card mb-3 shadow-lg">
                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}</h5>
                                        <p className="card-text">{item.content}</p>
                                        <p className="card-text">
                                            <small className="text-muted">Posted by {item.email}</small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="alert alert-warning">No news available.</div>
                )}
            </div>
        </Fragment>
    );
}
