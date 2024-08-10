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
        navigater('/')
      }
    });
  };

  return (
    <>
      <h1 className="text-primary text-center my-4 ">Login</h1>
      <div className="loginContainer border border-3 border-primary" style={styles.loginContainer}>
        <label style={styles.label}>User name :</label>
        <input
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          style={styles.input}
          autoFocus
        />
        <label style={styles.label}>Password : </label>
        <input
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          style={styles.input}
        />

        <button onClick={login} className="btn btn-success mt-2 p-2" style={styles.button}>Login</button>
        <Link to="/signup" className="btn btn-outline-primary mt-2 p-2" style={styles.button}>Sign Up</Link>
      </div>
    </>
  );
}

const styles = {
  loginContainer: {
    padding: "40px",
    maxWidth: "400px",
    margin: "auto",
  },
  label: {
    marginBottom: "5px",
  },
  input: {
    marginBottom: "10px",
    padding: "5px",
    width: "100%",
  },
  button: {
    width: "100%",
  },
};

export default Login;
