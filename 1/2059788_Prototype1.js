apiKey="bf7bc6593e607dd995818d88c3b7a8c3"
fetch("https://api.openweathermap.org/data/2.5/weather?q=" +         
"wolverhampton" +
"&units=metric&appid=" + this.apiKey)
.then(response=>response.json())
.then(response=>{
    console.log(response);
//----------------------------------------------------------------------------------------------
    document.getElementById("description").innerHTML =
      response.weather[0].description;
    document.getElementById("humidity").innerHTML =
      "Humidity: " + response.main.humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind: " + response.wind.speed + " km/hr";
    document.getElementById("temp").innerHTML = 
      response.main.temp + "°C";
    document.getElementById("city").innerHTML =
      response.name + ", " + response.sys.country;
    document.getElementById("temp-MaxMin").innerHTML =
      "Temp range: " + response.main.temp_min + "° C" + " - " + response.main.temp_max + "°C";
    document.getElementById("pressure").innerHTML=
      "Pressure:"+" "+response.main.pressure+" hPa";
    document.getElementById("icon").src =
      "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png";
  })
  .catch((err) => {
    console.log(err);
});
