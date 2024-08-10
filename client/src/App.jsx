import React, { useEffect, useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { AuthContext } from "./helpers/AuthContext";
import Navbar from "./components/Navbar";

function App() {
  const [count, setCount] = useState(0)
  const [authState, setAuthState] = useState({
    username: "",
    status: false,
  });

  useEffect(() => {
    // axios
    //   .get("http://localhost:3001/auth/auth", {
    //     headers: {
    //       accessToken: localStorage.getItem("accessToken"),
    //     },
    //   })
    //   .then((response) => {
    //     if (response.data.error) {
    //       setAuthState({ ...authState, status: false });
    //     } else {
    //       setAuthState({
    //         username: response.data.username,
    //         status: true,
    //       });
    //     }
    //   });
  }, []);

  return (
    <div>
      <AuthContext.Provider value={{ authState, setAuthState }}>

        <Router>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />}></Route>
            <Route path="/about" exact element={<About />}></Route>
            <Route path="/login" exact element={<Login/>} ></Route>
            <Route path="/signup" exact element={<Signup/>} ></Route>
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  )
}

export default App
