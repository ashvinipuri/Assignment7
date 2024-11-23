'use strict'

const API_KEY = "ab6cadfa2c566b17189d2a4ac5af4f12";
const URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".input-city");
const searchBtn = document.querySelector(".btn"); 
const weatherIcon = document.querySelector(".weather-icon");
const errorElement = document.querySelector(".error");

async function checkWeather(city) {
    try {
        const response = await fetch(URL + city + `&appid=${API_KEY}`);
        
        if (response.status === 404) {
            errorElement.style.display = "block";
            return;
        }
        
        const data = await response.json();
        errorElement.style.display = "none"; 

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp-heading").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".speed").innerHTML = "Wind Speed : " + data.wind.speed + " km/h";
        document.querySelector(".humidity").innerHTML = "Humidity : " + data.main.humidity + "%";
        document.querySelector(".fahrenheit").innerHTML = "Fahrenheit : " + Math.round((data.main.temp * 9 / 5) + 32) + "°F";
        document.querySelector(".weather-info").innerHTML = data.weather[0].main; 

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "img/cloud.jpg"; 
        }else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "img/clear.jpg";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "img/rain1.jpg";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "img/drizzle.jpg";
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "img/mist.jpg";
        }
    } catch (error) {
        console.error("Failed to fetch weather data:", error);
        errorElement.style.display = "block";
        errorElement.textContent = "An error occurred. Please try again.";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value.trim());
});


$(function () {
    const availableTags = [
        "mumbai", "paris", "delhi", "pune", "hyderabad", "kalyan",
        "agra", "chennai", "kolkata", "surat", "new york", "london",
        "tokyo", "bangkok", "dubai", "rome", "berlin", "moscow",
        "ulhasnagar", "manali", "miami", "lucknow"
    ];
    $(".input-city").autocomplete({
        source: availableTags
    });
});
