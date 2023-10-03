var cityName = document.querySelector('#city');
var userFormEl = document.querySelector('#userForm');
var textEntryEl = document.querySelector('#cityName');
var iconEl = document.querySelector('#icon');
var dateEl = document.querySelector('#date');
var tempEl = document.querySelector('#temp');
var windEl = document.querySelector('#wind');
var humidityEl = document.querySelector('#humidity');
var forecastEl = document.getElementById('forecast');

var formSubmitHandler = function (event) {
    event.preventDefault();

    var city = cityName.value.trim();
    var geoUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=d23d461cc1f1e5ba5d600e879f651007';
    if (city != "") {
        textEntryEl.textContent = "City name: " + city;
        fetch(geoUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
            var lat = data[0].lat;
            var lon = data[0].lon;
            var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=d23d461cc1f1e5ba5d600e879f651007';
            return fetch(weatherUrl);
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var iconCode = data.list[0].weather[0].icon;
            var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
            document.getElementById('icon').setAttribute('src', iconUrl);
            iconEl.style.display = 'block';
            dateEl.textContent ="Date: " + new Date(data.list[0].dt_txt).toLocaleDateString('en-US');
            tempEl.textContent = "Temp: " + Math.floor(data.list[0].main.temp) + "°";
            windEl.textContent = "Wind: " + Math.floor(data.list[0].wind.speed) + " MPH";
            humidityEl.textContent = "Humidity: " + data.list[0].main.humidity + "%";
        })
        .then(function (data) {
            for (i = 1; i < 5; i++) {
                var forecastCard = document.createElement('div');
                forecastCard.classList.add('forecast')
                forecastEl.appendChild(forecastCard)
                var date = document.createElement('p');
                date.textContent ="Date: " + new Date(data.list[i * 9].dt_txt).toLocaleDateString('en-US');
                forecastCard.appendChild(date);
                var iconCode = data.list[i * 9].weather[0].icon;
                var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
                var icon = document.createElement('img');
                icon.src = iconUrl;
                forecastCard.appendChild(icon);
                var temperature = document.createElement('p');
                temperature.textContent = "Temp: " + Math.floor(data.list[i * 9].main.temp) + "°";
                forecastCard.appendChild(temperature);
                var wind = document.createElement('p');
                wind.textContent = "Wind: " + Math.floor(data.list[i * 9].wind.speed) + " MPH";
                forecastCard.appendChild(wind);
                var humidity = document.createElement('p');
                humidity.textContent = "Humidity: " + data.list[i * 9].main.humidity + "%";
                forecastCard.appendChild(humidity);

            }
        })
        .catch(function (error) {
            console.error(error);
        });
    }

}

var getWeatherData = function () {

}

userFormEl.addEventListener('submit', formSubmitHandler);