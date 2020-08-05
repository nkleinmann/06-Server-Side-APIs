$(function () {

let cityName = "";

//Populates list of 5 most recent cities in local storage on screen
getCitiesLocalStorage();




    $(".searchBtn").on("click", function (event) {
        event.preventDefault();
        cityName = $("#inputCity").val();
        let currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=25d3fdfe342a19e8d55725db62d19795";

        addCities(cityName);

        $.ajax({
            url: currentWeatherURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);
                let lat = response.coord.lat;
                let lon = response.coord.lon;

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
    $(".clearBtn").on("click", function() {
        localStorage.clear();
    });

    // add cities to page
    function addCities(citySearch) {
        //adding to local storage
        // taking key to get items
        let namesCity = localStorage.getItem("cityNames");
        // taking string from local storage and putting back in original form
        namesCity = JSON.parse(namesCity) || [];
        namesCity.push(citySearch);
        // setting item from array to local storage
        localStorage.setItem("cityNames", JSON.stringify(namesCity));

        //adds list item to unordered list and adds city names to screen
        let listItem = $("<li>")
        $(".listOfCities").append(listItem);
        listItem.html(cityName);
        //adds most recent city name to the dashboard
        $("h3.searchedCity").html(cityName);
        


        // need to add from local storage when they reload the page 
        // let $divCityList = $(".cityList");
        // $divCityList.append()
    }

    function getCitiesLocalStorage() {
        infoArray = JSON.parse(localStorage.getItem("cityNames"));
        if (infoArray !== null) {
            console.log(infoArray);

            for (let i = infoArray.length-5; i < infoArray.length; i++) {

            let LSlistItem = $("<li>")
                $(".listOfCities").append(LSlistItem);
                LSlistItem.html(infoArray[i]);
                console.log(infoArray[i])

            }

        }
    }

//     // loads city list from local storage and displays on screen
//     function loadLs() {
//         let cityListLS = JSON.parse(localStorage.getItem("dailyPlan"));
//         if (cityListLS!== null) {

            
//         }
//     }

//     // calls function to load local storage and displays on the screen
// loadLs();
    
})