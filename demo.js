const axios = require('axios'); // CommonJS syntax, for use in Node.js

async function getWeather(apiKey, city) {
  const endpoint = 'http://api.openweathermap.org/data/2.5/weather';
  const url = `${endpoint}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    // Extract relevant information
    const cityName = data.name;
    const weatherDescription = data.weather[0].description;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    // Print the weather information
    console.log(`Weather in ${cityName}:`);
    console.log(`Description: ${weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)}`);
    console.log(`Temperature: ${temperature}°C`);
    console.log(`Humidity: ${humidity}%`);
    console.log(`Wind Speed: ${windSpeed} m/s`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}



const API_KEY = 'abcd';
const city = 'Ahmedabad';
getWeather(API_KEY, city);


