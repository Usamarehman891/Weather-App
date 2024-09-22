const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const locationNotFound = document.querySelector('.location');
const weather_body = document.querySelector('.weather-body');



async function checkWeather(city){
    const api_key= '3415e27e8bdefbc2c6bffbd025530603';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    fetch(`${url}`).then(response => response.json()).then(data => {
        const weather_data = data;

        if(weather_data.cod === `404`){
            locationNotFound.style.display = "flex";
            weather_body.style.display = "none";
            console.log("error");
            return;
        }

        locationNotFound.style.display = "none";
        weather_body.style.display = "flex";

        temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)} °C`;
        humidity.innerHTML = `${weather_data.main.humidity} %`;
        description.innerHTML =`${weather_data.weather[0].description}`;
        wind_speed.innerHTML = `${weather_data.wind.speed}km/h`;
    

        switch(weather_data.weather[0].main){     
            case 'Clouds' : weather_img.src = "/Assets/cloud .png";
            break;
            case 'Mist' : weather_img.src = "/Assets/mist.png";
            break;
            case 'Rain' : weather_img.src = "/Assets/rain.png";
            break;
            case 'Snow' : weather_img.src = "/Assets/snow.png";
            break;
            case 'Clear' : weather_img.src = "/Assets/clear.png";
        }
        

        console.log(weather_data);


    }).catch(err => {
        console.log('error in api: ', err);
        
    });




}
inputBox.addEventListener('keypress', e => {
    if (e.key === "Enter") {
        checkWeather(inputBox.value);   
    }
})
searchBtn.addEventListener('click' ,()=> {
    checkWeather(inputBox.value);
});