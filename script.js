//Funtion when Geolocation is used
function geolocation(){
    if(navigator.geolocation){      //check wheather browser support geolocation
        navigator.geolocation.getCurrentPosition(showposition);
    }else{
        console.log("Geolocation is not supported");
    }

    function showposition(position){
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        var url1 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;
        call_url(url1);    //calling function to display data
    }
}

//function when drop down is used
function weather(){
    var location = document.getElementById('location').value;
    var url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;
    call_url(url);  //calling function to dispay data
    document.getElementById('location').value="";
}

//function to display information
function call_url(url){
    //fetching url
    fetch(url,{method:'GET'})
    //resolve data
    .then((response) => response.json())
    //use data
    .then((data) => {
        var daytemp = data.main.temp - 273.15;
        var cityname = data.name;
        var discription = data.weather[0].main;
        var humidity = data.main.humidity;
        var wind = data.wind.speed *3.6;
        var feel = data.main.feels_like - 273.15;
        var mintemp = data.main.temp_min - 273.15;
        var maxtemp = data.main.temp_max - 273.15;
        var presure = data.main.pressure;

        var el = document.getElementsByClassName("mainbody")[0];
        var e2 = document.getElementById("output-logo");

        if(discription.toLowerCase()=="rain"){
            el.style.backgroundImage = "url(rain2.gif)";
            e2.style.backgroundImage="url(rain-logo.png)";
        }

        else if(discription.toLowerCase()=="thunderstorm"){
            el.style.backgroundImage = "url(thunderstorm.jfif)";
            e2.style.backgroundImage="url(rain-logo.png)";
        }

        else if(discription.toLowerCase()=="clear"){
            el.style.backgroundImage = "url(cloud-moving.gif)";
            e2.style.backgroundImage="url(clear-logo.png)";
        }

        else if(discription.toLowerCase()=="haze" || discription.toLowerCase()=="smoke"){
            el.style.backgroundImage = "url(haze.gif)";
            e2.style.backgroundImage="url(haze-logo.png)";
        }

        else if(discription.toLowerCase()=="clouds"){
            el.style.backgroundImage = "url(cloud-moving.gif)";
            e2.style.backgroundImage="url(partialy-cloudy-logo.png)";
        }

        else{
            e2.style.backgroundImage="";
        }

        document.getElementsByClassName('display-pannel')[0].style.visibility="visible";
        document.getElementById('output-temp').innerText=parseInt(daytemp);
        document.getElementById('output-name').innerText=cityname.toUpperCase();
        document.getElementById('output-disc').innerText=discription;
        document.getElementById('output-humidity').innerText=humidity;
        document.getElementById('output-wind').innerText=wind.toFixed(2);
        document.getElementById('output-feels-like').innerText=parseInt(feel);
        document.getElementById('output-min-temp').innerText=parseInt(mintemp);
        document.getElementById('output-max-temp').innerText=parseInt(maxtemp);
        document.getElementById('output-pressure').innerText=presure;
    })
}