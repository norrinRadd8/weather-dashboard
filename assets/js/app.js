// User submits city, city name and date and icon with temp, wind and humidity populates in the DOM

// Global Variables
var searchBtn = $("#search-button");
var searchInput = $("#search-input");
var historyBtn = $("#history-button");
var formInput = $(".form-input");
var today = $("#today");
var forecast = $("#forecast");
var fiveDayHeader = $("#fiveDayHeader");
var listGroup = $(".list-group");
var apiKey = "0c18a6387cad294737c64ba4dd06b5ff";
var city = "";
var baseURL = "https://api.openweathermap.org/data/2.5/";
var currentURL = baseURL + `weather?appid=${apiKey}&units=metric&`;
var forecastURL = baseURL + `forecast?appid=${apiKey}&units=metric&`;
var iconUrl = "https://openweathermap.org/img/w/";
var storeCity = [];

// Submission code that populates the DOM
function inputSubmitted(city) {
  today.html(" ");
  forecast.html(" ");
  fiveDayHeader.html(" ");

  $.get(currentURL + `q=${city}`).then(function (currentData) {
    console.log(currentData);
    today
      .append(
        `
            <div>
                <h3>${currentData.name} (${moment().format(
          "D/MM/YYYY"
        )})<img src="${
          iconUrl + currentData.weather[0].icon + ".png"
        }" alt="" style="float:right">
                </h3>
                    <p>Temp: ${Math.round(currentData.main.temp)}°C</p>
                    <p>Wind: ${currentData.wind.speed} mph</p>
                    <p>Humidity: ${currentData.main.humidity}%</p>
            </div>
            `
      )
      .removeClass("hide");
    // Populates the 5 Day forecast section
    fiveDayHeader
      .append(
        `
                <h3>5-Day Forecast: </h3>
            `
      )
      .removeClass("hide");

    $.get(
      forecastURL +
        `lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&cnt=40`
    ).then(function (forecastData) {
      var dayCount = 1;

      for (var castObj of forecastData.list) {
        if (dayCount <= 5) {
          forecast.append(`   
            <div class="card-styling">
                <h6><strong>${moment(castObj.dt_txt.split(" ")[0]).format(
                  "D/MM/YYYY"
                )}</strong></h6>
                <img src="${iconUrl + castObj.weather[0].icon}.png" alt=""> 
                <p>Temp: ${Math.round(castObj.main.temp)}°C</p>
                <p>Wind: ${castObj.wind.speed} mph</p>
                <p>Humidity: ${castObj.main.humidity}%</p>
            </div>
                `);
          dayCount++;
        } else {
          break;
        }
      } //console.log(forecastData.list)
    });
  });
}

// Enables search results, pushes to the array and produce history results
searchBtn.click(async function (event) {
  event.preventDefault();
  city = searchInput.val().trim();

  inputSubmitted(city);

  if (!city || !/^[a-zA-Z\s\-]+$/.test(city)) {
    return today
      .append(`<h1>Please enter a valid city name!</h1>`)
      .removeClass("hide");
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  );

  if (!response.ok) {
    return today
      .append(`<h1>Please enter a valid city name!</h1>`)
      .removeClass("hide");
  }

  storeCity.push(city);
  localStorage.setItem("city", JSON.stringify(storeCity));

  cityList();

  console.log(city);
});

function cityList() {
  var getCity = JSON.parse(localStorage.getItem("city"));
  listGroup.html("");

  for (var i = Math.max(getCity.length - 5, 0); i < getCity.length; i++) {
    listGroup.append(`
            <button onclick="historyList(event)" class="listButton">${getCity[i]}</button> 
        `);
  }
}

function historyList(event) {
  var getCity = $(event.target).text();
  city = inputSubmitted(getCity);
}
