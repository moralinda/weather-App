function currentDate(date) {
  let currentDate = date.getDate();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = months[date.getMonth()];
  return `${day}, ${currentDate}, ${month}, ${hours}:${minutes} `;
}

let currentTime = document.querySelector("#today");
let now = new Date();
currentTime.innerHTML = currentDate(now);

function searchCity(city) {
  let apiKey = "46282d6c2bfaf109c807f0208a634585";
  let apiUrl = ` https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = searchInput.value;
  searchCity(city);
}

function showTemperature(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = `${temperature}`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchLocation(position) {
  let currentLat = position.coords.latitude;
  let currentLong = position.coords.longitude;
  let apiKey = `46282d6c2bfaf109c807f0208a634585`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLong}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("#weather-search");
form.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getCurrentLocation);

searchCity("Dublin");
