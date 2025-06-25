import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import AdminHeader from "./AdminHeader";

export default function Staff() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    },[]);

    const handleSave = (e) => {
        e.preventDefault();
        const data = {
            Name: name,
            Email: email,
            Password: password,
            UserType:"STAFF"
        }
        const url = `https://localhost:44321/api/Registration/StaffRegistration`;
        axios.post(url, data)
            .then((response)=>{
                handleClear(e); // Clear the form fields after saving  
                const dt = response.data;
                alert(dt.statusMessage);
                console.log(dt);
                getData(); // Refresh the news list after saving
            })
            .catch((error)=>{
                console.error("There was an error saving the staff data!", error);
            });
    }

    const handleClear = (e) => {
        e.preventDefault();
        setName("");
        setEmail("");
        setPassword("");
    }   

    const getData = async () => { 
        try {
            const url = `https://localhost:44321/api/Registration/RegistrationList`;
            const data = {
                UserType: 'STAFF'
            }
   
            axios.post(url,data)
                .then((response) => {
                    const data = response.data;
                    
                    if (data.statusCode === 200) {
                        setData(data.listRegistration);
                    }
                })
                .catch((error) => {
                    console.error("There was an error fetching the staff list!", error); 
                }
            );
        } catch (error) {
            console.error("Error fetching staff list:", error);
        }
    }     
    
    console.log("Staff List Data", data);

    return (
        <Fragment>
            <AdminHeader/> 
            <br/>
            <br/>
            <form>
                <div className="form-row" style={{ width: "80%", margin: "auto", backgroundColor: "white"}}>
                    <div className="form-group col-md-12">
                        <h3>Add New Staff</h3>
                    </div>
                    <br/>
                    <div className="form-group col-md-12">
                        <input type="text" className="form-control" id="name" placeholder="Enter Name"
                        onChange={(e)=> setName(e.target.value)}required value={name}/>
                    </div>
                    <br/>
                    <div className="form-group col-md-12">
                        <input type="text" className="form-control" id="name" placeholder="Enter Email"
                        onChange={(e)=> setEmail(e.target.value)}required value={email}/>
                    </div>
                    <br/>
                    <div className="form-group col-md-12">
                        <input type="password" className="form-control" id="title" placeholder="Enter Password"
                        onChange={(e)=> setPassword(e.target.value)}required value={password}/>
                    </div>
                    <div className="form-group col-md-3">
                        <button type="submit" className="btn btn-primary mt-3" style={{width:"150px", float:"left"}}
                        onClick={(e) => handleSave(e)}>
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
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="alert alert-info" role="alert" style={{marginTop: "20px"}}>
                    No Staff data available.     
                </div>  
            )
            }
        </Fragment>
    );
}