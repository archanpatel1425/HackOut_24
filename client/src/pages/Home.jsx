import React from 'react';
import '../styles/Home.css';
import Navbar from '../components/Navbar';
const Home = () => {
    return (
      <>
          <Navbar/>
        <div className="home-container">
            <div className="image-overlay">
                <div className="overlay-content">
                    <h1>Welcome to AgroMate</h1>
                    <p>Your trusted partner in fa rming and agriculture</p>
                    <button className="learn-more-button">Learn More</button>
                </div>
            </div>

            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h4>About Us</h4>
                        <p>AgroMate is dedicated to empowering farmers with technology. We provide the resources and tools needed to manage your farm efficiently.</p>
                    </div>
                    <div className="footer-section">
                        <h4>Contact Us</h4>
                        <p>Email: info@agromate.com</p>
                        <p>Phone: +91 12345 67890</p>
                        <p>Address: 123 Agriculture Road, New Delhi, India</p>
                    </div>
                    <div className="footer-section">
                        <h4>Follow Us</h4>
                        <div className="social-links">
                            <a href="#!">Facebook</a>
                            <a href="#!">Twitter</a>
                            <a href="#!">Instagram</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 AgroMate. All rights reserved.</p>
                </div>
            </footer>
        </div>
        </>
    );
}

export default Home;