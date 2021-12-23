// setting variables
var pastSearches = document.querySelector('#past-searches');
var cityNameEl = document.querySelector('#results-city');
var currentDate = document.querySelector('#current-date');
var currentTemp = document.querySelector('#current-temp');
var currentWind = document.querySelector('#current-wind');
var currentHum = document.querySelector('#current-hum');
var currentUv = document.querySelector('#current-uv');
var currentIcon = document.querySelector('#currentIcon');
var tommorrowForecast = document.querySelector('#day-0');
var tomorrowTemp = document.querySelector('#temp-0');
var tomorrowWind = document.querySelector('#wind-0');
var tomorrowHum = document.querySelector('#hum-0');
var forecastDay2 = document.querySelector('#day-1');
var day2Temp = document.querySelector('#temp-1');
var day2Wind = document.querySelector('#wind-1');
var day2Hum = document.querySelector('#hum-1');
var forecastDay3 = document.querySelector('#day-2');
var day3Temp = document.querySelector('#temp-2');
var day3Wind = document.querySelector('#wind-2');
var day3Hum = document.querySelector('#hum-2');
var forecastDay4 = document.querySelector('#day-3');
var day4Temp = document.querySelector('#temp-3');
var day4Wind = document.querySelector('#wind-3');
var day4Hum = document.querySelector('#hum-3');
var forecastDay5 = document.querySelector('#day-4');
var day5Temp = document.querySelector('#temp-4');
var day5Wind = document.querySelector('#wind-4');
var day5Hum = document.querySelector('#hum-4');
var searchCityHistory = JSON.parse(localStorage.getItem('search')) || [];

const apiKey = 'a0261386ac4ee516e814165ba45ab66c';

setInterval(() => {
    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();

    currentDate.innerHTML = '(' + (month + 1) + '/' + day + '/' + year + ')';

}, 1000);

function searchForCity(event) {
    event.preventDefault();

    var searchedCity = cityNameEl.value;
    
    if(searchCityHistory.indexOf(searchedCity) === -1){
        searchCityHistory.push(searchedCity);
        var searchedCitiesButtonEl = document.createElement('button');
        searchedCitiesButtonEl.innerText = searchedCity;
        searchedCitiesButtonEl.addEventListener('click', function(){
            getLatAndLon(searchedCity);
        });

        pastSearches.appendChild(searchedCitiesButtonEl);

    }

    getLatAndLon(searchedCity);

    saveSearchedCities();
};

function saveSearchedCities() {
    localStorage.setItem('search', JSON.stringify(pastSearches));
};

function loadSearchedCities() {
    var searchHistory = localStorage.getItem('search');

    if(!searchHistory){
        searchHistory = [];
        return false;
    }

    searchHistory = JSON.parse(searchHistory);

    searchHistory.forEach(function(name) {
        var searchedCitiesButtonEl = document.createElement('button');
        searchedCitiesButtonEl.innerText = name;
        searchedCitiesButtonEl.addEventListener('click', function(){
            getLatAndLon(name);
        });

        pastSearches.appendChild(searchedCitiesButtonEl);
    })
};

function getLatAndLon(city) {
    var apiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + apiKey;

    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                getWeatherData(data[0].lat, data[0].lon, city);
            })
        } else {
            console.log(err);
        }
    });
};

function getWeatherData(lat, lon, city) {
    var exclude = 'hourly,minutely';
    var units = 'imperial';

    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=' + exclude + '&units=' + units + '&appid=' +  apiKey;

    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                currentForecast(data.current.temp, data.current.wind, data.current.humidity, data.current.uvi, data.current.weather[0].icon, city);

                fiveDayForecast(data.daily);
            })
        } else {
            console.log(err);
        }
    });
};

function currentForecast(temp, wind, humidity, uvi, icon, city){
    currentTemp.innerHTML = temp + '\xB0F';
    currentWind.innerHTML = wind + 'MPH';
    currentHum.innerHTML = humidity + '%';
    currentUv.innerHTML = uvi;
    currentIcon.setAttribute('src', 'https://openweathermap.org/img/wn/' + icon + '@2x.png');
    cityNameEl.innerHTML = city;

    if (uvi <= 3){
        currentUv.style.backgroundColor = 'green';
    } else if (uvi > 6){
        currentUv.style.backgroundColor = 'red';
    } else {
        currentUv.style.backgroundColor = 'yellow';
    };
};