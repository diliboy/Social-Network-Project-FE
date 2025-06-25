import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import AdminHeader from "./AdminHeader";

export default function News() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [data, setData] = React.useState([]);

    useEffect(() => {
        getData();
    },[]);

    const handleSave = (e) => {
        e.preventDefault();
        console.log(title, content);
        const data = {
            Title: title,
            Content: content,
            Email: localStorage.getItem("loggedEmail"),
        }
        const url = `https://localhost:44321/api/News/AddNews`;
        axios.post(url, data)
            .then((response)=>{
                handleClear(e); // Clear the form fields after saving  
                const dt = response.data;
                alert(dt.statusMessage);
                console.log(dt);
                getData(); // Refresh the news list after saving
            })
            .catch((error)=>{
                console.error("There was an error saving the news data!", error);
            });
    }

    const handleClear = (e) => {
        e.preventDefault();
        setTitle("");
        setContent("");
    }   

    const getData = async () => { 
        try {
            const url = `https://localhost:44321/api/News/NewsList`;
   
            axios.get(url)
                .then((response) => {
                    const data = response.data;
                    
                    if (data.statusCode === 200) {
                        setData(data.listNews);
                    }
                })
                .catch((error) => {
                    console.error("There was an error fetching the news list!", error); 
                }
            );
        } catch (error) {
            console.error("Error fetching news list:", error);
        }
    }     
    
    console.log("News List Data", data);

    return (
        <Fragment>
            <AdminHeader/> 
            <br/>
            <br/>
            <form>
                <div className="form-row" style={{ width: "80%", margin: "auto", backgroundColor: "white"}}>
                    <div className="form-group col-md-12">
                        <h3>Add News</h3>
                    </div>
                    <br/>
                    <div className="form-group col-md-12">
                        <input type="text" className="form-control" id="title" placeholder="Enter title"
                        onChange={(e)=> setTitle(e.target.value)}required value={title}/>
                    </div>
                    <br/>
                    <div className="form-group col-md-12">
                        <textarea className="form-control" id="content" rows="5" placeholder="Enter content"
                        onChange={(e)=> setContent(e.target.value)} required value={content}></textarea>
                    </div>
                    <div className="form-group col-md-12">
                        <button type="submit" className="btn btn-primary mt-3"
                        onClick={(e) => handleSave(e)}>
                            Save
                        </button>
                        {" "}
                        <button type="reset" className="btn btn-danger mt-3"
                        onClick={(e) => {
                            handleClear(e);
                        }}>
                            Reset
                        </button>
                    </div>
                </div>
            </form>
            {data.length > 0 ? (
                <table className="table stripped table-hover mt-4"
                    style={{ backgroundColor:"white", width: "80%", margin: "0 auto" }}>
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Content</th>
                            <th scope="col">CreatedOn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.title}</td>
                                <td>{item.content}</td>
                                <td>{item.createdOn}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="alert alert-info" role="alert" style={{marginTop: "20px"}}>
                    No News data available.     
                </div>  
            )
            }
        </Fragment>
    );
}