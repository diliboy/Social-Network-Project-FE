import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = React.useState("");   
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);
        const data = {
            Email: email,
            Password: password
        };

    const url = `https://localhost:44321/api/Registration/Login`;

    axios.post(url, data)
        .then((response) => {   
            const dt = response.data;
            console.log(dt);
            if (dt.statusCode === 200) {
                if(email === "admin" || password === "admin") {
                    localStorage.setItem("username", email);
                    localStorage.setItem("loggedEmail", email);
                    console.log("username", email);
                    console.log("email", email);
                    navigate("/adminDashboard"); 
                }else {
                    localStorage.setItem("loggedEmail", email);
                    localStorage.setItem("username", dt.registration.name);
                    if(dt.registration.userType === "STAFF") {
                        navigate("/staffDashboard");
                    }else{
                        navigate("/userDashboard");
                    }
                }
                // localStorage.setItem("userName", dt.userName);
                // localStorage.setItem("userId", dt.userId);
                console.log("username",dt.registration.name);
                
            }else {
                alert(dt.statusMessage);
                console.log(dt);
            }
            
        })
        .catch((error) => {
            console.error("There was an error logging in!", error);
        });
    }

    const handleRegister = (e) => {
        e.preventDefault();
        navigate("/registration");
    }

    return (
        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex align-items-center justify-content-center h-100">
                    <div className="col-md-8 col-lg-7 col-xl-6">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            className="img-fluid"
                            alt="Phone illustration"
                        />
                    </div>
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <form>
                    
                            <div className="form mb-4">
                                <input
                                    type="email"
                                    id="form1Example13"
                                    className="form-control form-control-lg"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label className="form-label" htmlFor="form1Example13">
                                    Email address
                                </label>
                            </div>

                        
                            <div className="form mb-4">
                                <input
                                    type="password"
                                    id="form1Example23"
                                    className="form-control form-control-lg"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <label className="form-label" htmlFor="form1Example23">
                                    Password
                                </label>
                            </div>

                            <div className="d-flex justify-content-around align-items-center mb-4">
                                {/* Checkbox */}
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="form1Example3"
                                        defaultChecked
                                    />
                                    <label className="form-check-label" htmlFor="form1Example3">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#!">Forgot password?</a>
                            </div>

                            {/* Submit button */}
                            <button type="submit" className="btn btn-primary btn-lg btn-block" onClick={(e) => {handleLogin(e)}}>
                                Sign in
                            </button>
                            <br/>
                            <button className="btn btn-secondary btn-lg btn-block" onClick={(e) => {handleRegister(e)}}>
                                Register
                            </button>

                            {/* <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                            </div> */}

                            {/* <a
                                className="btn btn-primary btn-lg btn-block mb-2"
                                style={{ backgroundColor: "#3b5998" }}
                                href="#!"
                                role="button"
                            >
                                <i className="fab fa-facebook-f me-2"></i>Continue with Facebook
                            </a>
                            <a
                                className="btn btn-primary btn-lg btn-block"
                                style={{ backgroundColor: "#55acee" }}
                                href="#!"
                                role="button"
                            >
                                <i className="fab fa-twitter me-2"></i>Continue with Twitter
                            </a> */}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
