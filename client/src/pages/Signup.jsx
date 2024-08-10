import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../helpers/AuthContext";
import "../styles/Signup.css";
function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [date_of_birth, setBirthDate] = useState();
    const { setAuthState } = useContext(AuthContext);

    let navigater = useNavigate();

    const SignUp = () => {
        const data = { firstname: firstname, lastname: lastname, username: username, password: password, mobileNumber: mobileNumber, email: email, date_of_birth: date_of_birth };
        console.log(data)
        console.log("Hello")
        axios.post("http://localhost:3001/auth/signup", data).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                localStorage.setItem("accessToken", response.data.token);
                setAuthState({
                    username: response.data.username,
                    email: response.data.email,
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
                <label className="label">First name :</label>
                <input
                    type="f_name"
                    onChange={(event) => {
                        setFirstname(event.target.value);
                    }}
                    className="input"
                    autoFocus
                /><label className="label">Last name :</label>
                <input
                    type="l_name"
                    onChange={(event) => {
                        setLastname(event.target.value);
                    }}
                    className="input"
                    autoFocus
                />
                <label className="label">Email</label>
                <input
                    type="email"
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                    className="input"
                    autoFocus
                />
                <label className="label">User Name</label>
                <input
                    type="text"
                    onChange={(event) => {
                        setUsername(event.target.value);
                    }}
                    className="input"

                />
                <label className="label">Mobile Number</label>
                <input
                    type="number"
                    onChange={(event) => {
                        setMobileNumber(event.target.value);
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
                <label className="label">Birth Date</label>
                <input
                    type="date"
                    onChange={(event) => {
                        setBirthDate(event.target.value);
                    }}
                    className="input"
                />

                <button onClick={SignUp} className="button btn btn-success mt-2 p-2" >Sign Up</button>
            </div>
        </>
    );
}

export default Login;
