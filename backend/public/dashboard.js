
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchSuggestions = document.getElementById('searchSuggestions');
    const searchBtn = document.getElementById('searchBtn');
    const cityCardsContainer = document.getElementById('cityCards');
    const hourlyWeather = document.getElementById('hourly-weather');
    const cities = [
        {
            name: "Paris, France",
            latitude: 48.8566,
            longitude: 2.3522
        },
        {
            name: "New York City, United States",
            latitude: 40.7128,
            longitude: -74.0060
        },
        {
            name: "Tokyo, Japan",
            latitude: 35.6895,
            longitude: 139.6917
        },
        {
            name: "London, United Kingdom",
            latitude: 51.5074,
            longitude: -0.1278
        },
        {
            name: "Delhi, India",
            latitude: 28.6139,
            longitude: 77.2090
        }
    ];


    document.addEventListener('click', function (event) {
        const cardElement = event.target.closest('.top-five-card');
        if (cardElement) {
            const index = getIndexAmongSiblings(cardElement);
            plotChart(cities[index].latitude, cities[index].longitude);
            getWeather(cities[index].latitude,cities[index].longitude);
        }
    });
    
    function getIndexAmongSiblings(element) {
        let index = 0;
        while ((element = element.previousElementSibling) !== null) {
            index++;
        }
        return index;
    }


    function plotChart(lat, long) {
        console.log(lat, long)
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relative_humidity_2m,precipitation&timezone=GMT&forecast_days=1`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                return response.json();
            })
            .then(response => {

                const hourlyData = response.hourly;
                const labels = hourlyData.time.map(timestamp => moment(timestamp).format('hh A'));
                const temperatureData = hourlyData.temperature_2m;
                const humidityData = hourlyData.relative_humidity_2m;
                const precipitationData = hourlyData.precipitation;

                let chartStatus = Chart.getChart("weatherChart"); // "weatherChart" is the ID of your canvas element
                if (chartStatus) {
                    chartStatus.destroy();
                }

                var weatherChartCanvas = document.getElementById('weatherChart').getContext('2d');
                var weatherChart = new Chart(weatherChartCanvas, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Temperature (°C)',
                            data: temperatureData,
                            yAxisID: 'temp',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            borderColor: 'rgb(255, 99, 132)',
                            borderWidth: 1
                        }, {
                            label: 'Humidity (%)',
                            data: humidityData,
                            yAxisID: 'humidity',
                            backgroundColor: 'rgba(54, 162, 235, 0.5)',
                            borderColor: 'rgb(54, 162, 235)',
                            borderWidth: 1
                        }, {
                            label: 'Precipitation (mm)',
                            data: precipitationData,
                            yAxisID: 'precipitation',
                            type: 'bar',
                            backgroundColor: 'rgba(75, 192, 192, 0.5)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: [{
                                id: 'temp',
                                type: 'linear',
                                position: 'left',
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Temperature (°C)'
                                }
                            }, {
                                id: 'humidity',
                                type: 'linear',
                                position: 'right',
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Humidity (%)'
                                }
                            }, {
                                id: 'precipitation',
                                type: 'linear',
                                position: 'right',
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Precipitation (mm)'
                                },
                                grid: {
                                    drawOnChartArea: false
                                }
                            }]
                        }
                    }
                });
            })
            .catch(function (error) {
                console.error('Error fetching data:', error);
            });
    }

    function getWeatherForTopCities() {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=48.8566,40.7128,35.6895,51.5074,28.6139&longitude=2.3522,-74.006,139.6917,-0.1278,77.209&current=temperature_2m,is_day,precipitation,wind_speed_10m&forecast_days=1`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                return response.json();
            })
            .then(weatherData => {
                console.log(weatherData);
                const weatherDataList = weatherData;
                displayCurrentWeather(weatherDataList);
            })
            .catch(error => {
                console.error('Error fetching weather:', error.message);
            });


    }

    function getWeather(lat,long){
        fetch(`/currentWeather?lat=${lat}&lon=${long}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch weather data');
                    }
                    return response.json();
                })
                .then(weatherData => {
                    console.log(weatherData);
                    displayWeather(weatherData);

                })
                .catch(error => {
                    console.error('Error fetching weather:', error.message);
                });
    }

    function displayCurrentWeather(data) {
        var i = 0;
        data.forEach(city => {
            const cardHTML = `
              <div class="top-five-card">
                <img class="card-img-top" src="..." alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">${cities[i].name}</h5>
                  <p class="card-text">Temperature: ${city.current.temperature_2m}${city.current_units.temperature_2m} </p>
                  <p class="card-text">Precipitation: ${city.current.precipitation}${city.current_units.precipitation} </p>
                  <p class="card-text">Wind Speed: ${city.current.wind_speed_10m}${city.current_units.wind_speed_10m}</p>
                </div>
                <div class="card-footer">
                  <small class="text-muted">Time of the day : ${city.current.is_day == 0 ? "Night Time" : "Day Time"}</small>
                </div>
              </div>
            `;
            i = i + 1;
            cityCardsContainer.innerHTML += cardHTML;
        });
    }
    // function displayWeather(data) {
    //     console.log(data);
    //         const tableHeader = `
    //           <table class="table table-bordered">
    //             <thead>
    //               <tr>
    //                 <th scope="col">Time</th>
    //                 <th scope="col">Temperature (°C)</th>
    //                 <th scope="col">Relative Humidity (%)</th>
    //                 <th scope="col">Precipitation (mm)</th>
    //                 <th scope="col">Rain (mm)</th>
    //                 <th scope="col">Snowfall (cm)</th>
    //                 <th scope="col">Wind Speed (km/h)</th>
    //                 <th scope="col">UV Index</th>
    //                 <th scope="col">Is Day</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //         `;

    //         const tableFooter = `
    //             </tbody>
    //           </table>
    //         `;

    //         let tableBody = '';

    //         for (let i = 0; i < 10; i++) {
    //           tableBody += `
    //             <tr>
    //               <td>${data.hourly.time[i]}</td>
    //               <td>${data.hourly.temperature_2m[i]}</td>
    //               <td>${data.hourly.relative_humidity_2m[i]}</td>
    //               <td>${data.hourly.precipitation[i]}</td>
    //               <td>${data.hourly.rain[i]}</td>
    //               <td>${data.hourly.snowfall[i]}</td>
    //               <td>${data.hourly.wind_speed_10m[i]}</td>
    //               <td>${data.hourly.uv_index[i]}</td>
    //               <td>${data.hourly.is_day[i]}</td>
    //             </tr>
    //           `;
    //         }

    //         hourlyWeather.innerHTML = tableHeader + tableBody + tableFooter;

    // }
    function displayWeather(data) {
        const pageSize = 6; // Maximum number of entries per page
        const numPages = Math.ceil(data.hourly.time.length / pageSize); // Calculate total number of pages
        let currentPage = 1; // Current page number
    
        // Function to generate table rows for the current page
        function generateTableRows(page) {
            let tableBody = '';
            const startIndex = (page - 1) * pageSize;
            const endIndex = Math.min(startIndex + pageSize, data.hourly.time.length);

            console.log(startIndex)
            console.log(endIndex);
    
            for (let i = startIndex; i < endIndex; i++) {
                tableBody += `
                    <tr>
                        <td>${data.hourly.time[i]}</td>
                        <td>${data.hourly.temperature_2m[i]}</td>
                        <td>${data.hourly.relative_humidity_2m[i]}</td>
                        <td>${data.hourly.precipitation[i]}</td>
                        <td>${data.hourly.rain[i]}</td>
                        <td>${data.hourly.snowfall[i]}</td>
                        <td>${data.hourly.wind_speed_10m[i]}</td>
                        <td>${data.hourly.uv_index[i]}</td>
                        <td>${data.hourly.is_day[i]}</td>
                    </tr>
                `;
            }
            return tableBody;
        }
    
        // Function to update table content for the specified page
        function updateTable(page) {
            const tableBody = generateTableRows(page);
            hourlyWeather.innerHTML = tableHeader + tableBody + tableFooter;
        }
    
        // Generate pagination controls
        let paginationHtml = `
            <ul class="pagination justify-content-center">
                <li class="page-item"><a class="page-link" href="#" data-page="prev">&laquo;</a></li>
        `;
        for (let i = 1; i <= numPages; i++) {
            paginationHtml += `<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
        }
        paginationHtml += `<li class="page-item"><a class="page-link" href="#" data-page="next">&raquo;</a></li></ul>`;
    
        // Display initial page
        const tableHeader = `
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Time</th>
                        <th scope="col">Temperature (°C)</th>
                        <th scope="col">Relative Humidity (%)</th>
                        <th scope="col">Precipitation (mm)</th>
                        <th scope="col">Rain (mm)</th>
                        <th scope="col">Snowfall (cm)</th>
                        <th scope="col">Wind Speed (km/h)</th>
                        <th scope="col">UV Index</th>
                        <th scope="col">Is Day</th>
                    </tr>
                </thead>
                <tbody>
        `;
        const tableFooter = `</tbody></table>`;
        hourlyWeather.innerHTML = tableHeader + tableFooter; // Initial rendering
        hourlyWeather.insertAdjacentHTML('afterend', paginationHtml); // Insert pagination controls after the table
    
        updateTable(currentPage);
    
        // Attach event listener for pagination
    
        hourlyWeather.nextElementSibling.addEventListener('click', function(event) {
            event.preventDefault();
            const page = event.target.getAttribute('data-page');
            if (page === 'prev') {
                if (currentPage > 1) {
                    currentPage--;
                    updateTable(currentPage);
                }
            } else if (page === 'next') {
                if (currentPage < numPages) {
                    currentPage++;
                    updateTable(currentPage);
                }
            } else {
                currentPage = parseInt(page);
                updateTable(currentPage);
            }
        });
    }
    

    let typingTimer;
    const doneTypingInterval = 500;



    function fetchPlaceSuggestions(keyword) {
        fetch(`/getLocation?place=${keyword}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch places');
                }
                return response.json();
            })
            .then(data => {
                updateSuggestions(data);
            })
            .catch(error => {
                console.error('Error fetching places:', error.message);
            });
    }

    function updateSuggestions(data) {
        searchSuggestions.innerHTML = '';
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
            searchSuggestions.style.display = 'block';
        } else {
            searchSuggestions.style.display = 'none';
        }
    }

    searchBtn.addEventListener('click', function () {
        const selectedPlace = searchInput.value.trim();
        if (selectedPlace) {
            console.log('Search for weather in:', selectedPlace);
            const [lat, lon] = selectedPlace.split(',').map(parseFloat);

            const result = {
                "lat": lat,
                "lon": lon
            };
            console.log("Latitude:", result.lat);
            console.log("Longitude:", result.lon);
            fetch(`/currentWeather?lat=${result.lat}&lon=${result.lon}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch weather data');
                    }
                    return response.json();
                })
                .then(weatherData => {
                    console.log('Weather data:', weatherData);
                })
                .catch(error => {
                    console.error('Error fetching weather:', error.message);
                });
        }
    });

    searchSuggestions.addEventListener('click', function (event) {
        const selectedOption = event.target;
        const selectedPlace = JSON.parse(selectedOption.value);
        console.log(selectedPlace);
        searchInput.value = `${selectedPlace.lat},${selectedPlace.lon}`;
        searchSuggestions.style.display = 'none';
    });


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

    getWeatherForTopCities();
});
