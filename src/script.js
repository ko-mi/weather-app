function formatDate (now) {
    let hours = now.getHours();
      if (hours < 10) {
         hours = `0${hours}`;
      }
    let minutes = now.getMinutes();
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
    let dayIndex = now.getDay();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[dayIndex];

    return `${day}, ${hours}:${minutes}`
};



function displayFunFact(weather){
  let facts = {
    "Thunderstorm": {
      group_id: 2,
      img: "",
      fact: "At any given time, on average there are about 1800 thunderstorms occurring on Earth with 100 lightning strikes per second?",
      greeting: `Have a great day<br>and be safe out there!`,
    },
    "Drizzle": {
      group_id: 3,
      img: "",
      fact: "It was so cold in 1684 that the Thames River in England froze solid for two months?",
      greeting: `Have a great day<br>and keep your umbrella<br>on hand!`,
    },
    "Rain": {
      group_id: 5,
      img: "",
      fact: "For each minute of the day, 1 billion tonnes of rain falls on the Earth?",
      greeting: `Have a great day<br>and have you umbrella<br>close to you!`,
    },
    "Snow":{
      group_id: 6,
      img: "",
      fact: "Snowflakes falling at 2-4 mph can take up to 1 hour to reach the ground?",
      greeting: `Have a great day<br>and enjoy this snowy time!`,
    },
    "Atmosphere":{
      group_id: 7,
      img: "",
      fact: "A cubic mile of ordinary fog contains less than a gallon of water?",
      greeting: `Have a great day<br>and be safe out there!`,
    },
    "Clear":{
      group_id: 8,
      img: "",
      fact: "Highest Temperature Recorded on Earth is 56.7°C (134°F) at Greenland Ranch in Death Valley, California, on July 10, 1913?",
      greeting: `Have a great day<br>and enjoy this<br>beautiful weather!`,
    },
    "Clouds":{
      group_id: 9,
      img: "",
      fact: "9 out of 10 lightings strike land rather than water?",
      greeting: `Have a great day today!`,
    }
  };
  
  for(i in facts){
    if (i === weather){
      let factElement = document.querySelector("#fun-fact");
      let greetingElement = document.querySelector("#greeting");
      let imgElement = document.querySelector("#fact-img");
      let questionElement = document.querySelector("#did-you-know");

      factElement.innerHTML = `${facts[i].fact}`;
      greetingElement.innerHTML = `${facts[i].greeting}`;
      questionElement.innerHTML = `Did you know that...`
      // imgElement.innerHTML = `${facts[i].img}`;
      
    } else {}
  }
}

function displayWeather(response){
  let cityElement = document.querySelector("#searched-location");
  let temperatureElement = document.querySelector("#temperature-value-today");
  let feelsLikeElement = document.querySelector("#feels-like");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let tempMaxElement = document.querySelector("#temp-max");
  let tempMinElement = document.querySelector("#temp-min");
  let iconElement = document.querySelector("#weather-icon-today");
  let descriptionElement = document.querySelector("#weather-description-today");
  
  celsiusTemperature = Math.round(response.data.main.temp);
  feelsLikeTemperature = Math.round(response.data.main.feels_like);
  maxTemp = Math.round(response.data.main.temp_max);
  minTemp = Math.round(response.data.main.temp_min);
  
  cityElement.innerHTML= `${response.data.name}, ${response.data.sys.country}`;
  temperatureElement.innerHTML = Math.round(response.data.main.temp); 
  feelsLikeElement.innerHTML = `Feels like ${feelsLikeTemperature}°C`
  windElement.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  tempMaxElement.innerHTML = `${maxTemp}°C`;
  tempMinElement.innerHTML = `${minTemp}°C`;
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  descriptionElement.innerHTML = response.data.weather[0].description
  
  displayFunFact(response.data.weather[0].main)
  
}

function formatHours (timestamp){

    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
    hours = `0${hours}` ;
   }
    let minutes = date.getMinutes();
    if (minutes < 10) {
    minutes = `0${minutes}` ;
   }
    return `${hours}:${minutes}`
}

function displayForecast(response){
  let forecastElement = document.querySelector("#forecast")
  let forecast = null;
  forecastElement.innerHTML = null;
  
  for (let i=0; i<4; i++) {
    let forecast = response.data.list[i];
    forecastElement.innerHTML += 
    `<div class="col-sm-3">
    <p>${formatHours(response.data.list[i].dt*1000)}</p>
    <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
    <p class="temp">
    ${Math.round(forecast.main.temp_max)}°/${Math.round(forecast.main.temp_min)}°
    </p>
    </div>`
  }
  
  
}


function retrievePosition(position) {
  let apiKey = "f2c2464d613122ee477482113433912c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
  axios.get(apiUrl).then(displayForecast);
}

function fetchData(city){
  
  let apiKey = "f2c2464d613122ee477482113433912c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`

  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&&units=metric`
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayForecast);
}



function handleSearch(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    fetchData(searchInputElement.value);
};

function displayInFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-value-today")
  let feelsLikeElement = document.querySelector("#feels-like")
  let tempMaxElement = document.querySelector("#temp-max");
  let tempMinElement = document.querySelector("#temp-min");
  celsiusButton.classList.remove("active");
  fahrenheitButton.classList.add("active");
  let temperatureInFahrenheit = Math.round(celsiusTemperature * 9 / 5 + 32);
  let feelsLikeTemperatureInFahrenheit = Math.round(feelsLikeTemperature * 9 / 5 + 32);
  let tempMaxinF = Math.round(maxTemp * 9 / 5 + 32);
  let tempMininF = Math.round(minTemp * 9 / 5 + 32);
  temperatureElement.innerHTML = temperatureInFahrenheit;
  feelsLikeElement.innerHTML = `Feels like ${feelsLikeTemperatureInFahrenheit}°F`
  tempMaxElement.innerHTML = `${tempMaxinF}°F`;
  tempMinElement.innerHTML = `${tempMininF}°F`;
}

function displayInCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-value-today");
  let feelsLikeElement = document.querySelector("#feels-like")
  let tempMaxElement = document.querySelector("#temp-max");
  let tempMinElement = document.querySelector("#temp-min");
  celsiusButton.classList.add("active");
  fahrenheitButton.classList.remove("active");
  temperatureElement.innerHTML = celsiusTemperature;
  feelsLikeElement.innerHTML = `Feels like ${feelsLikeTemperature}°C`
  tempMaxElement.innerHTML = `${maxTemp}°C`;
  tempMinElement.innerHTML = `${minTemp}°C`;
}

function handleFindMe(event) {
navigator.geolocation.getCurrentPosition(retrievePosition)
}
// Feature 1
let dateElement = document.querySelector("#time-now");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);


// Feature 2
let search = document.querySelector("#search-form");
search.addEventListener("submit", handleSearch);

// Feature 3
let celsiusButton = document.querySelector("#celsius-symbol");
celsiusButton.addEventListener("click", displayInCelsius)

let fahrenheitButton = document.querySelector("#fahrenheit-symbol");
fahrenheitButton.addEventListener("click", displayInFahrenheit)

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", handleFindMe)