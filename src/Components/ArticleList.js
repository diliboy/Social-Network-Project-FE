import axios from "axios";
import React, { Fragment, useEffect } from "react";
import AdminHeader from "./AdminHeader";


export default function ArticleList() {

    const [data, setData] = React.useState([]);

    useEffect(() => {
        getData();
    }, []);

    const handleApprove = async (e, id) => {
        e.preventDefault();
        try {
            const url = `https://localhost:44321/api/Article/ArticleApproval`;
            const data = {
                Id: id
            }
            axios.post(url, data)
                .then((response) => {
                    const data = response.data;
                    if (data.statusCode === 200) {
                        alert(data.statusMessage);
                        getData(); // Refresh the list after approval
                    }
                })
                .catch((error) => {
                    console.error("There was an error approving the article!", error);
                });
        } catch (error) {
            console.error("Error approving article:", error);
        }
    }

    const getData = async () => {
        try {
            const url = `https://localhost:44321/api/Article/ArticleList`;
            const data = {
                Type: 'Page'
            }

            axios.post(url, data)
                .then((response) => {
                    const data = response.data;

                    if (data.statusCode === 200) {
                        setData(data.listArticle);
                    }
                })
                .catch((error) => {
                    console.error("There was an error fetching the article list!", error);
                }
                );
        } catch (error) {
            console.error("Error fetching article list:", error);
        }
    }

    console.log("Article List Data", data);

    return (
        <Fragment>
            <AdminHeader />
            <div className="form-group col-md-12 mt-4">
                <h3>Article List</h3>
            </div>
            {data.length > 0 ? (
                <table className="table stripped table-hover mt-4"
                    style={{ backgroundColor: "white", width: "80%", margin: "0 auto" }}>

                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Content</th>
                            <th scope="col">Email</th>
                            <th scope="col">Image</th>
                            <th scope="col">IsApproved</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.title}</td>
                                <td>{item.content}</td>
                                <td>{item.email}</td>
                                <td>{item.image ? item.image : "-"}</td>
                                <td>{item.isApproved ? "Yes" : "No"}</td>
                                <td>{item.isApproved ?
                                    "Already Approved"
                                    :
                                    <button className="btn btn-primary" onClick={(e) => { handleApprove(e, item.id) }}>
                                        Approve
                                    </button>
                                }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="alert alert-info" role="alert" style={{ marginTop: "20px" }}>
                    No article data available.
                </div>
            )
            }
        </Fragment>
    );
}