$(document).ready(function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
  }
});

function successFunction(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  console.log(lat, long);
}

function errorFunction(position) {
  alert(
    "It seems like Geolocation, which is required for this page, is not enabled in your browser.!"
  );
}

function getCity() {
  let city = document.getElementById("cityName").value;

  async function getWeather(location) {
    const coordinateResponse = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=a9d459fbd4b3407b6defdda67f389e5d`
    );

    if (coordinateResponse.ok) {
      const info = await coordinateResponse.json();
      // console.log(info[0]);
      if (info.length == 0) {
        $(".currentWeather, .hourly, .nearbyPlaces").hide(300);
      } else {
        $(".currentWeather, .hourly, .nearbyPlaces").show(300);
        let lat = info[0].lat;
        let long = info[0].lon;

        const weatherResponse = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=a9d459fbd4b3407b6defdda67f389e5d`
        );
        if (!weatherResponse.ok) return "wrong api";
        const weather = await weatherResponse.json();
        let temperature = Math.round(weather.main.temp);
        let sunrise = weather.sys.sunrise;
        let sunset = weather.sys.sunset;
        let realFeel = Math.round(weather.main.feels_like);
        sunrise = new Date(sunrise * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        sunset = new Date(sunset * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        // console.log(weather);
        document.getElementById("crntUp").innerHTML = `${temperature}\xB0C`;
        document.getElementById("sunrise").innerHTML = `Sunrise: ${sunrise}`;
        document.getElementById("sunset").innerHTML = `Sunset: ${sunset}`;
        document.getElementById(
          "crntDown"
        ).innerHTML = `Real Feel: ${realFeel}\xB0C`;
        document.getElementById("current").innerHTML = `${city}`;
        document.getElementById(
          "date"
        ).innerHTML = `${new Date().toLocaleDateString()}`;
        let imageSource = weather.weather[0].icon;
        // console.log(imageSource);
        // let image = new Image();
        // image.src = ;
        document.getElementById(
          "crntImg"
        ).src = `http://openweathermap.org/img/wn/${imageSource}.png`;
        // console.log(lat);
        // console.log(long);

        const hourlyWeather = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&exclude=daily&appid=a9d459fbd4b3407b6defdda67f389e5d`
        );
        if (!hourlyWeather.ok) return "wrong hourly wheather api";
        const hours = await hourlyWeather.json();

        // Hourly weather section

        for (let i = 1; i <= 6; i++) {
          // Hours Section

          let timeOfWeather = new Date(
            hours.hourly[i].dt * 1000
          ).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          document.getElementById("hour" + i).innerHTML = `${timeOfWeather}`;

          // Image section

          let firstImgOfHour = hours.hourly[i].weather[0].icon;
          document.getElementById(
            "icon" + i
          ).src = `http://openweathermap.org/img/wn/${firstImgOfHour}.png`;

          // Forecast

          let HourForecast = hours.hourly[i].weather[0].description;
          document.getElementById("forecast" + i).innerHTML = `${HourForecast}`;

          // Temperature section
          let HourlyTemp = Math.round(hours.hourly[i].temp);
          document.getElementById(
            "tempHour" + i
          ).innerHTML = `${HourlyTemp}\xB0C`;

          // Real Feel
          let realFeelHour = Math.round(hours.hourly[i].feels_like);
          document.getElementById(
            "realFeelHourly" + i
          ).innerHTML = `${realFeelHour}\xB0C`;

          // wind speed &&  direction

          document.getElementById("windHour" + i).innerHTML = `${
            hours.hourly[i].wind_speed
          } ${degToText(hours.hourly[i].wind_deg)}`;
        }
      }
    }
  }

  getWeather(`${city}`);
}

function degToText(windDirection) {
  switch (true) {
    case windDirection >= 326.25 && windDirection <= 348.75:
      return "NNW";

    case windDirection >= 303.75 && windDirection <= 326.25:
      return "NW";

    case windDirection >= 281.25 && windDirection <= 303.75:
      return "WNW";

    case windDirection >= 258.75 && windDirection <= 281.25:
      return "W";

    case windDirection >= 236.25 && windDirection <= 258.75:
      return "WSW";

    case windDirection >= 213.75 && windDirection <= 236.25:
      return "SW";

    case windDirection >= 191.25 && windDirection <= 213.75:
      return "SSW";

    case windDirection >= 168.75 && windDirection <= 191.25:
      return "S";

    case windDirection >= 146.25 && windDirection <= 168.75:
      return "SSE";

    case windDirection >= 123.75 && windDirection <= 146.25:
      return "SE";

    case windDirection >= 101.25 && windDirection <= 123.75:
      return "ESE";

    case windDirection >= 78.75 && windDirection <= 101.25:
      return "E";

    case windDirection >= 56.25 && windDirection <= 78.75:
      return "ENE";

    case windDirection >= 33.75 && windDirection <= 56.25:
      return "NE";

    case windDirection >= 11.25 && windDirection <= 33.75:
      return "NNE";

    case (windDirection >= 348.75 && windDirection <= 360) ||
      (windDirection >= 0 && windDirection <= 11.25):
      return "N";
  }
}
