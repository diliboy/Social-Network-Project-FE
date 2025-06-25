import React, {useState} from "react";
import '../index.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNo, setPhoneNo] = useState("");

    const navigate = useNavigate();

    const handleSave = (e) => {
        e.preventDefault();
        console.log(name, email, password, phoneNo);
        const data = {
            Name: name,
            Email: email,
            Password: password,
            PhoneNo: phoneNo
        }

        const url = `https://localhost:44321/api/Registration/Registration`;

        axios.post(url, data)
            .then((response)=>{
                clearFields();
                const dt = response.data;
                alert(dt.statusMessage);
                console.log(dt);
            })
            .catch((error)=>{
                console.error("There was an error saving the student data!", error);
            });
    }

    const clearFields = () => {
        setName("");
        setEmail("");
        setPassword("");
        setPhoneNo("");
    }

    const handleLogin = (e) => {
        e.preventDefault();
        navigate("/");
    }


    return (
        <section className="h-100 bg-dark">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                        <div className="card card-registration my-4">
                            <div className="row g-0">
                                <div className="col-xl-6 d-none d-xl-block">
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                                        alt="Sample photo"
                                        className="img-fluid"
                                        style={{
                                            borderTopLeftRadius: '.25rem',
                                            borderBottomLeftRadius: '.25rem'
                                        }}
                                    />
                                </div>
                                <div className="col-xl-6">
                                    <div className="card-body p-md-5 text-black">
                                        <h3 className="mb-5 text-uppercase">Student registration form</h3>

                                        <div className="row">
                                            <div className="col-md-12 mb-4">
                                                <div className="form" >
                                                    <input 
                                                        type="text" 
                                                        id="form3Example1m" 
                                                        className="form-control form-control-lg" 
                                                        onChange={(e)=>setName(e.target.value)}
                                                        value={name}
                                                    />
                                                    <label className="form-label" htmlFor="form3Example1m">Name</label>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="form mb-4">
                                            <input 
                                                type="email" id="form3Example97" 
                                                className="form-control form-control-lg" 
                                                onChange={(e)=>setEmail(e.target.value)}
                                                value={email}
                                            />
                                            <label className="form-label" htmlFor="form3Example97">Email</label>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12 mb-4">
                                                <div className="form">
                                                    <input 
                                                        type="password" 
                                                        id="form3Example1m1" 
                                                        className="form-control form-control-lg" 
                                                        onChange={(e)=>setPassword(e.target.value)}
                                                        value={password}
                                                    />
                                                    <label className="form-label" htmlFor="form3Example1m1">Password</label>
                                                </div>
                                            </div>
                                            
                                        </div>

                                        <div className="form mb-4">
                                            <input 
                                                type="text" 
                                                id="form3Example8" 
                                                className="form-control form-control-lg" 
                                                onChange={(e)=>setPhoneNo(e.target.value)}
                                                value={phoneNo}
                                            />
                                            <label className="form-label" htmlFor="form3Example8">Phone No</label>
                                        </div>


                                        <div className="d-flex justify-content-end pt-3">
                                            <button type="button" className="btn btn-light btn-lg">Reset all</button>
                                            <button type="button" className="btn btn-warning btn-lg ms-2"
                                                onClick={(e)=> handleSave(e)}>Submit form
                                            </button>
                                            <button type="button" className="btn btn-warning btn-lg ms-2"
                                                onClick={(e)=> handleLogin(e)}>Login
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Registration;
