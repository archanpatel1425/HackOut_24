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
                    <h1>Welcome to AgriProject</h1>
                    <p>Your trusted partner in fa rming and agriculture</p>
                    <button className="learn-more-button">Learn More</button>
                </div>
            </div>

                     
        </div>
        </>
    );
}

export default Home;