let apiKey = "8fcf11a4c2d8ccd4a4dbb2e0f3ab5ad0";
let city = "Argenthal";
let apiUrl1 = `https://api.openweathermap.org/data/2.5/weather`;
let apiUrl2 = `?q=${city}&units=metric`;

document.addEventListener("DOMContentLoaded", function (event) {
  let now = new Date();

  console.log(now.getDate());

  let h2 = document.querySelector("h2");
  console.log(h2);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[now.getDay()];

  let hours = now.getHours();
  let minutes = now.getMinutes();

  h2.innerHTML = `${day} ${hours}:${minutes}`;

  let input = document.querySelector("#button-addon2");

  input.addEventListener("click", search);

  let searchField = document.querySelector("#search-input");

  searchField.addEventListener("keypress", enterPress);

  function enterPress(event) {
    if (event.keyCode === 13) {
      document.querySelector("#button-addon2").click();
    }
  }

  //let link = document.querySelector("#celsius");
  //link.addEventListener("click", celsius);

  axios.get(`${apiUrl1 + apiUrl2}&appid=${apiKey}`).then(showTemperature);
});

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  console.log(searchInput.value);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  axios
    .get(`${apiUrl1}?q=${searchInput.value}&units=metric&appid=${apiKey}`)
    .then(showTemperature);
}

let celsiusTemperature = 17;
let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
let isCelcius = true;

function celsius(event) {
  //event.preventdefault();
  let degreeElem = document.querySelector("#celsius");
  if (isCelcius) {
    degreeElem.innerHTML = fahrenheitTemperature + " °F";
    isCelcius = false;
  } else {
    degreeElem.innerHTML = celsiusTemperature + " °C";
    isCelcius = true;
  }
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let description = document.querySelector("#temperature-description");
  console.log(response, temperatureElement, description);
  temperatureElement.innerHTML = `${temperature}°C`;
  description.innerHTML = response.data.weather[0].description;
}
