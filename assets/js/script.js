// setting variables
var pastSearches = document.getElementById('#past-searches');
var cityNameEl = document.getElementById('#results-city');
var currentDate = document.querySelector('#current-date');
var currentTemp = document.getElementById('#current-temp');
var currentWind = document.getElementById('#current-wind');
var currentHum = document.getElementById('#current-hum');
var currentUv = document.getElementById('#current-uv');
var tommorrowForecast = document.getElementById('#day-0');
var tomorrowTemp = document.getElementById('#temp-0');
var tomorrowWind = document.getElementById('#wind-0');
var tomorrowHum = document.getElementById('#hum-0');
var forecastDay2 = document.getElementById('#day-1');
var day2Temp = document.getElementById('#temp-1');
var day2Wind = document.getElementById('#wind-1');
var day2Hum = document.getElementById('#hum-1');
var forecastDay3 = document.getElementById('#day-2');
var day3Temp = document.getElementById('#temp-2');
var day3Wind = document.getElementById('#wind-2');
var day3Hum = document.getElementById('#hum-2');
var forecastDay4 = document.getElementById('#day-3');
var day4Temp = document.getElementById('#temp-3');
var day4Wind = document.getElementById('#wind-3');
var day4Hum = document.getElementById('#hum-3');
var forecastDay5 = document.getElementById('#day-4');
var day5Temp = document.getElementById('#temp-4');
var day5Wind = document.getElementById('#wind-4');
var day5Hum = document.getElementById('#hum-4');


var apiKey = 'a0261386ac4ee516e814165ba45ab66c';

setInterval(() => {
    const date = new Date();
    const month = date.getMonth();
    const day = date.getDay();
    const year = date.getFullYear();

    currentDate.innerHTML = '(' + month + '/' + day + '/' + year + ')';

}, 1000);