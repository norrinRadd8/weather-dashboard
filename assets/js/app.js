// User submits city, city name and date and icon with temp, wind and humidity populates in the DOM

// Global Variables
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

// Submission code that populates the DOM
function inputSubmitted(city) {
    today.html(' ')
    forecast.html(' ')
    fiveDayHeader.html(' ')

    $.get(currentURL + `q=${city}`)
        .then(function(currentData) {
            //console.log(currentData)
            today.append(`
            <div>
                <h3>${currentData.name} (${moment().format('D/MM/YYYY')})<img src="${iconUrl + currentData.weather[0].icon + '.png'}" alt="" style="float:right">
                </h3>
                    <p>Temp: ${Math.round(currentData.main.temp)}°C</p>
                    <p>Wind: ${currentData.wind.speed} mph</p>
                    <p>Humidity: ${currentData.main.humidity}%</p>
            </div>
            `).removeClass('hide')
// Populates the 5 Day forecast section
            fiveDayHeader.append(`
                <h3>5-Day Forecast: </h3>
            `).removeClass('hide')

    $.get(forecastURL + `lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&cnt=40`)
        .then(function(forecastData){
            
            for (var castObj of forecastData.list) {
                forecast.append(`   
            <div class="card-styling">
                <h6><strong>${moment(castObj.dt_txt.split(' ')[0]).format('D/MM/YYYY')}</strong></h6>
                <img src="${iconUrl + castObj.weather[0].icon}.png" alt=""> 
                <p>Temp: ${Math.round(castObj.main.temp)}°C</p>
                <p>Wind: ${castObj.wind.speed} mph</p>
                <p>Humidity: ${castObj.main.humidity}%</p>
            </div>
                `)   
                
            }  //console.log(forecastData.list)
        }) 
    }) 
}
// Enables search results, pushes to the array and produce history results
 searchBtn.click(function(event){
    event.preventDefault()
    city = searchInput.val().trim()
   
    inputSubmitted(city)

    if(!city){ // Need to review this,so far, only checks a no entry          
        return today.append(`<h1>Please enter a valid city name!</h1>`).removeClass('hide')   
        
    } 

    storeCity.push(city)
    localStorage.setItem('city', JSON.stringify(storeCity))
    
    cityList()
    
  
    //searchInput.val(' ')
   
console.log((city)) 

})

// {/* <button onclick="historyList()" id="history-button" class="listButton">${getCity.slice(-1)}</button>  */}

function cityList() {

    var getCity = JSON.parse(localStorage.getItem('city'))
    
    for(var city of getCity) {
        listGroup.append(`
        <button onclick="historyList(event)" class="listButton">${city}</button> 
    `)

    }
        
    
}

 // Will eventually retrieve historical city searches
 // What I have is a button that is not unique and on click does the last event triggered
 // Need to match

function historyList(event) {
    var getCity = $(event.target).text()
    city = inputSubmitted(getCity)
   
    }



