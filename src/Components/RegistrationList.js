import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import AdminHeader from "./AdminHeader";
import UserHeader from "./UserHeader";

export default function RegistrationList() {

    const [data, setData] = React.useState([]);

    useEffect(() => {
        getData();
    },[]);

    const handleApprove = async (e, id) => {
        e.preventDefault();
        try {
            const url = `https://localhost:44321/api/Registration/UserApproval`;
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
                    console.error("There was an error approving the registration!", error);
                });
        } catch (error) {
            console.error("Error approving registration:", error);
        }
    }

    const getData = async () => { 
        try {
            const url = `https://localhost:44321/api/Registration/RegistrationList`;
            const data = {
                UserType: 'USER'
            }

            axios.post(url, data)
                .then((response) => {
                    const data = response.data;
                    
                    if (data.statusCode === 200) {
                        setData(data.listRegistration);
                    }
                })
                .catch((error) => {
                    console.error("There was an error fetching the registration list!", error); 
                }
            );
        } catch (error) {
            console.error("Error fetching registration list:", error);
        }
    }     
    
    console.log("Registration List Data", data);

    return (
        <Fragment>
            <AdminHeader/>
            {data ? (
                <table className="table stripped table-hover mt-4"
                    style={{ backgroundColor:"white", width: "80%", margin: "0 auto" }}>
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone No</th> 
                            <th scope="col">IsApproved</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phoneNo =="" ? "-": item.phoneNo}</td>
                                <td>{item.isApproved ? "Yes" : "No"}</td>
                                <td>{ item.isApproved ?
                                    "Already Approved" 
                                    :
                                    <button className="btn btn-primary" onClick={(e) => {handleApprove(e,item.id)}}>
                                        Approve
                                    </button>
                                }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="alert alert-info" role="alert">
                    No registration data available.     
                </div>  
            )
            }
        </Fragment>
    );
}