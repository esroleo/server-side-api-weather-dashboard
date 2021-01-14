// Global variable that will take then input of city and converte it to lowercase and pass it as the query to OpenWeather API.
let openWeatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=scarborough&appid=32a27c42260b02de3ba5e1466def4861";


var getDate = function(unixTime) {

    console.log("today is in unix time: " + unixTime);


    let unix_timestamp = unixTime;
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var year = date.getFullYear();
    var monthOfYear = date.getMonth() + 1;
    var dayOfMonth = date.getDate();
    var fullDay = "(" + (date.getMonth() + 1) + "/" + date.getDate() + "/"  + date.getFullYear() + ")";
    //var hours = date.getHours();
    // Minutes part from the timestamp
   // var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    //var seconds = "0" + date.getSeconds();
    
    // Will display time in 10:30:23 format
 //   var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
 
    
    console.log("unix day format is " + dayOfMonth);
    console.log("unix month format is " + monthOfYear);
    console.log("unix year format is " + year);
    console.log("Full day of unix format is: " + fullDay);
 


  //  const birthday = new Date('August 19, 1975 23:15:30');
      //  const date1 = birthday.getDate();

     ///   console.log(date1);
        // expected output: 19


    
        //const birthday = new Date('August 19, 1975 23:15:30');
        //const date1 = birthday.getDate();
        


}


// expected output: 19


var getUVNumber =  function (lonNum, latNum) {

    // This section is only taking the uvi of the new openweather API.
    // We could use all of it on the new API, but we still need the longitute and latitude, hence will leave as is.

    let openWeatherApiUVUrl =  "https://api.openweathermap.org/data/2.5/onecall?lat=" + lonNum + "&lon=" + latNum + "&appid=32a27c42260b02de3ba5e1466def4861"
    fetch(openWeatherApiUVUrl).then(function(response) {
        response.json().then(function(jsonData) {
          //  console.log(jsonData);
           // console.log(jsonData.current.uvi)
        }) 
    })

};

var getFiveDayForcast =  function (lonNum, latNum) {

    // This section is only taking the uvi of the new openweather API.
    // We could use all of it on the new API, but we still need the longitute and latitude, hence will leave as is.

    //let openWeatherApiFiveDayUrl ="https://api.openweathermap.org/data/2.5/forecast?lat=" + lonNum + "&lon=" + latNum + "&appid=32a27c42260b02de3ba5e1466def4861";
    let openWeatherApiFiveDayUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lonNum + "&lon=" + latNum + "&exclude=current,minutely,hourly,alerts&appid=32a27c42260b02de3ba5e1466def4861"

    fetch(openWeatherApiFiveDayUrl).then(function(response) {
        response.json().then(function(jsonData) {

            console.log("5 day forcast information\n")
            console.log(openWeatherApiFiveDayUrl);
           //console.log(jsonData);
           // for each output check the dt_text and get the daily for one day only.
          
           // Check each one




           for (i=1; i< jsonData.daily.length; i++) {

            let unixTime = jsonData.daily[i].dt;
            console.log("Correct 5 day forcast" + unixTime)

            let unix_timestamp = unixTime;
            // Create a new JavaScript Date object based on the timestamp
            // multiplied by 1000 so that the argument is in milliseconds, not seconds.
            var date = new Date(unix_timestamp * 1000);
            // Hours part from the timestamp
            var year = date.getFullYear();
            var monthOfYear = date.getMonth() + 1;
            var dayOfMonth = date.getDate();
            var fullDay = "(" + (date.getMonth() + 1) + "/" + date.getDate() + "/"  + date.getFullYear() + ")";
 
            console.log(fullDay)


       

        }

        }) ;
    })

};





var getWeatherData = function() {

    fetch(openWeatherApiUrl).then(function(response) {
        response.json().then(function(jsonData) {
            console.log(jsonData.name); // City Name
            // console.log("Date") use moment.js for now
            getDate(jsonData.dt);
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
            // Function call to get the uv information.
            // Passed the lonNum and latNum parameters as arguments to bne used. 
            getUVNumber(lonNum, latNum);
            getFiveDayForcast(lonNum, latNum)
        
      
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


};




getWeatherData();
