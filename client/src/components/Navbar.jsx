import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          AgriProject
        </Link>
        <div className="nav-icon" onClick={toggleMenu}>
          <i className="bx bx-menu"></i>
        </div>
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li className="nav-item dropdown">
            <span className="nav-links dropdown-toggle">
              Pages
            </span>
            <div className="dropdown-menu">
              <Link to="/page1" className="dropdown-item" onClick={() => setIsOpen(false)}>
                Page1
              </Link>
              <Link to="/page2" className="dropdown-item" onClick={() => setIsOpen(false)}>
                Page2
              </Link>
            </div>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-links" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-links nav-signin" onClick={() => setIsOpen(false)}>
              Login
            </Link>
          </li>
        </ul>
        <button className="nav-toggle-btn" onClick={toggleMenu}>
          <i className="bx bx-menu"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
