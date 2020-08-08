$(function () {

    //declaration of variables
    const listofCities = $(".listOfCities");
    const mainCity = $("h3.searchedCity");
    const tempSection = $(".temp");
    const humiditySection = $(".humidity");
    const windSpeedSection = $(".windSpeed");
    const uvIndexSection = $(".uvIndex");
    // const fiveDayForecast = $(".fiveDayForecast");
    // const fiveDayIcon = $(".fiveDayIcon")

    let weatherInfo = [];
    let weatherInfoObject = {};
    let namesCity=[];

    let cityName = "";
    let icon = "";
    let iconDescription = "";
    let temp = "";
    let humidity = "";
    let windSpeed = "";
    let uv = "";

    let uvColor = "";
    let dailyForecastIcon = "";
    let icon5Day = "";
    let todaysDate = moment().format("L");

    //Populates list of 5 most recent cities in local storage on screen
    getCitiesLocalStorage();
    getLocalStorage();

    //when screen is refreshed, show weather info from last search
    repopulateInfoToScreen();
    

    // //Populates 5 day weather forecast on screen
    // dailyWeather();

    // function dailyWeather() {
    //     //gets daily weather
    //     for (let i = 0; i < 6; i++) {
    //       fiveDayForecast.value(i+1).append($("<img class='fiveDayIcon card'>"));
    //       fiveDayIcon.attr("src", `http://openweathermap.org/img/wn/${dailyForecastIcon}.png`).attr("alt", iconDescription);  
    //       console.log(i);
    //   }

//   }


    //When the search button is clicked, call from APIs 
    $(".searchBtn").on("click", function (event) {
        event.preventDefault();
        
            ajaxCalls();
            

    });

    function ajaxCalls() {
        let blank = "";
        cityName = $("#inputCity").val();

        // clears text in input spot when search button is clicked
        $("#inputCity").val(blank);

        let currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=25d3fdfe342a19e8d55725db62d19795";

        addCitiesLS(cityName);

        $.ajax({
            url: currentWeatherURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);
                let lat = response.coord.lat;
                let lon = response.coord.lon;

                //gets temperatur
                temp = response.main.temp; 
                temp = Math.floor((temp-273.15)*9/5 + 32);
                temp = `${temp}`;
                tempSection.html(temp);

                //gets humidity
                humidity = response.main.humidity;
                humidity = `${humidity} %`;
                humiditySection.html(humidity);

;
                //gets Wind Speed
                windSpeed = response.wind.speed;
                windSpeed = `${windSpeed} mph`;
                windSpeedSection.html(windSpeed);

                //gets weather icon
                icon = response.weather[0].icon;
                $(".iconWeather").attr("src", `http://openweathermap.org/img/wn/${icon}.png`).attr("alt", response.weather[0].description);
                

                // for the UV API
                let uvURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&
                exclude=&appid=25d3fdfe342a19e8d55725db62d19795`;
                // `https://api.openweathermap.org/data/2.5/uvi?appid=25d3fdfe342a19e8d55725db62d19795&lat=${lat}&lon=${lon}`;
                $.ajax({
                    url: uvURL,
                    method: "GET"
                })
                    .then(function (response) {
                        console.log(response);

                        //gets UV index and color
                        uv = response.current.uvi;
                        uvColor = uviColors(uv);
                        uvIndexSection.html(uv);
                        uvIndexSection.attr("style", `background-color: ${uvColor};`);

                        dailyForecastIcon = response.daily[i].weather[0].icon; 
                        iconDescription = response.daily[i].weather[i].description;
                        icon5Day = iconURL.src("http://openweathermap.org/img/wn/${dailyForecastIcon}.png");
                    });

                    addWeatherInfoLS();                     
                    
            });
    }

    function addWeatherInfoLS() {
        weatherInfoObject = {
            city: cityName,
            iconWeather: icon,
            temperature: temp,
            humidityWeather: humidity,
            windSpeedWeather: windSpeed,
            uvi: uv 
        }
        // console.log(weatherInfoObject);
        weatherInfo.push(weatherInfoObject);
        // console.log(weatherInfo);
        localStorage.setItem("weatherInfo", JSON.stringify(weatherInfo));
    }

    function getLocalStorage() {
       
        weatherInfo = JSON.parse(localStorage.getItem("weatherInfo"));
        console.log(weatherInfo);

        if (weatherInfo === null) { 
            weatherInfo = [];
        }
    }



    //This button clears local storage
    $(".clearBtn").on("click", function () {
        localStorage.clear();
    });

    let townNum=0;
    // add cities to page
    function addCitiesLS(citySearch) {
    
        
        // adding to local storage, taking key to get items
        namesCity = localStorage.getItem("cityNames");
        // taking string from local storage and putting back in original form
        namesCity = JSON.parse(namesCity) || [];
        namesCity.push(citySearch);
        // setting item from array to local storage
        localStorage.setItem("cityNames", JSON.stringify(namesCity));

        //adds list item to unordered list and adds city names to screen
        let listItem = $("<li class='card cityNameinList'>");
        //adds data-info attribute
        listItem.attr('data-info', townNum);
        console.log(townNum);
        townNum++;

        listofCities.append(listItem);
        listItem.html(cityName);
        //adds most recent city name and today's date to the dashboard
        mainCity.html(`${cityName} &nbsp (${todaysDate})`);

    }

    // when city in list clicked, populate most recent search on screen
    $(".cityNameinList").on("click", function() {
        console.log("Hi");
    })

    //sets background color for uv
    function uviColors(uv) {
        if (uv <3) {
            return "green";
        }
        else if (uv >=3 && uv <6) {
            return "yellow";
        }
        else if (uv >=6 && uv < 8) {
            return "orange";
        }
        else if (uv >=8 && uv <=10) {
            return "red"
        }
        else return "purple";
    }

    //Gets 5 most recent searches from local storage and shows on screen
    function getCitiesLocalStorage() {
        infoArray = JSON.parse(localStorage.getItem("cityNames"));
        if (infoArray !== null) {

            for (let i = infoArray.length - 5; i < infoArray.length; i++) {

                let LSlistItem = $("<li class='card'>")
                listofCities.append(LSlistItem);
                LSlistItem.html(infoArray[i]);

            }

        }
    }

    function repopulateInfoToScreen() {

        if (weatherInfo[0]) {
            // cityName = namesCity[namesCity.length-1];
            // ajaxCalls();

        mainCity.html(weatherInfo[weatherInfo.length-1].city);
        tempSection.html(weatherInfo[weatherInfo.length-1].temperature);
        humiditySection.html(weatherInfo[weatherInfo.length-1].humidityWeather);
        windSpeedSection.html(weatherInfo[weatherInfo.length-1].windSpeedWeather);
        // $(".iconWeather").attr("src", `http://openweathermap.org/img/wn/${icon}.png`).attr("alt", iconDescription);
        uvIndexSection.html(weatherInfo[weatherInfo.length-1].uvi);
        uvColor = uviColors(uv);
        uvIndexSection.html(uv);
        uvIndexSection.attr("style", `background-color: ${uvColor};`);
        // ajaxUV();
        }
        else {
            mainCity.html("Please search for a city.")
        }
        
    }

    function ajaxUV() {
        $.ajax({
            url: uvURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);

                //gets UV index and color
                uv = response.current.uvi;
                uvColor = uviColors(uv);
                uvIndexSection.html(uv);
                uvIndexSection.attr("style", `background-color: ${uvColor};`);

                // dailyForecastIcon = response.daily[i].weather[0].icon; 
                // iconDescription = response.daily[i].weather[i].description;
                // icon5Day = iconURL.src("http://openweathermap.org/img/wn/${dailyForecastIcon}.png");
            });
    }

})