// User submits city, city name and date and icon with temp, wind and humidity populates in the DOM

// Global Variables
var searchBtn = $("#search-button");
var searchInput = $("#search-input");
var historyBtn = $("#history-button");
var formInput = $(".form-input");
var welcomeState = $("#welcomeState");
var today = $("#today");
var forecast = $("#forecast");
var fiveDayHeader = $("#fiveDayHeader");
var listGroup = $(".list-group");
var apiKey = "0c18a6387cad294737c64ba4dd06b5ff";
var city = "";
var baseURL = "https://api.openweathermap.org/data/2.5/";
var currentURL = baseURL + `weather?appid=${apiKey}&units=metric&`;
var forecastURL = baseURL + `forecast?appid=${apiKey}&units=metric&`;
// var iconUrl = "https://openweathermap.org/img/w/";
var storeCity = [];
var searchHistory = [];

function firstState() {
  welcomeState.append(
    `<h1 class="date">${moment().format("ddd DD MMM, YYYY")}</h1>`
  );
}
firstState();

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
            <h3 class="current-data">${currentData.name}</h3> 
        <div class="big-image"><img src="${`assets/images/openweathermap/${currentData.weather[0].icon}.svg`}"  alt=""></div>
                    <p class="current-temp">${Math.round(
                      currentData.main.temp
                    )}°C</p>
                    <p class="description">${
                      currentData.weather[0].description
                    }</p>
                    
                    <div class="grid-data">
                    
                      <p class="current-wind"><img class="grid-icon" src=${`assets/images/openweathermap/wind.svg`}>${
          currentData.wind.speed
        } mph</p>
                      <p class="current-humidity"><img class="grid-icon" src=${`assets/images/openweathermap/humidity.svg`}>${
          currentData.main.humidity
        }%</p>

        <p class="current-sunrise"><img class="grid-icon" src=${`assets/images/openweathermap/clear-day.svg`}>${moment
          .unix(currentData.sys.sunrise)
          .format(`HH:mm`)}</p>

          <p class="current-sunset"><img class="grid-icon" src=${`assets/images/openweathermap/clear-night.svg`}>${moment
          .unix(currentData.sys.sunset)
          .format(`HH:mm`)}</p>

                    </div>
            </div>
            `
      )
      .removeClass("hide");

    // Populates the 5 Day forecast section
    fiveDayHeader
      .append(
        `
      <h3>5-Day Forecast:</h3>
    `
      )
      .removeClass("hide");

    $.get(
      forecastURL +
        `lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&cnt=40`
    ).then(function (forecastData) {
      var dayCount = 0;
      var dayTracker = {};

      for (var castObj of forecastData.list) {
        const castDate = moment(castObj.dt_txt.split(" ")[0]).format("ddd");

        if (dayCount < 5 && !dayTracker[castDate]) {
          forecast.append(`
            <div class="card-styling">
              <h6><strong>${castDate}</strong></h6>
              <img src="${`assets/images/openweathermap/${castObj.weather[0].icon}.svg`}" alt="">
              <p><img src="${`assets/images/openweathermap/thermometer-celsius.svg`}">${Math.round(
            castObj.main.temp
          )} °C</p>
              <p><img src="${`assets/images/openweathermap/wind.svg`}">${
            castObj.wind.speed
          } </p>
              <p><img src="${`assets/images/openweathermap/humidity.svg`}">${
            castObj.main.humidity
          }%</p>
            </div>
          `);
          dayCount++;
          dayTracker[castDate] = true;
        }
      }
    });
  });
}

// Enables search results, pushes to the array and produce history results
searchBtn.click(async function (event) {
  event.preventDefault();
  city = searchInput.val().trim();

  if (!city || !/^[a-zA-Z\s\-]+$/.test(city)) {
    // Check if message already displayed
    if ($("#invalid-input").length === 0) {
      today
        .append(
          `<h1 id="invalid-input">Please enter a valid country or city name!</h1>`
        )
        .removeClass("hide");
    }
    return;
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  );

  if (!response.ok) {
    // Check if message already displayed
    if ($("#invalid-input").length === 0) {
      today
        .append(
          `<h1 id="invalid-input">Please enter a valid country or city name!</h1>`
        )
        .removeClass("hide");
    }
    return;
  }

  var storedCities = JSON.parse(localStorage.getItem("city")) || [];
  if (!storedCities.includes(city)) {
    storedCities.push(city);
    localStorage.setItem("city", JSON.stringify(storedCities));
  }

  cityList();
  inputSubmitted(city);
  searchInput.val("");

  console.log(city);
});

function cityList() {
  var storedCities = JSON.parse(localStorage.getItem("city")) || [];
  var uniqueCities = new Set(storedCities);
  var lastFiveCities = Array.from(uniqueCities).slice(-5);

  listGroup.empty();

  for (let city of lastFiveCities) {
    listGroup.append(`
      <button onclick="historyList('${city}')" class="listButton">${city}</button> 
    `);
  }
}

function historyList(city) {
  inputSubmitted(city);
}
