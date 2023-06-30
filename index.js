// target html element
const input_box = document.getElementById("input_box");
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const day = document.getElementById("day");
const weather = document.getElementById("weather");
const error = document.getElementById("error");
const img = document.getElementById("img");

// days array

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// api key details
const api_key = "5220da9c579a47146e1145fcca9475f4";

// Function for showing error message

const showErrorMessage = (message) => {
  error.style.display = "block";
  error.innerHTML = message;
  input_box.focus();
  setTimeout(() => {
    error.style.display = "none";
  }, 3000);
};

// Function for fetching weather details from an api
const weatherApiCall = async () => {
  // if input field is empty then give an error and stop the function exection and come out from it
  if (input_box.value === "") {
    showErrorMessage("Type your city name");
    return;
  }

  // call api
  const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${input_box.value},in&appid=${api_key}`;
  const data = await fetch(api_url)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
      throw new Error("City not found in india");
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      showErrorMessage(err.message);
      input_box.value = "";
    });

  // setting values into dom elements

  city.innerHTML = data.name;
  temp.innerHTML = `${(data.main.temp - 273.15).toFixed(2)} °C`;
  humidity.innerHTML = `${data.main.humidity} %`;
  wind.innerHTML = `${data.wind.speed} KM/h`;
  day.innerHTML = days[new Date().getDay()];
  weather.innerHTML = `${data.weather[0].main}`;
  img.src = `./img/${data.weather[0].main}.png`;
  input_box.value = "";
  input_box.focus();
};

// Function for search button onclick
const fetchWeather = () => {
  weatherApiCall();
};

// Print Weather details on page for Delhi city bydefault when page load first time
// iffe function
(() => {
  weatherApiCall();
})();
