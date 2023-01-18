<?php
$mysqli = new mysqli("localhost","root","","db_2059788");
$sql = "SELECT *
FROM weather
WHERE city = 'wolverhampton'
AND weather_when >= DATE_SUB(NOW(), INTERVAL 10 SECOND)
ORDER BY weather_when DESC limit 1";
$result = $mysqli -> query($sql); 
// If 0 record found
if ($result->num_rows == 0) {
$url = ('https://api.openweathermap.org/data/2.5/weather?q=wolverhampton&appid=bf7bc6593e607dd995818d88c3b7a8c3&units=metric');
// Get data from openweathermap and store in JSON object
$data = file_get_contents($url);
$json = json_decode($data, true);
// Fetch required fields
$weather_description = $json['weather'][0]['description'];
$weather_temperature = $json['main']['temp'];
$weather_wind = $json['wind']['speed'];
date_default_timezone_set('Asia/KATHMANDU');
$weather_when = date("Y-m-d H:i:s"); // now
$city = $json['name'];
$weather_humidity = $json['main']['humidity'];
$weather_pressure = $json['main']['pressure'];
$weather_max = $json['main']['temp_max'];
$weather_min = $json['main']['temp_min'];
$weather_icon = $json['weather'][0]['icon'];



// Build INSERT SQL statement
$sql = "INSERT INTO weather (weather_description, weather_temperature, weather_wind,weather_when,city, weather_humidity, weather_pressure, weather_max, weather_min,weather_icon)
VALUES('{$weather_description}', {$weather_temperature}, {$weather_wind},'{$weather_when}','{$city}', {$weather_humidity}, {$weather_pressure}, {$weather_max}, {$weather_min},'{$weather_icon}');";
// Run SQL statement and report errors
if (!$mysqli -> query($sql)) {
echo("<h4>SQL error description: " . $mysqli -> error . "</h4>");

}
}
$sql = "SELECT *
FROM weather
ORDER BY weather_when DESC limit 1";
$result = $mysqli -> query($sql);
// Get data, convert to JSON and print
$row = $result -> fetch_assoc();
print json_encode($row);
// Free result set and close connection
$result -> free_result();
$mysqli -> close();
?>
