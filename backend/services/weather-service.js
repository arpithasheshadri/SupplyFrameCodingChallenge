const axios = require('axios');
const API_KEY = "6fa67728bcac232e903ecd8614c7475f";


const weatherByPlace = async (lat,lon) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  
  return response.data;
};

module.exports = { weatherByPlace };