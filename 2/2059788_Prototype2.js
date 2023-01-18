fetch('https://localhost/Prototype/my-api.php')
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
      "Temp range: " + response.weather_min + "° C" + " - " + response.weather_max + "°C";
    document.getElementById("pressure").innerHTML=
      "Pressure:"+" "+response.weather_pressure+" hPa";
    document.getElementById("icon").src =
      "https://openweathermap.org/img/wn/"+ response.weather_icon +".png";
  })
  .catch((err) => {
    console.log(err);
});
