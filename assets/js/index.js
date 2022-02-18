async function getCity() {
  let city = document.getElementById("cityName").value;
  document.getElementById("current").innerHTML = `${city}`;
  const res = await getCoordinates(city);
  if (!res) {
    $(".currentWeather, .hourly, .nearbyPlaces, .fiveDay").hide(300);
    document.getElementById("errPg").style.display = "flex";
    document.getElementById("today").style.display = "none";
    document.getElementById("fiveDayChange").style.display = "none";
  } else {
    $(".currentWeather, .hourly, .nearbyPlaces").show(300);
    document.getElementById("errPg").style.display = "none";
    document.getElementById("today").style.display = "block";
    document.getElementById("fiveDayChange").style.display = "block";
    getWeather(res);
  }
}

async function getCoordinates(location) {
  const coordinateResponse = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=a9d459fbd4b3407b6defdda67f389e5d`
  );
  if (!coordinateResponse.ok) return undefined;
  const info = await coordinateResponse.json();
  if (!info.length) return undefined;
  return {
    lat: info[0].lat,
    lon: info[0].lon,
  };
}

async function getMyLocation() {
  const ipResponse = await fetch(
    `http://api.ipapi.com/check?access_key=e15f336aa6b37d37cef60fcb54de87b4`
  );
  if (!ipResponse.ok) return undefined;
  const ipResponseInfo = await ipResponse.json();
  document.getElementById(
    "current"
  ).innerHTML = `${ipResponseInfo.location.capital}`;
  return {
    lat: ipResponseInfo.latitude,
    lon: ipResponseInfo.longitude,
  };
}

async function getWeather({ lat, lon }) {
  const weatherResponse = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=a9d459fbd4b3407b6defdda67f389e5d`
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

  //
  //
  document.getElementById("crntUp").innerHTML = `${temperature}\xB0C`;
  document.getElementById("sunrise").innerHTML = `Sunrise: ${sunrise}`;
  document.getElementById("sunset").innerHTML = `Sunset: ${sunset}`;
  document.getElementById("crntDown").innerHTML = `Real Feel: ${realFeel}\xB0C`;
  document.getElementById(
    "date"
  ).innerHTML = `${new Date().toLocaleDateString()}`;
  let imageSource = weather.weather[0].icon;
  document.getElementById(
    "crntImg"
  ).src = `http://openweathermap.org/img/wn/${imageSource}.png`;
  const hourlyWeather = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,alerts&appid=a9d459fbd4b3407b6defdda67f389e5d`
  );
  if (!hourlyWeather.ok) return "wrong hourly wheather api";
  const hours = await hourlyWeather.json();

  for (let i = 1; i <= 6; i++) {
    let timeOfWeather = new Date(hours.hourly[i].dt * 1000).toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
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
    document.getElementById("tempHour" + i).innerHTML = `${HourlyTemp}\xB0C`;
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
  document
    .getElementById("fiveDayChange")
    .addEventListener("click", async function () {
      $(".currentWeather").hide(300);
      $(".fiveDay").show(300);
      const fiveDaysRespone = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly&appid=a9d459fbd4b3407b6defdda67f389e5d`
      );
      if (!fiveDaysRespone.ok) return "wrong api";
      const weatherOfFiveDays = await fiveDaysRespone.json();
      console.log(weatherOfFiveDays);
      for (let i = 0; i <= 4; i++) {
        let timeOfDaily = new Date(weatherOfFiveDays.daily[i].dt * 1000);
        let options = {
          weekday: "long",
        };
        let week = timeOfDaily.toLocaleDateString("en-US", options);
        let option = {
          month: "long",
          day: "numeric",
        };

        let day = timeOfDaily.toLocaleDateString("en-US", option);
        if (i !== 0) document.getElementById("week" + i).innerHTML = `${week}`;
        document.getElementById("cardDay" + i).innerHTML = `${day}`;
        let dailytemp = Math.round(weatherOfFiveDays.daily[i].temp.day);
        document.getElementById(
          "cardWeather" + i
        ).innerHTML = `${dailytemp}\xB0C`;
        let dailyDescription =
          weatherOfFiveDays.daily[i].weather[0].description;
        document.getElementById(
          "cardFeel" + i
        ).innerHTML = `${dailyDescription}`;
      }
    });
}
function toToday() {
  $(".fiveDay").hide(200);
  $(".currentWeather").show(200);
}
toToday();

getMyLocation().then((res) => {
  getWeather(res);
});

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
