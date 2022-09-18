const iconElement = document.querySelector(".weather-icon");
const locationIcon = document.querySelector(".location-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notfication");
const flagElement = document.querySelector(".country-flag");

let input = document.getElementById("search");
let city = "";
let countryFlagUrl = "";
input.addEventListener("keyup",function(event){
    if(event.keyCode === 13){
        event.preventDefault();
        city=input.value;
        getSearchWeather(city);
        console.log(city);
    }
})

const weather = {}

weather.temperature={
    unit:"celcius"
}

const KELVIN = 273;

const apiKey = "25ef72df8916f3166fca93dc3756b4f1";

function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message}</p>`;
}

function getSearchWeather(city){
    let api = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey;
    fetch(api)
    .then(function(response){
        let data = response.json();
        console.log(data);
        return data;
    })
    .then(function(data){
        weather.temperature.value=Math.floor(data.main.temp - KELVIN)
        weather.description=data.weather[0].description;
        weather.iconId=data.weather[0].icon;
        weather.city=data.name;
        weather.country=data.sys.country;
        console.log(weather.country);
        getCountryFlag(data.sys.country);
    })
    .then(function(){
        displayWeather()
    })
}

function getCountryFlag(countryCode){
    let url = "https://restcountries.com/v3.1/alpha/"+countryCode;
    fetch(url)
    .then(function(response){
        let cData = response.json();
        console.log(cData);
        return cData;
    })
    .then(function(cData){
        countryFlagUrl = cData[0].flags.png;
        console.log(countryFlagUrl);
    })
    .then(function(){
        displayWeather()
    })

}

function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML=`${weather.temperature.value} *<span></span>`;
    descElement.innerHTML=weather.description;
    locationElement.innerHTML=`${weather.city},${weather.country}`;
    console.log(weather.countryFlag);
    flagElement.innerHTML = `<img src="${countryFlagUrl}" alt="" >`;
}