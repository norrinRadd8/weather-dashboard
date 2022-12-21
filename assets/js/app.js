// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}


// User submits city, city name and date and icon with temp, wind and humidity populates in the DOM

var searchBtn = $('#search-button')// Event listener for search
var searchInput = $('#search-input')
var today = $('#today')
var apiKey = '0c18a6387cad294737c64ba4dd06b5ff';
var city = 'Paris';
var baseURL = 'https://api.openweathermap.org/data/2.5/';
var currentURL = baseURL + `weather?appid=${apiKey}&units=metric&`;
var forecastURL = baseURL + `forecast?appid=${apiKey}&units=metric&`;
var iconUrl = 'https://openweathermap.org/img/w/';

function inputSubmitted(city) {
    $.get(currentURL + `q=${city}`)
        .then(function(currentData) {
            console.log(currentData)

            today.append(`
            <div>
            <h3>${currentData.name} (${moment().format('D/MM/YYYY')})<img src="${iconUrl + currentData.weather[0].icon + '.png'}" alt="" style="float:right"></h3>
            </div>
            <div>
                <p>Temp: ${Math.round(currentData.main.temp)}°C</p>
                <p>Wind: ${currentData.wind.speed} mph</p>
                <p>Humidity: ${currentData.main.humidity}%</p>
            </div>
            `)

            // console.log(`
            // Temp: ${Math.round(currentData.main.temp)}°C
            // Humidity: ${currentData.main.humidity}%
            // Wind: ${currentData.wind.speed} mph
            // Icon URL: ${iconUrl + currentData.weather[0].icon + '.png'}
            // `)

    $.get(forecastURL + `lat=${currentData.coord.lat}&lon=${currentData.coord.lon}`)
        .then(function(forecastData){
            for (var castObj of forecastData.list) {
                console.log(`${iconUrl + castObj.weather[0].icon}.png`)
            }
        })
    })

}
// searchBtn.click(function() {
//     console.log('hello')
//     console.log(searchInput.val())
// })

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