const axios = require('axios');
const API_KEY = "6fa67728bcac232e903ecd8614c7475f";


const weatherByPlace = async (lat,lon) => {
  const response = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,precipitation,rain,snowfall,wind_speed_10m,uv_index,is_day&daily=sunrise,sunset&timezone=GMT&forecast_days=1`
  );
  
  return response.data;
};

module.exports = { weatherByPlace };