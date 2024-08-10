import React, { useEffect, useState } from 'react';
import UserNavbar from "../components/UserNavbar";
import { useNavigate } from "react-router-dom";
import { Chart } from 'react-google-charts';
import '../styles/Userpage.css';

const Userpage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const weatherInfo = [
    {
      "latitude": 12.9716,
      "longitude": 77.5946,
      "soilType": "Loamy",
      "weather": "Sunny",
      "image": "https://th.bing.com/th/id/OIP.1knaDRc-ynNZdvDbH-8oAAHaEo?rs=1&pid=ImgDetMain"
    },
    {
      "latitude": 28.6139,
      "longitude": 77.2090,
      "soilType": "Clayey",
      "weather": "Rainy",
      "image": "https://th.bing.com/th/id/OIP.1knaDRc-ynNZdvDbH-8oAAHaEo?rs=1&pid=ImgDetMain"
    }
  ];

  const latitude = 12.9716;
  const longitude = 77.5946;

  useEffect(() => {
    if (localStorage.getItem('accessToken') === null) {
      navigate("/");
    } else {
      const data = weatherInfo.find(item => item.latitude === latitude && item.longitude === longitude);
      if (data) {
        setWeatherData(data);
      } else {
        setError("No data found for the provided coordinates.");
      }
    }
  }, [navigate]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const chartData = [
    ["Condition", "Value"],
    ["Temperature", 25],
    ["Humidity", 60],
    ["Wind Speed", 5]
  ];

  const chartOptions = {
    title: 'Current Weather Conditions',
    backgroundColor: 'transparent',
    titleTextStyle: {
      color: '#ff7e5f',
      fontSize: 30
    },
    legend: { textStyle: { color: '#fff' } },
    hAxis: {
      textStyle: { fontSize: 20,color: '#fff' }
    },
    vAxis: {
      textStyle: {fontSize: 10, color: '#fff' }
    }
  };

  return (
    <div>
      <UserNavbar />
      <div className="container">
        {weatherData && (
          <>
            <div className="weather-card">
              <img src={weatherData.image} alt={weatherData.weather} className="weather-image" />
              <div className="weather-info">
                <h2>Current Weather: <h7 style={{"color":"#ff7e5f"}}>{weatherData.weather}</h7></h2>
                <h2><strong>Latitude:</strong> <h7 style={{"color":"#ff7e5f"}}>{weatherData.latitude}</h7></h2>
                <h2><strong>Longitude:</strong><h7 style={{"color":"#ff7e5f"}}> {weatherData.longitude}</h7></h2>
                <h2><strong>Soil Type:</strong> <h7 style={{"color":"#ff7e5f"}}>{weatherData.soilType}</h7></h2>
              </div>
            </div>
            <div className="charts-card">
              <div className="chart-container">
                <Chart
                  chartType="BarChart"
                  width="100%"
                  height="200px"
                  data={chartData}
                  options={chartOptions}
                />
              </div>
              <button className="browse-seeds-button">
                Browse best seeds for current conditions
              </button>
            </div>
          </>
        )}
        {error && <div>{error}</div>}
      </div>
    </div>
  );
};

export default Userpage;
