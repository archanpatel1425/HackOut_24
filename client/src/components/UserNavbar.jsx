import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import axios from 'axios'
import '../styles/Navbar.css';
import { MdLocationOn, MdLogout, MdMap } from 'react-icons/md';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
    const [location, setLocation] = useState("");
    const [error, setError] = useState("");
    const [city, setCity] = useState('Locating...');
  
    useEffect(() => {

      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
  
      function success(pos) {
        const { latitude, longitude } = pos.coords;
        setLocation({ latitude, longitude });
        getCityName(latitude, longitude);
      }
  
      function error(err) {
        setError(err.message);
        setCity('Unable to retrieve location');
      }
  
      navigator.geolocation.getCurrentPosition(success, error, options);
    }, []);
  
    const getCityName = async (latitude, longitude) => {
      try {
        const response = await axios.get(
         ` https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${72.5713621}&key=ef0570f936894c548967ef9b9d98702b`
        );
        console.log(response.data); // Log the full response
        if (response.data.results && response.data.results.length > 0) {
          const components = response.data.results[0].components;
          const city =
            components.city ||
            components.town ||
            components.village ||
            components.county ||
            components.state_district ||
            components.suburb;
  
          if (city) {
            setCity(city);
          } else {
            setCity('City not found');
          }
        } else {
          setCity('No results found');
        }
      } catch (err) {
        console.error('API Error:', err);
        setCity('Failed to retrieve city name');
      }
    };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          AgriProject
        </Link>
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
        <li className="nav-item">
            <Link to="/userpage" className="nav-links nav-signin" onClick={() => setIsOpen(false)}>
            <MdLocationOn  style={{ color: 'red' }}/> langitude : {location.latitude}
            </Link>
          </li>
        <li className="nav-item">
            <Link to="/userpage" className="nav-links nav-signin" onClick={() => setIsOpen(false)}>
            <MdMap  style={{ color: 'red' }}/> Longitude : {location.longitude}
            </Link>
          </li>
        <li className="nav-item">
            <Link to="/" className="nav-links nav-signin" onClick={() => setIsOpen(false)}>
            <MdLogout  style={{ color: 'red' }}/> Logout
            </Link>
          </li>
        </ul>
        
      </div>
    </nav>
  );
};

export default Navbar;
