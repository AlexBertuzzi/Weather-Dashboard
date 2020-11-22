// This variable is used to get your most recent search from local storage and run it through the loadWeather 
// function.
var searchInput = JSON.parse(localStorage.getItem("searchInput"));
loadWeather();
// This function is used to create a new <p> tag representing your most recent search. this function is called
// after every click event.
function prependSearch(){
    var recent = $("<p>");
    recent = recent.text(JSON.parse(localStorage.getItem("searchInput")));
    $("#recent").prepend(recent);
};
// When the search button is clicked the text from the search field is used to restate the searchInput variable
// localy and is then run through the loadWeather function. The value that is then sent to local storage is used 
// to create a new <p> that goes into the #recent div.
$("#searchBtn").on("click", function(event){
    event.preventDefault();
    searchInput = $("#searchInput").val().trim();
    loadWeather();
    prependSearch();
});  
// When one of the <p> tags in the #recent div is clicked the text
// from that specific tag is used to restate the searchInput variable localy and run it through the 
// loadWeather function.
$("#recent").on("click", "p", function(){
    searchInput = $(this).text();
    loadWeather();
    prependSearch();
});
// The loadWeather function utilizes the Open Weather Map Api in two different Api calls to grab the current : 
// city, weather icon, temp, humidity, wind speed, uv index and the forecast data : temp, humidity, and weather icon.
// Moment js is also utilized to convert the UNIX timestamps to the date that is displayed next to the city name and
// in the five day forcast.
    function loadWeather(){
        var APIkey = "c0d3d17620b893f264681d297097a6e0";
        var currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=" + APIkey;
        
        $.ajax({
            url: currentURL,
            method: "GET"
        }).then(function(res1){
            console.log(res1);
            localStorage.setItem("searchInput", JSON.stringify(res1.name));
            var date = moment.unix(res1.dt).format("L");
            $("#city").text(res1.name + " " + date);
            $("#icon").attr("src", "http://openweathermap.org/img/wn/" + res1.weather[0].icon + ".png");
            var lat = res1.coord.lat;
            var lon = res1.coord.lon;
            var forcastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly,alerts&appid=" + APIkey;
            
            $.ajax({
                url: forcastURL,
                method: "GET"
            }).then(function(res2){
                console.log(res2);
                $("#hum").text("Humidity: " + res2.current.humidity + "%");
                $("#temp").text(res2.current.temp + " Fahrenheit");
                $("#wind").text("Wind Speed: " + res2.current.wind_speed + " mph");
                $("#uv").text(res2.current.uvi);
                if (res2.current.uvi <= 3.33){
                    $("#uv").attr("class", "green");
                }
                    else if (res2.current.uvi > 3.33 || res2.current.uvi <= 6.66){
                        $("#uv").attr("class", "yellow");
                    }
                        else if (res2.current.uvi > 6.66){
                            $("#uv").attr("class", "red");
                        }

                $("#d1").text(moment.unix(res2.daily[1].dt).format("L"));
                $("#i1").attr("src", "http://openweathermap.org/img/wn/" + res2.daily[1].weather[0].icon + ".png");
                $("#t1").text(res2.daily[1].temp.day + " Fahrenheit");
                $("#h1").text("Humidity: " + res2.daily[1].humidity + "%");

                $("#d2").text(moment.unix(res2.daily[2].dt).format("L"));
                $("#i2").attr("src", "http://openweathermap.org/img/wn/" + res2.daily[2].weather[0].icon + ".png");
                $("#t2").text(res2.daily[2].temp.day + " Fahrenheit");
                $("#h2").text("Humidity: " + res2.daily[2].humidity + "%");

                $("#d3").text(moment.unix(res2.daily[3].dt).format("L"));
                $("#i3").attr("src", "http://openweathermap.org/img/wn/" + res2.daily[3].weather[0].icon + ".png");
                $("#t3").text(res2.daily[3].temp.day + " Fahrenheit");
                $("#h3").text("Humidity: " + res2.daily[3].humidity + "%");

                $("#d4").text(moment.unix(res2.daily[4].dt).format("L"));
                $("#i4").attr("src", "http://openweathermap.org/img/wn/" + res2.daily[4].weather[0].icon + ".png");
                $("#t4").text(res2.daily[4].temp.day + " Fahrenheit");
                $("#h4").text("Humidity: " + res2.daily[4].humidity + "%");

                $("#d5").text(moment.unix(res2.daily[5].dt).format("L"));
                $("#i5").attr("src", "http://openweathermap.org/img/wn/" + res2.daily[5].weather[0].icon + ".png");
                $("#t5").text(res2.daily[5].temp.day + " Fahrenheit");
                $("#h5").text("Humidity: " + res2.daily[5].humidity + "%");
            })
        });
    }

