import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import AdminHeader from "./AdminHeader";
import UserHeader from "./UserHeader";

export default function UserArticle() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    },[]);

    const saveFile = (e) => {
        e.preventDefault();
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
        }
    }

    const handleFileUpload = async (e) => {
        e.preventDefault();
        debugger;
        const data = {
            Title: title,
            Content: content,
            Email: localStorage.getItem("loggedEmail"),
            Image: fileName,
        };
        const formData = new FormData();
        formData.append("FormFile", file);
        formData.append("FileName", fileName);
        try {
            const url = `https://localhost:44321/api/Registration/UploadFile`;
            const res = await axios.post(url, formData);
            console.log(res);
            if (res.data.statusCode === 200 && res.data.statusMessage === "FIle uploaded successfully") {
                const url = `https://localhost:44321/api/Article/AddArticle`;
                const response = await axios.post(url, data);
                if (response.data.statusCode === 200) {
                    getData(); // Refresh the news list after saving
                    handleClear(e);
                    alert(response.data.statusMessage);
                } else {
                    alert("response.data.statusMessage");
                }
            }
        } catch (error) {
            console.error("There was an error uploading the file!", error);
        }
    }


    

    // const handleSave = (e) => {
    //     e.preventDefault();
    //     console.log(title, content);
    //     const data = {
    //         Title: title,
    //         Content: content,
    //         Email: localStorage.getItem("loggedEmail"),
    //     }
    //     const url = `https://localhost:44321/api/News/AddNews`;
    //     axios.post(url, data)
    //         .then((response)=>{
    //             handleClear(e); // Clear the form fields after saving  
    //             const dt = response.data;
    //             alert(dt.statusMessage);
    //             console.log(dt);
    //             getData(); // Refresh the news list after saving
    //         })
    //         .catch((error)=>{
    //             console.error("There was an error saving the news data!", error);
    //         });
    // }

    const handleClear = (e) => {
        e.preventDefault();
        setTitle("");
        setContent("");
    }   

    const getData = async () => { 
        try {
            const url = `https://localhost:44321/api/Article/ArticleList`;
            const data = {
                Type:"User",
                Email: localStorage.getItem("loggedEmail")
            }
   
            axios.post(url,data)
                .then((response) => {
                    const data = response.data;
                    
                    if (data.statusCode === 200) {
                        setData(data.listArticle);
                    }
                })
                .catch((error) => {
                    console.error("There was an error fetching the Article list!", error); 
                }
            );
        } catch (error) {
            console.error("Error fetching article list:", error);
        }
    }     
    
    console.log("News List Data", data);

    return (
        <Fragment>
            <UserHeader/> 
            <br/>
            <br/>
            <form>
                <div className="form-row" style={{ width: "80%", margin: "auto", backgroundColor: "white"}}>
                    <div className="form-group col-md-12">
                        <h3>Add Article</h3>
                    </div>
                    <br/>
                    <div className="form-group col-md-12">
                        <input type="text" className="form-control" id="title" placeholder="Enter title"
                        onChange={(e)=> setTitle(e.target.value)}required value={title}/>
                    </div>
                    <br/>
                    <div className="form-group col-md-12">
                        <input type="file" className="form-control" id="file" placeholder="Select Image"
                        onChange={(e)=> saveFile(e)} required/>
                    </div>
                    <br/>
                    <div className="form-group col-md-12">
                        <textarea className="form-control" id="content" rows="5" placeholder="Enter content"
                        onChange={(e)=> setContent(e.target.value)} required value={content}></textarea>
                    </div>
                    <div className="form-group col-md-3">
                        <button type="submit" className="btn btn-primary mt-3" style={{width:"150px", float:"left"}}
                        onClick={(e) => handleFileUpload(e)}>
                            Save
                        </button>
                        {" "}
                        <button type="reset" className="btn btn-danger mt-3" style={{width:"150px"}}
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
                            <th scope="col">Email</th>
                            <th scope="col">Image</th>
                            <th scope="col">IsApproved</th>
                            <th scope="col">Status</th>
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
                                <td>{item.isApproved ? "Already Approved" : "Approval Pending"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="alert alert-info" role="alert" style={{marginTop: "20px"}}>
                    No Article data available.     
                </div>  
            )
            }
        </Fragment>
    );
}
