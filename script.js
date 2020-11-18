
$("#searchBtn").on("click", function(){
    var searchInput = $("#searchInput").val().trim();
    var APIkey = "c0d3d17620b893f264681d297097a6e0";
    var currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=" + APIkey;
    var forcastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&appid=" + APIkey;

    $.ajax({
        url: currentURL,
        method: "GET"
    }).then(function(res1){
        console.log(res1);
        $("#city").text(res1.name + " " + res1.weather[0].description);
        var tempF = (res1.main.temp - 273.15) * 1.80 + 32;
        $("#temp").text(tempF.toFixed(2) + " Fahrenheit");
        $("#hum").text("Humidity: " + res1.main.humidity + "%");
        $("#wind").text("Wind Speed: " + res1.wind.speed + " mph");
        var lat = res1.coord.lat;
        var lon = res1.coord.lon;
        var uvURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey;
        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function(resUV){
            console.log(resUV);
            $("#uv").text("UV Index: " + resUV.value)
        })
    });

    $.ajax({
        url: forcastURL,
        method: "GET"
    }).then(function(res2){
        console.log(res2);
    })
});