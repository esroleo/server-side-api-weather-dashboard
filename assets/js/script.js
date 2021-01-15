// Get form element value
let seachEventHanglerEl = document.querySelector("#cityForm");
let searchByCityEl = document.querySelector("#cityName");
let citiesListContainerEl = document.querySelector("#cities-list");
let dailyForecastContainerEl = document.querySelector("#daily-forecast-container")
let globalTestVariable = "gloabl variable";


var populateSavedCities = function() {

       // Get array from local storage
       let citiesLocalStorage = JSON.parse(localStorage.getItem("savedCities"));

       // City exist or not. 0 = not, 1 = yes
       let cityExist = 0;
   
         
       if (citiesLocalStorage === null) {
           // It does note exist, therefore, no items to add to saved cities
           console.log("No items to add");
           
       } else { // we will popualte the saved cities


       $(".list-group-item").remove(); // Remove all list items from the document with jquery
           
        for (i=0; i< citiesLocalStorage.length;i++) {

            

            let cityNameEl = document.createElement("a")
            cityNameEl.setAttribute("href", "#")
            cityNameEl.setAttribute("id", citiesLocalStorage[i]);
            cityNameEl.classList = "list-group-item list-group-item-action list-group-item-primary";
            cityNameEl.textContent = citiesLocalStorage[i];
            citiesListContainerEl.appendChild(cityNameEl);
        
            }
        
           alert("All saved cities have been populated");
       };
   

};

var populateDailyForecast = function(fullDayDaily, iconWeather, tempImperial, humidity, mphWindSpeed, uvIndex) {

    let dailyDetails = document.createElement("h3");
    alert("populateDailyForecast full day is" + fullDayDaily)
    dailyDetails.textContent = fullDayDaily;


   
    dailyForecastContainerEl.appendChild(dailyDetails);

}



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
    var fullDayDaily = "(" + (date.getMonth() + 1) + "/" + date.getDate() + "/"  + date.getFullYear() + ")";
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
    console.log("Full day of unix format is: " + fullDayDaily);
 

  //  const birthday = new Date('August 19, 1975 23:15:30');
      //  const date1 = birthday.getDate();

     ///   console.log(date1);
        // expected output: 19


    
        //const birthday = new Date('August 19, 1975 23:15:30');
        //const date1 = birthday.getDate();
        globalTestVariable = fullDayDaily + "this is the full variable date";
    return fullDayDaily
        


}


// expected output: 19


var getUVNumber =  function (latNum, lonNum) {

    // This section is only taking the uvi of the new openweather API.
    // We could use all of it on the new API, but we still need the longitute and latitude, hence will leave as is.
    //"lon": -123.1193,
    //"lat": 49.2497
    //lat = 43.7001
    //lon = -79.4163
    //https://api.openweathermap.org/data/2.5/onecall?lat=43.7001&lon=-79.4163&appid=32a27c42260b02de3ba5e1466def4861
    

    let openWeatherApiUVUrl =  "https://api.openweathermap.org/data/2.5/onecall?lat=" + latNum + "&lon=" + lonNum + "&appid=32a27c42260b02de3ba5e1466def4861"
    //let openWeatherApiUVUrl =  "https://api.openweathermap.org/data/2.5/onecall?lat=-123.11&lon=49.24&appid=32a27c42260b02de3ba5e1466def4861"
    fetch(openWeatherApiUVUrl).then(function(response) {
        response.json().then(function(jsonData) {
          //  console.log(jsonData);
          let uvIndex = jsonData.current.uvi
           console.log(jsonData.current.uvi)
           return uvIndex
        });
    });

};

