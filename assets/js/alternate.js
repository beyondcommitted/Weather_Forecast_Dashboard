//Key into the server
var apiKey = "e0705e1c21722222208808831152ca6e";
var historyEl = document.querySelector("#history");
var inputEl = document.querySelector("#city-name");
var relCity = document.querySelector("#relCity");
var weatherHistory = JSON.parse(localStorage.getItem("city-name")) || [];
console.log(weatherHistory);
//function takes city name and retrieves weather data for that city
function getForecast(city) {
  var weatherURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey;
  //send fetch request to get latitude and longitude
  fetch(weatherURL)
    .then((data) => data.json())
    .then(function (weather) {
      console.log(weather);
      if (weather.cod === "404") {
        alert("City not found");
        return;
      }
      currentCity.innerHTML = "" + weather.name;
      var lat = weather.coord.lat;
      var lon = weather.coord.lon;
      //api call for the latitude and longitude
      var onecallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`;
      fetch(onecallURL)
        .then((data) => data.json())
        .then(function (onecallData) {
          console.log(onecallData);
          buildDashboard(onecallData);
        });
    });
  function buildDashboard(data) {
    var presentDay = new Date(data.current.dt * 1000);
    console.log(presentDay);
    var day = presentDay.getDate();
    var month = presentDay.getMonth() + 1;
    var year = presentDay.getFullYear();
    var currentTemperature = document.querySelector("#temp");
    var currentHumidity = document.querySelector("#humidity");
    var currentUvi = document.querySelector("#uvi");
    var searchBtn = document.querySelector("#searchBtn");
    var clearHistoryBtn = document.querySelector("#clearBtn");
    relCity.innerHTML +=
    " (" + month + "/" + day + "/" + year + ") ";
    currentTemperature.innerHTML =
      "Temperature: " + getFahrenheit(data.current.temp) + " F";
    currentHumidity.innerHTML = "Humidity: " + data.current.humidity + " %";
    currentUvi.innerHTML = "UV Index: " + data.current.uvi;
    var cityForecast = document.querySelector(".forecast");
    for (i = 0; i < 5; i++) {
      var forecastIndex = onecallData.daily[i];
      console.log(forecastIndex);
      cityForecast.append(buildForecast());
    }
    function buildForecast(forecast) {
      var col = document.createElement("div");
      col.classList.add("col");
      var forecastContainer = document.createElement("div");
      forecastContainer.classList.add("big-primary", "rounded", "p-5");
      var img = document.createElement("img");
      img.setAttribute("src", forecast.url);
      var forecastDate = new Date(data.daily[i].dt * 1000);
      console.log(forecastDate);
      var forecastDay = forecastDate.getDate();
      var forecastMonth = forecastDate.getMonth() + 1;
      var forecastYear = forecastDate.getFullYear();
      var forecastDate = document.createElement("h4");
      forecastDate.textContent = forecast.forecastDate;
      forecast.setAttribute();
      forecastDate.innerHTML =
        forecastMonth + "/" + forecastDay + "/" + forecastYear;
      cityForecast[i].append(forecastDate);
      var forecastTemp = document.createElement("p");
      //   temp.textContent= forecast.temp;
      forecastTemp.innerHTML =
        "Temp: " + getFahrenheit(data.daily[i].temp) + " F";
      cityForecast[i].append(forecastTemp);
      var forecastHumidity = document.createElement("p");
      forecastHumidity.innerHTML =
        "Humidity: " + data.daily[forecastIndex].humidity + "%";
      cityForecast[i].append(forecastHumidity);
      forecastContainer.append(
        forecastDate,
        img,
        forecastTemp,
        forecastHumidity
      );
      col.append(forecastContainer);
      return col;
    }
  }
}
// }
function getFahrenheit(K) {
  return Math.floor((K - 273.15) * 1.8 + 32);
}
searchBtn.addEventListener("click", function (e) {
  var searchCity = inputEl.value;
  getWeather(searchCity);
  weatherHistory.push(searchCity);
  localStorage.setItem("search", JSON.stringify(weatherHistory));
  // renderWeatherHistory();
});
clearHistoryBtn.addEventListener("click", function () {
  weatherHistory = [];
  renderSearchHistory();
});
// getWeather("");
