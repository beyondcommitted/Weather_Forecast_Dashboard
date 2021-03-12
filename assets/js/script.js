//Key into the server
var weatherKey = "e0705e1c21722222208808831152ca6e";
var storageEl = document.querySelector("#history");
var searchEl = document.querySelector("#city-name");
var searchedCity = document.querySelector("#searchedCity");
var citiesCached= document.querySelector("#citiesCached");
function rendercitiesCached(){
    citiesCached.innerHTML="";
    for(i=0; i< searchHistory.length; i++){
        var historyEl = document.createElement('p');
        historyEl.textContent=searchHistory[i];
        citiesCached.append(historyEl)
    }
}
function tempConversion(K) {
  return Math.floor((K - 273.15) * 1.8 + 32);
}
//function takes city name and retrieves weather data for that city
function searchCityWeather(city) {
  var weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}`;
  //send fetch request to get latitude and longitude
  fetch(weatherURL)
    .then((data) => data.json())
    .then(function (weather) {
      console.log(weather);
      if (weather.cod === "404") {
        alert("City not found");
        return;
      }
      searchedCity.innerHTML = "" + weather.name;
      var lat = weather.coord.lat;
      var lon = weather.coord.lon;
      //api call for the latitude and longitude
      var onecallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${weatherKey}`;
      fetch(onecallURL)
        .then((data) => data.json())
        .then(function (onecallData) {
          console.log(onecallData);
          buildDashboard(onecallData);
        });
    });
    