var getFiveDayForcast =  function (latNum, lonNum) {

    // This section is only taking the uvi of the new openweather API.
    // We could use all of it on the new API, but we still need the longitute and latitude, hence will leave as is.

    //let openWeatherApiFiveDayUrl ="https://api.openweathermap.org/data/2.5/forecast?lat=" + lonNum + "&lon=" + latNum + "&appid=32a27c42260b02de3ba5e1466def4861";
    let openWeatherApiFiveDayUrl =  "https://api.openweathermap.org/data/2.5/onecall?lat=" + lonNum + "&lon=" + latNum + "&appid=32a27c42260b02de3ba5e1466def4861&units=imperial"
    //let openWeatherApiFiveDayUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lonNum + "&lon=" + latNum + "&exclude=current,minutely,hourly,alerts&appid=32a27c42260b02de3ba5e1466def4861"

    


    //https://api.openweathermap.org/data/2.5/weather?q=toronto&appid=32a27c42260b02de3ba5e1466def4861
    //let openWeatherApiFiveDayUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lonNum + "&lon=" + latNum + "&appid=32a27c42260b02de3ba5e1466def4861"
   // let openWeatherApiFiveDayUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=-123.1193&lon=49.2497&exclude=current,minutely,hourly,alerts&appid=32a27c42260b02de3ba5e1466def4861"

 //   -123.1193
   // 49.2497



    fetch(openWeatherApiFiveDayUrl).then(function(response) {
        response.json().then(function(jsonData) {

            console.log("5 day forcast information\n")
            console.log(openWeatherApiFiveDayUrl);
           //console.log(jsonData);
           // for each output check the dt_text and get the daily for one day only.
          
           // Check each one




           //for (i=0; i< jsonData.daily.length; i++) {
            for (i=0; i <= 5; i++) {

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

            // Values to be displayed
            var fullDay = "(" + (date.getMonth() + 1) + "/" + date.getDate() + "/"  + date.getFullYear() + ")"; // Date
            var iconWeather = jsonData.daily[i].weather[0].icon // icon
            //let kelvinTemp = jsonData.daily[i].temp.day // temp Kelvin
            let fahrenheitTemp = jsonData.daily[i].temp.day // temp Kelvin
            //let fahrenheitTemp = ( (kelvinTemp - 273.15) * (9/5) + 32 ); // Converted to fahrenheit temperature
            //let fahrenheitTemp = ( kelvinTemp * (9/5) - 459 ); // Converted to fahrenheit temperature
            let humidity = jsonData.daily[i].humidity + "%"

            
             
            console.log(fullDay)
            console.log(iconWeather)
            //console.log("Temp: " + fahrenheitTemp.toFixed(1) + " °F"); // Fahrenheit temperature
            console.log("Temp: " + fahrenheitTemp + " °F")
            console.log("Humidity: " + humidity);




       

        }

        }) ;
    })

};





