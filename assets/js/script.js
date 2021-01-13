// Global variable that will take then input of city and converte it to 

let openWeatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=scarborough&appid=32a27c42260b02de3ba5e1466def4861"


var getUVNumber =  function (lonNum, latNum) {

    let openWeatherApiUVUrl =  "https://api.openweathermap.org/data/2.5/onecall?lat=" + lonNum + "&lon=" + latNum + "&appid=32a27c42260b02de3ba5e1466def4861"
    fetch(openWeatherApiUVUrl).then(function(response) {
        response.json().then(function(jsonData) {
            console.log(jsonData);
            console.log(jsonData.current.uvi)
        }) 
    })

};

fetch(openWeatherApiUrl).then(function(response) {
    response.json().then(function(jsonData) {
        console.log(jsonData.name); // City Name
        // console.log("Date") use moment.js for now
        console.log(jsonData.weather[0].icon); // Icon 
        let kelvinTemp = jsonData.main.temp
        let fahrenheitTemp = ( (kelvinTemp - 273.15) * (9/5) + 32 ); // Converted to fahrenheit temperature
        console.log("Temperature: " + fahrenheitTemp.toFixed(1) + "°F"); // Fahrenheit temperature
        //console.log(jsonData.main.humidity + "%");
        let metersPerSecSpeed = jsonData.wind.speed
        let mphWindSpeed = Math.round(metersPerSecSpeed * 2.237) + " MPH"; // Convert meters per second to miles per hour
        console.log(mphWindSpeed);

        // Get lon and lat for the uv
        let lonNum = jsonData.coord.lon;
        let latNum = jsonData.coord.lat;
        // Function call
        getUVNumber(lonNum, latNum);
    


        //console.log("lon " + lonNum + "\nlat " + latNum)

        // Get lat, lon from daily and store to be used on UV index

       // https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,daily&appid={API key}
     // let openWeatherApiUVUrl =  "https://api.openweathermap.org/data/2.5/onecall?lat=" + lonNum + "&lon=" + latNum + "&appid=32a27c42260b02de3ba5e1466def4861"
       // let openWeatherApiUVUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lonNum + "&lon=" + latNum + "&appid=32a27c42260b02de3ba5e1466def4861"
       // console.log(openWeatherApiUVUrl);

        //http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}



        //(0K − 273.15) × 9/5 + 32 
        //console.log(jsonData.main.temp);
        
        //http://openweathermap.org/img/wn/04d@2x.png

    });
    //console.log(response);
});

