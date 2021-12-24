// setting variables
var pastSearches = document.querySelector('.past-searches');
var pastSearchBtn = document.querySelector('#past-search-btn');
var searchBtn = document.querySelector('.searchBtn');
var searchInput = document.querySelector('#search-input');
var cityNameEl = document.querySelector('#results-city');
var currentDate = document.querySelector('#current-date');
var currentTemp = document.querySelector('#current-temp');
var currentWind = document.querySelector('#current-wind');
var currentHum = document.querySelector('#current-hum');
var currentUv = document.querySelector('#current-uv');
var currentIcon = document.querySelector('#currentIcon');
var tommorrowForecast = document.querySelector('#day-0');
var forecastTitle = document.querySelector('#five-day-forecast');
var futureForecast = document.querySelector('#forecast-cards');

const apiKey = 'a0261386ac4ee516e814165ba45ab66c';

setInterval(() => {
    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();

    currentDate.innerHTML = '(' + (month + 1) + '/' + day + '/' + year + ')';

}, 1000);

function formEventHandler(event) {
    event.preventDefault();

    var searchedCity = searchInput.value;

    getLatAndLon(searchedCity);
};

searchBtn.onclick = function () {
    var newCity = searchInput.value;

    if(localStorage.getItem('city') == null){
        localStorage.setItem('city', '[]');
    }

    var oldSearch = JSON.parse(localStorage.getItem('city'));
    oldSearch.push(newCity);

    oldSearch = oldSearch.filter( function(item, index, inputArray) {
        return inputArray.indexOf(item) == index;
    });

    localStorage.setItem('city', JSON.stringify(oldSearch));

    

    function makeButton() {
        var newCity = localStorage.getItem("city")
        if (newCity == null || newCity == "") return;

        var oldSearch = JSON.parse(newCity);

        if(localStorage.getItem('city') != null) {
            for (var i = 0; i < oldSearch.length; i++) {
                var pastSearchBtn = document.createElement('button');
                pastSearchBtn.setAttribute('id', 'past-search-btn');
                pastSearchBtn.innerHTML = oldSearch[i];
                pastSearches.appendChild(pastSearchBtn);
            }
        }

        pastSearchBtn.onclick = function () {
            getLatAndLon(pastSearchBtn.textContent);
        }
    }

    makeButton();
};



function getLatAndLon(city) {
    var apiUrl1 = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + apiKey;

    fetch(apiUrl1).then(function(response){
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

    var apiUrl2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=' + exclude + '&units=' + units + '&appid=' +  apiKey;

    fetch(apiUrl2).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                currentForecast(data.current.temp, data.current.wind_speed, data.current.humidity, data.current.uvi, data.current.weather[0].icon, city);

                fiveDayForecast(data.daily);
            })
        } else {
            console.log(err);
        }
    });
};

function currentForecast(temp, wind, humidity, uvi, icon, city){
    currentTemp.innerHTML = temp + '\xB0F';
    currentWind.innerHTML = wind + ' MPH';
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

function fiveDayForecast(array) {
    forecastTitle.innerHTML = '5-Day Forecast:';

    futureForecast.textContent = '';

    for(var i = 1; i < 6; i++) {

        var columnDiv = document.createElement('div');
        columnDiv.classList.add('col');

        var cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        columnDiv.appendChild(cardDiv);

        var forecastDate = document.createElement('h4');
        forecastDate.classList.add('forecast-card-date');
        forecastDate = moment().add(i, 'days').format('L');
        cardDiv.textContent = forecastDate;

        var forecastIcon = document.createElement('img');
        forecastIcon.setAttribute('src', "https://openweathermap.org/img/wn/" + array[i].weather[0].icon + "@2x.png");
        forecastIcon.setAttribute('id', 'forecast-icon');
        forecastIcon.setAttribute('alt', 'forecast-icon');
        cardDiv.appendChild(forecastIcon);

        var forecastTemp = document.createElement('p')
        forecastTemp.innerHTML = 'Temp: ' + array[i].temp.day + "\xB0F";
        cardDiv.appendChild(forecastTemp);

        var forecastWind = document.createElement('p');
        forecastWind.innerHTML = 'Wind: ' + array[i].wind_speed + ' MPH';
        cardDiv.appendChild(forecastWind);

        var forecastHum = document.createElement('p');
        forecastHum.innerHTML = 'Humidity: ' + array[i].humidity + '%';
        cardDiv.appendChild(forecastHum);

        futureForecast.appendChild(columnDiv);
    }
};

searchBtn.addEventListener("click", formEventHandler);


// loadSearchedCities();