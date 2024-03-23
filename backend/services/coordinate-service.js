const axios = require('axios');
const API_KEY = "6fa67728bcac232e903ecd8614c7475f";


const searchByPlace = async (place) => {
  const response = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=10&appid=${API_KEY}`
  );
  
  return response.data;
};

module.exports = { searchByPlace };