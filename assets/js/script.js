//api key
var weatherKey = "e0705e1c21722222208808831152ca6e";

// targeting elements
var storageEl = document.querySelector("#history");
var searchEl = document.querySelector("#cityName");
var searchedCity = document.querySelector("#searchedCity");
var citiesCached = document.querySelector("#citiesCached");


// converts kelvin to farenheight
function tempConversion(K) {
  return Math.floor((K - 273.15) * 1.8 + 32);
}
//seaching for weather in a specific city
function searchCityWeather(city) {
  var weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}`;

  //calling the weather api
  fetch(weatherURL)
    .then((data) => data.json())
    .then(function (weather) {
      if (weather.cod === "404") {
        alert("City not found");
        return;
      }
      searchedCity.innerHTML = "" + weather.name;
      var lat = weather.coord.lat;
      var lon = weather.coord.lon;

      //Calling the lat and lon
      var onecallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${weatherKey}`;
      fetch(onecallURL)
        .then((data) => data.json())
        .then(function (onecallData) {
          weatherDashboard(onecallData);
        });
    });
  function weatherDashboard(data) {
    var today = new Date(data.current.dt * 1000);
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    var presentTemperature = document.querySelector("#temperature");
    var presentHumidity = document.querySelector("#humidity");
    var currentUvi = document.querySelector("#uvIndex");
    var searchButton = document.querySelector("#searchButton");
    var resetButton = document.querySelector("#resetButton");
    searchedCity.innerHTML += ": " + month + "-" + day + "-" + year;
    presentTemperature.innerHTML =
      "Temp: " + tempConversion(data.current.temp) + " °F";
    presentHumidity.innerHTML = "Humidity: " + data.current.humidity + " %";
    currentUvi.innerHTML = "UV-Index: " + data.current.uvi;
    var cityForecast = document.querySelector("#forecast");
    cityForecast.innerHTML = "";
    for (i = 0; i < 5; i++) {
      var forecastIndex = data.daily[i];
      console.log(forecastIndex);
      cityForecast.append(fiveDayForecast(forecastIndex));
    }

    function fiveDayForecast(forecast) {
      var col = document.createElement("div");
      col.classList.add("col");
      var weatherContainer = document.createElement("div");
      weatherContainer.classList.add("big-primary", "rounded", "p-5");

      //   Creates the icon images so they can be displayed to the page
      var image = document.createElement("img");
      image.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`
      );

      //   Date, temp and humidity
      var presentDay = new Date(data.current.dt * 1000);
      var upcomingDay = presentDay.getDate();
      var presentMonth = presentDay.getMonth() + 1;
      var presentYear = presentDay.getFullYear();
      var presentDay = document.createElement("h4");
      presentDay.textContent = forecast.presentDay;
      presentDay.innerHTML =
        presentMonth + "/" + upcomingDay + "/" + presentYear;
      var displayedForecastTemp = document.createElement("p");
      displayedForecastTemp.innerHTML =
        "Temp: " + tempConversion(data.current.temp) + " °F";
      var upcomingHumidity = document.createElement("p");
      upcomingHumidity.innerHTML = "Humidity: " + data.daily[i].humidity + "%";

      //   Dispalys the elements created on the page to be viewed
      weatherContainer.append(
        presentDay,
        displayedForecastTemp,
        image,
        upcomingHumidity
      );
      // places a div into the page
      col.append(weatherContainer);
      // dispalys formatted div
      return col;
    }
  }
}
// retrieves value from the local storage
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
rendercitiesCached();
// stores the searched city in the local storage
searchButton.addEventListener("click", function (e) {
  var searchCity = searchEl.value;
  searchCityWeather(searchCity);
  searchHistory.push(searchCity);
  rendercitiesCached();
  localStorage.setItem("search", JSON.stringify(searchHistory));
});

// displays all the cities searched on the page
function rendercitiesCached() {
  citiesCached.innerHTML = "";
  for (i = 0; i < searchHistory.length; i++) {
    var historyEl = document.createElement("p");
    historyEl.textContent = searchHistory[i];
    citiesCached.append(historyEl);
  }
}
// Listens for the click of the reset button to clear the previous cities searched
resetButton.addEventListener("click", function () {
  localStorage.clear();
  searchHistory = [];
  citiesCached.innerHTML = "";
});