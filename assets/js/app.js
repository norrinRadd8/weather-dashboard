
// User submits city, city name and date and icon with temp, wind and humidity populates in the DOM

var searchBtn = $('#search-button')
var searchInput = $('#search-input')
var historyBtn = $('#history-button')
var formInput = $('.form-input')
var today = $('#today')
var forecast = $('#forecast')
var fiveDayHeader = $('#fiveDayHeader')
var listGroup = $('.list-group')
var apiKey = '0c18a6387cad294737c64ba4dd06b5ff';
var city = '' ;
var baseURL = 'https://api.openweathermap.org/data/2.5/';
var currentURL = baseURL + `weather?appid=${apiKey}&units=metric&`;
var forecastURL = baseURL + `forecast?appid=${apiKey}&units=metric&`;
var iconUrl = 'https://openweathermap.org/img/w/';
var storeCity = []

function inputSubmitted(city) {
    today.html('')
    forecast.html('')
    fiveDayHeader.html('')

    $.get(currentURL + `q=${city}`)
        .then(function(currentData) {
            console.log(currentData)
            today.append(`
            <div>
                <h3>${currentData.name} (${moment().format('D/MM/YYYY')})<img src="${iconUrl + currentData.weather[0].icon + '.png'}" alt="" style="float:right">
                </h3>
                    <p>Temp: ${Math.round(currentData.main.temp)}°C</p>
                    <p>Wind: ${currentData.wind.speed} mph</p>
                    <p>Humidity: ${currentData.main.humidity}%</p>
            </div>
            `).removeClass('hide')

            fiveDayHeader.append(`
                <h3>5-Day Forecast: </h3>
            `).removeClass('hide')

    $.get(forecastURL + `lat=${currentData.coord.lat}&lon=${currentData.coord.lon}`)
        .then(function(forecastData){
            for (var castObj of forecastData.list) {

                forecast.append(`
                
            <div class="card-styling">
                <h7><strong>${castObj.dt_txt}</strong></h7>
                <img src="${iconUrl + castObj.weather[0].icon}.png" alt=""> 
                <p>Temp: ${Math.round(castObj.main.temp)}°C</p>
                <p>Wind: ${castObj.wind.speed} mph</p>
                <p>Humidity: ${castObj.main.humidity}%</p>
            </div>
                `)   
            }  
        })
    })
}

 searchBtn.click(function(event){
    
    event.preventDefault()
    
    city = searchInput.val()
   
    inputSubmitted(city)

    storeCity.push(city)
    localStorage.setItem('city', JSON.stringify(storeCity))
    var getCity = JSON.parse(localStorage.getItem('city'))


    //Button not being recognised may revert to li

    listGroup.append(`
    
        <button id="history-button" class="listButton">${city}</button>
        
    `)
    historyBtn.click(function(){
        inputSubmitted(city)
    })
    

    console.log(historyBtn)
    

})

// function init() {
    
// }
// init()

