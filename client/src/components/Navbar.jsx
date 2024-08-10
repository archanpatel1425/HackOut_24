// src/Navbar.jsx
import React from "react";
import "../styles/Navbar.css";
import {Link} from 'react-router-dom'
const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <a href="#">Brand</a>
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
