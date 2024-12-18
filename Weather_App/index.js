let search = document.querySelector('.form');
let City_Name = document.querySelector('.city');
let date_time = document.querySelector('.date_time');
let forecast = document.querySelector('.forecast');
let icon = document.querySelector('.icon');
let temperature = document.querySelector('.temperature');
let min = document.querySelector('.min');
let max = document.querySelector('.max');
let FeelsLike = document.querySelector('.FeelsLike');
let Humidity = document.querySelector('.Humidity');
let Wind = document.querySelector('.Wind');
let Pressure = document.querySelector('.Pressure');

let city = "rajkot";

const getCountryName = (code) => {
    return new Intl.DisplayNames([code], { type: "region" }).of(code);
}

const getDateTime = (dt) => {
    const curDate = new Date(dt * 1000);

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    }

    const formatter = new Intl.DateTimeFormat("en-us", options);
    return formatter.format(curDate);
}

const getWeatherData = async () => {
    
    const APIURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=0fa7f15a8203049fd15281149c18b22f`;

    try {
        const result = await fetch(APIURL);
        const data = await result.json();

        const { main, name, weather, wind, sys, dt } = data;

        City_Name.innerHTML = `${name},${getCountryName(sys.country)}`;
        date_time.innerHTML = getDateTime(dt);

        forecast.innerHTML = weather[0].main;
        icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;

        temperature.innerHTML = `${main.temp}&#176`;
        min.innerHTML = `Min : ${main.temp_min.toFixed()}&#176`;
        max.innerHTML = `Max : ${main.temp_max.toFixed()}&#176`;

        FeelsLike.innerHTML = `${main.feels_like.toFixed(2)}&#176`;
        Humidity.innerHTML = `${main.humidity}%`;
        Wind.innerHTML = `${wind.speed} m/s`;
        Pressure.innerHTML = `${main.pressure} hPa`;

    } catch (error) {
        console.log(error);
    }
}

search.addEventListener('submit', (e) => {
    e.preventDefault();

    let CityName = document.querySelector('.search_field');

    city = CityName.value;

    getWeatherData();
});

document.body.addEventListener("load",getWeatherData());