import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let navigater = useNavigate();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: username,
          status: true,
        });
        navigater('/');
      }
    });
  };

  return (
    <>
    <div className="bg">
      <h1 className="text-primary text-center my-4" style={styles.h1}>Login</h1>
      <div className="loginContainer border border-3 border-primary" style={styles.loginContainer}>
        <label style={styles.label}>Enter Username</label>
        <input
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          style={styles.input}
          autoFocus
        />
        <label style={styles.label}>Enter Password  </label>
        <input
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          style={styles.input}
        />

        <button onClick={login} className="btn btn-success mt-4 p-2" style={styles.button}>Login</button>
        <div style={styles.signupContainer}>
          {/* <span style={styles.signupText}>You don't have an account?</span> */}
          <Link to="/signup" className="btn btn-outline-primary mt-2 p-2" style={styles.signUpButton}>You don't have account? signup</Link>
        </div>
      </div>
      </div>
    </>
  );
}

const styles = {
  body: {
    fontFamily: "'Montserrat', sans-serif",
    background: "url('https://wallpapercave.com/wp/wp1886334.jpg')", // Background image URL
    backgroundColor: "black", // Corrected background color without extra space
    backgroundSize: "cover", // Ensures the image covers the entire background
    backgroundPosition: "center", // Centers the background image
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bg: {
    background: "url('https://wallpapercave.com/wp/wp1886334.jpg')", // Background image URL
    backgroundColor: "black", // Corrected background color without extra space
    backgroundSize: "cover", // Ensures the image covers the entire background
    backgroundPosition: "center", // Centers the background image
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loginContainer: {
    background: "linear-gradient(90deg, rgba(10,36,0,0.35290612827162116) 1%, rgba(33,121,9,0.5349789574032738) 1%, rgba(158,236,127,0.9719537473192402) 100%)", // Updated gradient for the form background
    borderRadius: "20px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
    padding: "50px",
    maxWidth: "400px",
    width: "100%",
    margin: "auto",
    marginTop: "20px",
    textAlign: "center",
    position: "relative",
    animation: "fadeInUp 1s ease-in-out", // Powerful animation
  },
  h1: {
    color: "black",
    textAlign: "center", // Center the text
    margin:"auto",
    marginTop:"50px",
    fontWeight: 700,
    letterSpacing: "1.5px",
    animation: "slideDown 0.7s ease-in-out",
  },
  label: {
    display: "block",
    fontWeight: 500,
    marginBottom: "8px",
    color: "white",
    animation: "fadeIn 1s ease-in-out",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "25px",
    transition: "border-color 0.3s ease",
  },
  inputFocus: {
    borderColor: "#56ab2f",
    outline: "none",
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
    marginTop:"10px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.3s ease",
    animation: "pulse 1.5s infinite",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
  },
  buttonHover: {
    transform: "scale(1.05)",
    backgroundColor: "#45a049",
  },
  signUpButton: {
    backgroundColor: "transparent",
    color: "white",
    
    // transition: "background-color 0.3s ease, color 0.3s ease, transform 0.3s ease",
    marginTop: "20px",
    fontWeight: 600,
    marginRight:"100px",
    textDecoration: "none",
    // boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
  },
  signUpButtonHover: {
    backgroundColor: "#56ab2f",
    color: "#fff",
    transform: "scale(1.05)",
  },
  signupContainer: {
    display: "flex",
    justifyContent: "center", // Center horizontally
    position: "absolute",
    bottom: "15px",
    width: "100%",
  },
  signupText: {
    fontSize: "14px",
    color: "#007bff",
    marginBottom: "5px",
  },
  // Keyframes for animations
  '@keyframes fadeInUp': {
    from: { transform: 'translateY(20px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
  },
  '@keyframes slideDown': {
    from: { transform: 'translateY(-20px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
  },
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.02)' },
    '100%': { transform: 'scale(1)' },
  },
};

export default Login;
