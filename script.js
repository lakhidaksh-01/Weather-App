
document.querySelector('input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        search();
    }
});

function search() {
    let user_input;
    if (document.querySelector('input').value === "") {
        user_input = "new york";
    } else {
        user_input = document.querySelector('input').value;
    }

    const api_key = '2690b28d6b241854247d17c3662915e5';
    const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${user_input}&appid=${api_key}`;

    async function checkWeather() {
        try {
            const response = await fetch(api_url);
            const data = await response.json();

            if (data.cod !== 200) {
                alert("City not found. Please enter a valid city name.");
                return;
            }
            console.log(data);

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".status").innerHTML = data.weather[0].main;                    
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

            let weatherIcon = document.querySelector(".weather-icon");

            if (data.weather[0].main === "Clouds") {
                weatherIcon.src = "images/clouds.png";
            } else if (data.weather[0].main === "Clear") {
                weatherIcon.src = "images/clear.png";
            } else if (data.weather[0].main === "Rain") {
                weatherIcon.src = "images/rain.png";
            } else if (data.weather[0].main === "Drizzle") {
                weatherIcon.src = "images/drizzle.png";
            } else if (data.weather[0].main === "Mist") {
                weatherIcon.src = "images/mist.png";
            } else if (data.weather[0].main === "Snow") {
                weatherIcon.src = "images/snow.png";
            }
        } catch (error) {
            alert("An error occurred while fetching weather data. Please try again later.");
        }
    }

    checkWeather();
}

window.onload = function () {
    search();
};