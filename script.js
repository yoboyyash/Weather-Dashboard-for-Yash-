// My API Key
let API_Key = "837dfbbf7513b1b554e847e3cf0dd8d0";

// API URL to get basic info
let APIURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

// Variables need in function and for eventlistener
let cityInput = document.querySelector(".city-input");
let searchButton = document.querySelector(".search-btn");


// Async function to call on data from from API and log to console


async function checkWeather(city) {
    let response = await fetch(APIURL + city + `&appid=${API_Key}`); //This fetches data from api from using API URL and the city input and my api key
    let data = await response.json(); //This formats the data to json

    console.log(data);

   
    // The following inserts coordinates of the city searched from the data fetched from above api 
    let APIURL2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${API_Key}`;

    // The following async function makes more data that I need from the above api url via city coordinates
    async function getWeatherDetails () {
        let response = await fetch(APIURL2);
        let data2 = await response.json(); 
        let forecastDateFilter = [];

        
        
        console.log(data2); // This (data2) weather forecast data which has a list for future days

        
        
        // Reducing list dates by filtering the forecasts to get only one forecast per day
       
        let fiveDaysForecast = data2.list.filter(fforecast => {
            let fforecastDate = new Date(fforecast.dt_txt).getDate();
            if(!forecastDateFilter.includes(fforecastDate)) {
                return forecastDateFilter.push(fforecastDate)
            }
        });

        
       
       
        document.querySelector("#date").innerHTML = data2.list[0].dt_txt.split(" ")[0];
        
        

        console.log(fiveDaysForecast) // This (data3) gives me days to create my five day forecast of the dashboard

        document.querySelector("#temp1").innerHTML = "Temperature: " + Math.round(((fiveDaysForecast[1].main.temp - 273.15).toFixed(2)*(9/5)+32)) + " °F";
        document.querySelector("#wind1").innerHTML = "Wind: " + fiveDaysForecast[1].wind.speed + " Mhp";
        document.querySelector("#humidity1").innerHTML = fiveDaysForecast[1].main.humidity + "%";
       
        document.querySelector("#temp2").innerHTML = "Temperature: " + Math.round(((fiveDaysForecast[2].main.temp - 273.15).toFixed(2)*(9/5)+32)) + " °F";
        document.querySelector("#wind2").innerHTML = "Wind: " + fiveDaysForecast[2].wind.speed + " Mhp";
        document.querySelector("#humidity2").innerHTML = fiveDaysForecast[2].main.humidity + "%";

        document.querySelector("#temp3").innerHTML = "Temperature: " + Math.round(((fiveDaysForecast[3].main.temp - 273.15).toFixed(2)*(9/5)+32)) + " °F";
        document.querySelector("#wind3").innerHTML = "Wind: " + fiveDaysForecast[3].wind.speed + " Mhp";
        document.querySelector("#humidity3").innerHTML = fiveDaysForecast[3].main.humidity + "%";

        document.querySelector("#temp4").innerHTML = "Temperature: " + Math.round(((fiveDaysForecast[4].main.temp - 273.15).toFixed(2)*(9/5)+32)) + " °F";
        document.querySelector("#wind4").innerHTML = "Wind: " + fiveDaysForecast[4].wind.speed + " Mhp";
        document.querySelector("#humidity4").innerHTML = fiveDaysForecast[4].main.humidity + "%";

        document.querySelector("#temp5").innerHTML = "Temperature: " + Math.round(((fiveDaysForecast[5].main.temp - 273.15).toFixed(2)*(9/5)+32)) + " °F";
        document.querySelector("#wind5").innerHTML = "Wind: " + fiveDaysForecast[5].wind.speed + " Mhp";
        document.querySelector("#humidity5").innerHTML = fiveDaysForecast[5].main.humidity + "%";
                 

    }

    getWeatherDetails(); // Starts function getWeatherDetails but only after the above checkWeather starts via eventlistener

    // Inserts data into html from first api data pull (this only makes the current forecast)
    document.querySelector("#city-name").innerHTML = "City Name: " + data.name;
    document.querySelector("#temp").innerHTML = "Temperature: " + data.main.temp + " °F";
    document.querySelector("#wind").innerHTML = "Wind: " + data.wind.speed + " Mhp";
    document.querySelector("#humidity").innerHTML = data.main.humidity + "%";
    
    
    
    
    // loads icon image from url that is made from initial data which shows which one to use depending on weather conditions
    let weatherIcon = data.weather[0].icon;
    let loadIcon = document.createElement("img");
    loadIcon.setAttribute("src", "https://openweathermap.org/img/w/" + weatherIcon + ".png");

    console.log(loadIcon);
    
    // Inserts loaded icon into html to show condition image
    let h1 = document.querySelector("#weather-icon");
    h1.appendChild(loadIcon);
    


    //Making five day forecast below


}


// Starts function(s) after a city is searched
searchButton.addEventListener("click", ()=>{
    checkWeather(cityInput.value);
    
})






