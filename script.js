$(function () {

    const listofCities = $(".listOfCities");
    const mainCity = $("h3.searchedCity");
    let cityName = "";
    let temp = "";
    let todaysDate = moment().format("L");

    //Populates list of 5 most recent cities in local storage on screen
    getCitiesLocalStorage();




    //When the search button is clicked, call from APIs 
    $(".searchBtn").on("click", function (event) {
        event.preventDefault();
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
                temp = response.main.temp 
                temp = Math.floor((temp-273.15)*9/5 + 32);

                //gets humidity

                //gets Wind Speed

                //gets weather icon
                

                // for the UV API
                let uvURL = `https://api.openweathermap.org/data/2.5/uvi?appid=25d3fdfe342a19e8d55725db62d19795&lat=${lat}&lon=${lon}`;
                $.ajax({
                    url: uvURL,
                    method: "GET"
                })
                    .then(function (response) {
                        console.log(response);
                    })
            })

    });

    //This button clears local storage
    $(".clearBtn").on("click", function () {
        localStorage.clear();
    });

    // add cities to page
    function addCitiesLS(citySearch) {
    
        // adding to local storage, taking key to get items
        let namesCity = localStorage.getItem("cityNames");
        // taking string from local storage and putting back in original form
        namesCity = JSON.parse(namesCity) || [];
        namesCity.push(citySearch);
        // setting item from array to local storage
        localStorage.setItem("cityNames", JSON.stringify(namesCity));

        //adds list item to unordered list and adds city names to screen
        let listItem = $("<li class='card'>")
        listofCities.append(listItem);
        listItem.html(cityName);
        //adds most recent city name and today's date to the dashboard
        mainCity.html(`${cityName} &nbsp (${todaysDate})`);

    }

    //Gets 5 most recent searches from local storage and shows on screen
    function getCitiesLocalStorage() {
        infoArray = JSON.parse(localStorage.getItem("cityNames"));
        if (infoArray !== null) {
            console.log(infoArray);

            for (let i = infoArray.length - 5; i < infoArray.length; i++) {

                let LSlistItem = $("<li class='card'>")
                listofCities.append(LSlistItem);
                LSlistItem.html(infoArray[i]);
                console.log(infoArray[i])

            }

        }
    }

})