import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../helpers/AuthContext";
import "../styles/Signup.css"
function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");
    const { setAuthState } = useContext(AuthContext);

    let navigater = useNavigate();

    const SignUp = () => {
        const data = { username: username, password: password, mobileNumber: mobileNumber, email: email };
        console.log(data)
        axios.post("http://localhost:3001/bookdata/signup", data).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                localStorage.setItem("accessToken", response.data.token);
                setAuthState({
                    username: response.data.username,
                    role: response.data.role,
                    mobileno: response.data.mobileno,
                    status: true,
                });
                navigater('/')
            }
        }); 
    };

    return (
        <>
            <h1 className="text-primary text-center my-4 ">Sign Up</h1>
            <div className="loginContainer border border-3 border-primary">
                <label className="label">Email</label>
                <input
                    type="email"
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                    className="input"
                    autoFocus
                />
                <label className="label">Mobile Number</label>
                <input
                    type="number"
                    onChange={(event) => {
                        setMobileNumber(event.target.value);
                    }}
                    className="input"
                />
                <label className="label">User Name</label>
                <input
                    type="text"
                    onChange={(event) => {
                        setUsername(event.target.value);
                    }}
                    className="input"

                />
                <label className="label">Password</label>
                <input
                    type="password"
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                    className="input"
                />

                <button onClick={SignUp} className="button btn btn-success mt-2 p-2" >Sign Up</button>
            </div>
        </>
    );
}

export default Login;
