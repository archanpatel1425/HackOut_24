import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import Navbar from "../components/Navbar";


function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [date_of_birth, setBirthDate] = useState("");
    const { setAuthState } = useContext(AuthContext);

    let navigater = useNavigate();

    const signUp = () => {
        const data = { firstname, lastname, username, password, mobileNumber, email, date_of_birth };
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
                navigater('/userpage');
            }
        });
    };

    return (
        <>
          <Navbar />
        <div style={styles.bg}>
            <div className="loginContainer border border-3 border-primary" style={styles.loginContainer}>
                <div className="form-group" style={styles.formGroup}>
                    <label className="label" style={styles.label}>First name:</label>
                    <input
                        type="text"
                        onChange={(event) => setFirstname(event.target.value)}
                        className="input"
                        style={styles.input}
                        autoFocus
                    />
                </div>
                <div className="form-group" style={styles.formGroup}>
                    <label className="label" style={styles.label}>Last name:</label>
                    <input
                        type="text"
                        onChange={(event) => setLastname(event.target.value)}
                        className="input"
                        style={styles.input}
                        autoFocus
                    />
                </div>
                <div className="form-group" style={styles.formGroup}>
                    <label className="label" style={styles.label}>Email:</label>
                    <input
                        type="email"
                        onChange={(event) => setEmail(event.target.value)}
                        className="input"
                        style={styles.input}
                        autoFocus
                    />
                </div>
                <div className="form-group" style={styles.formGroup}>
                    <label className="label" style={styles.label}>Username:</label>
                    <input
                        type="text"
                        onChange={(event) => setUsername(event.target.value)}
                        className="input"
                        style={styles.input}
                    />
                </div>
                <div className="form-group" style={styles.formGroup}>
                    <label className="label" style={styles.label}>Mobile Number:</label>
                    <input
                        type="number"
                        onChange={(event) => setMobileNumber(event.target.value)}
                        className="input"
                        style={styles.input}
                    />
                </div>
                <div className="form-group" style={styles.formGroup}>
                    <label className="label" style={styles.label}>Password:</label>
                    <input
                        type="password"
                        onChange={(event) => setPassword(event.target.value)}
                        className="input"
                        style={styles.input}
                    />
                </div>
                <div className="form-group" style={styles.formGroup}>
                    <label className="label" style={styles.label}>Birth Date:</label>
                    <input
                        type="date"
                        onChange={(event) => setBirthDate(event.target.value)}
                        className="input"
                        style={styles.input}
                    />
                </div>
                <button onClick={signUp} className="btn btn-success mt-2 p-2" style={styles.button}>Sign Up</button>
            </div>
            </div>
        </>
    );
}

const styles = {
    h1: {
        color: "black",
        textAlign: "center",
        margin: "auto",
        marginTop: "20px",
        fontWeight: 700,
        letterSpacing: "1.5px",
        animation: "slideDown 0.7s ease-in-out",
    },
    body:{
        height:"100%"
    },
    bg : {
        backgroundImage: "url('https://wallpapercave.com/wp/wp1886334.jpg')",
  backgroundColor: "black",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  height: "90vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
      },
      
    loginContainer: {
        background: "linear-gradient(90deg, rgba(10,36,0,0.35) 1%, rgba(33,121,9,0.53) 1%, rgba(158,236,127,0.97) 100%)",
        borderRadius: "20px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
        padding: "50px",
        maxWidth: "500px",
        width: "100%",
        margin: "auto",
        marginTop: "20px",
        textAlign: "center",
        position: "relative",
        animation: "fadeInUp 1s ease-in-out",
    },
    formGroup: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "15px",
    },
    label: {
        fontWeight: 500,
        marginRight: "10px",
        color: "white",
        flex: "1",
        animation: "fadeIn 1s ease-in-out",
    },
    input: {
        width: "70%",
        padding: "12px",
        border: "1px solid #ccc",
        borderRadius: "25px",
        transition: "border-color 0.3s ease",
        flex: "2",
    },
    button: {
        width: "100%",
        padding: "12px",
        border: "none",
        borderRadius: "30px",
        background: "linear-gradient(90deg, #56ab2f, #a8e063)",
        color: "#fff",
        fontSize: "16px",
        fontWeight: 600,
        marginTop: "10px",
        cursor: "pointer",
        transition: "background-color 0.3s ease, transform 0.3s ease",
        animation: "pulse 1.5s infinite",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
    },
};

export default SignUp;
