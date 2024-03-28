// weather.js

document.addEventListener('DOMContentLoaded', function () {
    // Fetch weather data from the server
    // Destination page

    const data = JSON.parse(localStorage.getItem('weatherData'));
    localStorage.removeItem('weatherData');
    const weatherInfo = document.getElementById('weatherInfo');
    if (data) {
        // Update weather information on the page
        updateWeatherInfo(weatherData);
    } else {
        // Display error message if weather data is not available
        weatherInfo.innerHTML = '<p>Error: Weather data not available.</p>';
    }
    function updateWeatherInfo(data) {
        const cityName = data.name;
        const description = data.weather[0].description;
        const temperature = (data.main.temp - 273.15).toFixed(2); // Convert temperature to Celsius

        // Create HTML elements to display weather information
        const weatherHTML = `
                <h2>${cityName}</h2>
                <p>Description: ${description}</p>
                <p>Temperature: ${temperature} &deg;C</p>
            `;

        // Update the weather information on the page
        weatherInfo.innerHTML = weatherHTML;
    }

});
