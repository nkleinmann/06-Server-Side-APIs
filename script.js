$(function () {
    $(".searchBtn").on("click", function () {
        let cityName = $("#inputCity").val();
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

    })

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


        // need to add from local storage when they reload the page 
        // let $divCityList = $(".cityList");
        // $divCityList.append()
    }
})