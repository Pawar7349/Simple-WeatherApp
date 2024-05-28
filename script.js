const WEATHER_API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your actual API key

let weather = {
    "apikey": WEATHER_API_KEY,
    fetchWeather: function (city) {
        console.log("Fetching weather for", city); // Debug log
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apikey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("City not found");
                }
                return response.json();
            })
            .then(data => {
                console.log("Weather data:", data); // Debug log
                this.displayWeather(data);
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                alert(error.message); // Display error message
            });
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
    },
    search: function () {
        const city = document.querySelector(".search-bar").value;
        if (city) {
            this.fetchWeather(city);
        } else {
            alert("Please enter a city name");
        }
    }
};

document.querySelector(".search-btn").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        weather.search();
    }
});

weather.fetchWeather("Pune");