var getWeatherData = function(event) {




    event.preventDefault();


    // get value from input elementgit 
    var searchByCity = searchByCityEl.value.trim().toLowerCase();
    console.log("The selected by user is: " + searchByCity);

    // If field emtpy to not fetch any data
    if (searchByCity == "") {
        alert("Please do not leave city name blank");
        searchByCityEl.value = "";
        return 
    }


    // Global variable that will take then input of city and converte it to lowercase and pass it as the query to OpenWeather API.
    // Hardcoded let openWeatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + "scarborough" + "&appid=32a27c42260b02de3ba5e1466def4861";
    let openWeatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchByCity + "&appid=32a27c42260b02de3ba5e1466def4861&units=imperial";
    console.log(openWeatherApiUrl);
    

    /*

    .attr('type', 'text') // Text input type
    .attr('id', `input-${hourIndex}`) // Create a index of the input for track purposes
    .attr('hour-index', hourIndex); // To be used to change clors of the input task.
    
    

    var repoEl = document.createElement("a");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);
    */


    // Clear the element of input and save it to a variable that will display it on the saved cities
    // Saved cities have will go to local storage
    // Save it back as the it should be in as first letter capitalized.
    //citiesSearched.push( searchByCity.charAt(0).toUpperCase() + searchByCity.slice(1) ) ;
   // citiesSearched.push( searchByCity.charAt(0).toUpperCase() + searchByCity.slice(1) ) ;
  // console.log("array lenght is " + citiesSearched.length)


    // Get array from local storage
    let citiesLocalStorage = JSON.parse(localStorage.getItem("savedCities"));

    // City exist or not. 0 = not, 1 = yes
    let cityExist = 0;


    // Check if array is null and create new one again.
    if (citiesLocalStorage === null) {
        citiesSearched =  new Array();
        console.log("new array craeted");
        
    } else { // Assign the localStorage values to new (array), not a reference
        citiesSearched = citiesLocalStorage;
        console.log("Values from local Storage are: " + citiesSearched);
    };

    /*
    // Move this block to the first reponse of the API as sucessful to add to local storage only then.
    for (i=0; i < citiesSearched.length; i++) {
        if (searchByCity === citiesSearched[i].toLowerCase()) {
            console.log("city " + citiesSearched[i] + "already exist in array")
            cityExist =1
            break;
        } 
    }

    //alert(citiesSearched + cityExist)

    if (cityExist === 0) {
        alert("city has been pushed" + ( searchByCity.charAt(0).toUpperCase() + searchByCity.slice(1) ));
        citiesSearched.push( searchByCity.charAt(0).toUpperCase() + searchByCity.slice(1) ) ;
        localStorage.setItem("savedCities", JSON.stringify(citiesSearched));
    }
    */



    fetch(openWeatherApiUrl).then(function(response) {

        if(response.ok) { // Check if ther response is ok, meaning a HTTP 200 response.

            
            
                response.json().then(function(jsonData) {
                console.log("json city returned is: " + jsonData.name); // City Name
                // console.log("Date") use moment.js for now
                getDate(jsonData.dt);
               // alert("full day is" + fullDayDaily);
                jsonData.weather[0].icon;
                console.log(jsonData.weather[0].icon); // Icon 
                let tempImperial = jsonData.main.temp
               // let fahrenheitTemp = ( (kelvinTemp - 273.15) * (9/5) + 32 ); // Converted to fahrenheit temperature
              //  console.log("Temperature: " + fahrenheitTemp.toFixed(1) + " °F"); // Fahrenheit temperature
               console.log("Temperature:" + tempImperial + " °F");
                let humidity = jsonData.main.humidity + "%"
                console.log(humidity);
                let metersPerSecSpeed = jsonData.wind.speed
                let mphWindSpeed = Math.round(metersPerSecSpeed * 2.237) + " MPH"; // Convert meters per second to miles per hour
                console.log(mphWindSpeed);
        
                // Get lon and lat for the uv
                let latNum = jsonData.coord.lat;
                let lonNum = jsonData.coord.lon;
                
                console.log("latitude" + latNum);
                console.log("longitud" + lonNum);
           
                // Function call to get the uv information.
                // Passed the lonNum and latNum parameters as arguments to bne used. 
                let uvIndex = getUVNumber(latNum, lonNum);
               

                getFiveDayForcast(latNum, lonNum);

                // Add the sucessful api call city to the local storage.
                for (i=0; i < citiesSearched.length; i++) {
                    if (searchByCity === citiesSearched[i].toLowerCase()) {
                        console.log("city " + citiesSearched[i] + "already exist in array")
                        cityExist =1
                        break;
                    } 
                }

                // if the city is new it will add it because the lenght of the array was 0, then add to local storage
                // if it is the second city and is not new then add to local storage
                if (cityExist === 0) {
                    alert("city has been pushed" + ( searchByCity.charAt(0).toUpperCase() + searchByCity.slice(1) ));
                   // citiesLocalStorage=[];
                    //citiesSearched = []; 
                      // localStorage.setItem("savedCities", JSON.stringify(citiesLocalStorage));
                    citiesSearched.push( searchByCity.charAt(0).toUpperCase() + searchByCity.slice(1) ) ;
                    localStorage.setItem("savedCities", JSON.stringify(citiesSearched));
                }

                // After all items have been pushed to array populate the cities in html

               // citiesSearched = []; 

                populateSavedCities(); // Second after a push has been done.

                

            
        
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

            alert(globalTestVariable);

          
        
        } else { // Any other response like 400 500 will display the error.
            window.alert("Error: " + response.statusText + "\nPlease re-enter a valid city");
            // Clear the input parameter from the user
            searchByCityEl.value = "";
            return;
        }
    }).catch(function(error) { // fetch api way of handling network errors.
        // Notice this `.catch()` getting chained onto the end of the `.then()` method
        alert("Unable to connect to OpenWeather");
        return;
      });




};




seachEventHanglerEl.addEventListener("submit",getWeatherData);


//userFormEl.addEventListener("submit", formSubmitHandler);

//getWeatherData();

// Make any 

$(document).on('click','a', function(event) {

    alert("element list clicked")



});


// Load saved cities to the saved cities section.
populateSavedCities(); // First call to load the saved cities html.




