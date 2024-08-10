import React, { useEffect, useState } from 'react';
import UserNavbar from "../components/UserNavbar";
import { useNavigate } from "react-router-dom";

const Userpage = () => {
  const [info, setInfo] = useState(null);
  const navigater = useNavigate();

  // Define the JSON data as a JavaScript object
  const data = [
    {
      "latitude": 34.0522,
      "longitude": -118.2437,
      "soilType": "Clay",
      "weather": "Sunny"
    },
    {
      "latitude": 40.7128,
      "longitude": -74.0060,
      "soilType": "Sandy",
      "weather": "Rainy"
    }
  ];

  useEffect(() => {
    // Check for access token and navigate accordingly
    if (localStorage.getItem('accessToken') == null) {
      navigater("/");
    } else {
      navigater("/userpage");
    }
  }, [navigater]);

  useEffect(() => {
    // Example coordinates to check
    checkLocation(34.0522, -118.2437);
  }, []);

  // Function to check location and update state
  const checkLocation = (lat, lon) => {
    console.log('Checking location for:', lat, lon); // Log coordinates being checked
    const found = data.find(item => item.latitude === lat && item.longitude === lon);
    console.log('Found data:', found); // Log found data
    setInfo(found ? found : { message: 'Location not found' });
  };

  return (
    <div>
      <UserNavbar />
      <div>
        <h1>Location Information</h1>
        {info ? (
          <div>
            {info.message ? (
              <p>{info.message}</p>
            ) : (
              <div>
                <p><strong>Latitude:</strong> {info.latitude}</p>
                <p><strong>Longitude:</strong> {info.longitude}</p>
                <p><strong>Soil Type:</strong> {info.soilType}</p>
                <p><strong>Weather:</strong> {info.weather}</p>
              </div>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Userpage;
