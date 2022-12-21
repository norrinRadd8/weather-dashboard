// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}


/*
    1. Show user an input to allow them to search for a city
    2. Show search history
        - Pull search history from localstorage
        - If search history is not empty, output each city ti the search history display in the DOM
        a. Show current forecast
        b. Show 5 day forecast
        c. Add city name to search history
            - Get previous searches from localstorage
            - If entered city has not been stored to search history in local storage, push the city name
            - Set search history to localstorage
*/




var apiKey = '0c18a6387cad294737c64ba4dd06b5ff';
var city = 'London';
var baseURL = 'https://api.openweathermap.org/data/2.5/';
var currentURL = baseURL + `weather?appid=${apiKey}&units=metric&`;
var forecastURL = baseURL + `forecast?appid=${apiKey}&units=metric&`;
var iconUrl = 'https://openweathermap.org/img/w/';

function inputSubmitted(cityName) {
    $.get(currentURL + `q=${cityName}`)
        .then(function(currentData) {
            console.log(currentData)

            console.log(`
            Temp: ${Math.round(currentData.main.temp)}°C
            Humidity: ${currentData.main.humidity}%
            Wind: ${currentData.wind.speed} mph
            Icon URL: ${iconUrl + currentData.weather[0].icon + '.png'}
            `)

    $.get(forecastURL + `lat=${currentData.coord.lat}&lon=${currentData.coord.lon}`)
        .then(function(forecastData){
            for (var castObj of forecastData.list) {
                console.log(`${iconUrl + castObj.weather[0].icon}.png`)
            }
        })
    })

}

inputSubmitted(city)







// var iconUrl = 'https://openweathermap.org/img/w/'

// $.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
//   .then(function(currentData) {
//   console.log(`
// Temp: ${Math.round(currentData.main.temp)}
// Wind: ${currentData.wind.speed}
// Humidity: ${currentData.main.humidity}%
// Icon URL: ${iconUrl + currentData.weather[0].icon + '.png'}
// `)

// $.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&appid=${apiKey}&units=metric`)
//   .then(function(forecastData) {
//   console.log(forecastData)
// })

// })