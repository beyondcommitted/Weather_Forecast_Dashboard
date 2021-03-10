var apiKey = "e0705e1c21722222208808831152ca6e";

function getWeather(city) {
    var currentForecastUrl = `http://api.openweathermap.org/data/2.5/weather?q=${Phoenix}&appid=${apiKey}`;

    fetch(currentForecastUrl)
    .then((data) => data.json())
    .then(function (weather) {
        console.log(weather);

        if (weather.cod === "404") {
            alert("City not found");
            return;
        }

        var latitude = weather.coord.lat;
        var longitude = weather.coord.lon;
        var weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        fetch(weatherUrl)
        .then((data) => data.json())
    });
}