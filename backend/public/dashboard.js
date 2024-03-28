// dashboard.js

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchSuggestions = document.getElementById('searchSuggestions');
    const searchBtn = document.getElementById('searchBtn');

    let typingTimer;
    const doneTypingInterval = 500; // in milliseconds

    // Function to fetch places suggestions based on keyword
    function fetchPlaceSuggestions(keyword) {
        // Example: Make a fetch request to your backend API to fetch place suggestions
        // Replace '/places' with your actual backend API endpoint for fetching places
        fetch(`/getLocation?place=${keyword}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch places');
                }
                return response.json();
            })
            .then(data => {
                // Update the suggestion list based on the fetched data
                updateSuggestions(data);
            })
            .catch(error => {
                console.error('Error fetching places:', error.message);
            });
    }

    // Function to update the suggestion list with fetched data
    function updateSuggestions(data) {
        searchSuggestions.innerHTML = ''; // Clear previous suggestions
        if (data && data.length > 0) {
            data.forEach(place => {
                const suggestionItem = document.createElement('option');
                suggestionItem.textContent = `${place.name}, ${place.state}, ${place.country}`;
                suggestionItem.value = JSON.stringify({
                    lat: place.lat,
                    lon: place.lon
                });
                searchSuggestions.appendChild(suggestionItem);
            });
            searchSuggestions.style.display = 'block'; // Show the suggestion list
        } else {
            searchSuggestions.style.display = 'none'; // Hide the suggestion list if no suggestions
        }
    }

    // Event listener for clicking on search button
    // Event listener for clicking on search button
    searchBtn.addEventListener('click', function () {
        const selectedPlace = searchInput.value.trim();
        if (selectedPlace) {
            // Perform search for weather information for the selected place
            console.log('Search for weather in:', selectedPlace);
            const [lat, lon] = selectedPlace.split(',').map(parseFloat);

            const result = {
                "lat": lat,
                "lon": lon
            };
            console.log("Latitude:", result.lat);
            console.log("Longitude:", result.lon);
            // Make a fetch request to the backend with the latitude and longitude
            fetch(`/currentWeather?lat=${result.lat}&lon=${result.lon}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch weather data');
                    }
                    return response.json();
                })
                .then(weatherData => {
                    console.log('Weather data:', weatherData);
                    localStorage.setItem('weatherData',weatherData);
                    window.location.href = '/displayWeather';
                    // Process the weather data as needed
                })
                .catch(error => {
                    console.error('Error fetching weather:', error.message);
                });
        }
    });

    // Event listener for selecting an option from the dropdown
    // Event listener for clicking on an option from the dropdown
    searchSuggestions.addEventListener('click', function (event) {
        const selectedOption = event.target;
        const selectedPlace = JSON.parse(selectedOption.value);
        console.log(selectedPlace);
        searchInput.value = `${selectedPlace.lat},${selectedPlace.lon}`;
        searchSuggestions.style.display = 'none';
    });


    // Event listener for typing in the search box
    searchInput.addEventListener('input', function () {
        clearTimeout(typingTimer);
        if (searchInput.value) {
            typingTimer = setTimeout(function () {
                fetchPlaceSuggestions(searchInput.value);
            }, doneTypingInterval);
        } else {
            searchSuggestions.innerHTML = '';
            searchSuggestions.style.display = 'none';
        }
    });

    
});
