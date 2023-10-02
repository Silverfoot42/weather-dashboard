var cityName = document.querySelector('#city');
var userFormEl = document.querySelector('#userForm');



var formSubmitHandler = function (event) {
    event.preventDefault();

    var city = cityName.value.trim();
    var geoUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=d23d461cc1f1e5ba5d600e879f651007';
    if (city != "") {
        fetch(geoUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
            console.log(data);
            var lat = data[0].lat;
            var lon = data[0].lon;
            var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=d23d461cc1f1e5ba5d600e879f651007';
            return fetch(weatherUrl);
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
        .catch(function (error) {
            console.error(error);
        });
    }

}

var getWeatherData = function () {

}

userFormEl.addEventListener('submit', formSubmitHandler);