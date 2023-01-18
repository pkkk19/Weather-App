if(localStorage.when != null
  && parseInt(localStorage.when) + 10000 > Date.now()) {
    let freshness = Math.round((Date.now() - localStorage.when)/1000) + " second(s)";
    document.getElementById("description").innerHTML = localStorage.myWeather;
    document.getElementById("humidity").innerHTML = "Humidity: " + localStorage.humidity;
    document.getElementById("wind").innerText = "Wind: " +  localStorage.wind;
    document.getElementById("temp").innerHTML = localStorage.myTemperature;
    document.getElementById("city").innerHTML = localStorage.myCity;
    document.getElementById("temp-MaxMin").innerHTML =  "Temp range: " + localStorage.minTemp_maxTemp
    document.getElementById("pressure").innerHTML= "Pressure:"+" "+localStorage.pressure; 
    document.getElementById("icon").src =
      "https://openweathermap.org/img/wn/"+ localStorage.image +".png";


// No local cache, access network
} else {
fetch('http://localhost/Prototype_3/my-api.php')
.then(function(response){
    return response.json()
})
.then(function(response){
    console.log(response);
//----------------------------------------------------------------------------------------------
    document.getElementById("description").innerHTML =
      response.weather_description;
    document.getElementById("humidity").innerHTML =
      "Humidity: " + response.weather_humidity + "%";
    document.getElementById("wind").innerText =
      "Wind: " + response.weather_wind + " km/hr";
    document.getElementById("temp").innerHTML = 
      response.weather_temperature + "°C";
    document.getElementById("city").innerHTML =
      response.city;
    document.getElementById("temp-MaxMin").innerHTML =
      "Temp range: " + response.weather_min + "°C" + " - " + response.weather_max + "°C";
    document.getElementById("pressure").innerHTML=
      "Pressure:"+" "+response.weather_pressure+" hPa";
    document.getElementById("icon").src =
      "https://openweathermap.org/img/wn/"+ response.weather_icon +".png";

      // Save new data to browser, with new timestamp
  localStorage.myWeather = 
    response.weather_description;
  localStorage.myTemperature = 
    response.weather_temperature + "°C";
  localStorage.myCity = 
    response.city;
  localStorage.minTemp_maxTemp = 
    response.weather_min + "°C" + "-" + response.weather_max + "°C";
  localStorage.humidity = 
    response.weather_humidity + "%";
  localStorage.pressure = 
    response.weather_pressure + " hPa";
  localStorage.image = 
    response.weather_icon
  localStorage.wind = 
    response.weather_wind + " Km/hr";
  localStorage.when = 
    Date.now(); // milliseconds since January 1 1970
  })
  .catch((err) => {
    console.log(err);
});
}