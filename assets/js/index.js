// const sunset = new Date(1644404847 * 1000);
// console.log(sunset);

function getCity() {
  let city = document.getElementById("cityName").value;
  // let city = "tashkent";

  // console.log(city);

  async function getWeather(location) {
    const coordinateResponse = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=a9d459fbd4b3407b6defdda67f389e5d`
    );

    if (!coordinateResponse.ok) return "wrong Location";

    const info = await coordinateResponse.json();
    // console.log(info[0]);
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
    document.getElementById("current").innerHTML = `Current Weather: ${city}`;
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

    let timeOfWeather = new Date(hours.hourly[1].dt * 1000).toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
    let timeOfWeatherSecond = new Date(
      hours.hourly[2].dt * 1000
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    let timeOfWeatherThird = new Date(
      hours.hourly[3].dt * 1000
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    let timeOfWeatherForth = new Date(
      hours.hourly[4].dt * 1000
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    let timeOfWeatherFifth = new Date(
      hours.hourly[5].dt * 1000
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    let timeOfWeatherSixth = new Date(
      hours.hourly[6].dt * 1000
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    document.getElementById("first").innerHTML = `${timeOfWeather}`;
    document.getElementById("second").innerHTML = `${timeOfWeatherSecond}`;
    document.getElementById("third").innerHTML = `${timeOfWeatherThird}`;
    document.getElementById("forth").innerHTML = `${timeOfWeatherForth}`;
    document.getElementById("fifth").innerHTML = `${timeOfWeatherFifth}`;
    document.getElementById("sixth").innerHTML = `${timeOfWeatherSixth}`;

    console.log(hours);
    // Images section
    let firstImgOfHour = hours.hourly[1].weather[0].icon;
    let secondImgOfHour = hours.hourly[2].weather[0].icon;
    let thirdImgOfHour = hours.hourly[3].weather[0].icon;
    let forthImgOfHour = hours.hourly[4].weather[0].icon;
    let fifthImgOfHour = hours.hourly[5].weather[0].icon;
    let sixthImgOfHour = hours.hourly[6].weather[0].icon;

    document.getElementById(
      "firstHourImg"
    ).src = `http://openweathermap.org/img/wn/${firstImgOfHour}.png`;
    document.getElementById(
      "secondHourImg"
    ).src = `http://openweathermap.org/img/wn/${secondImgOfHour}.png`;
    document.getElementById(
      "thirdHourImg"
    ).src = `http://openweathermap.org/img/wn/${thirdImgOfHour}.png`;
    document.getElementById(
      "forthHourImg"
    ).src = `http://openweathermap.org/img/wn/${forthImgOfHour}.png`;
    document.getElementById(
      "fifthHourImg"
    ).src = `http://openweathermap.org/img/wn/${fifthImgOfHour}.png`;
    document.getElementById(
      "sixthHourImg"
    ).src = `http://openweathermap.org/img/wn/${sixthImgOfHour}.png`;
    //

    let firstHourTemp = Math.round(hours.hourly[1].temp);
    let firstFeelHour = Math.round(hours.hourly[1].feels_like);

    // Forecast section
    let firstHourForecast = hours.hourly[1].weather[0].description;
    let secondHourForecast = hours.hourly[2].weather[0].description;
    let thirdHourForecast = hours.hourly[3].weather[0].description;
    let forthHourForecast = hours.hourly[4].weather[0].description;
    let fifthHourForecast = hours.hourly[5].weather[0].description;
    let sixthHourForecast = hours.hourly[6].weather[0].description;

    document.getElementById("firstForecast").innerHTML = `${firstHourForecast}`;
    document.getElementById(
      "secondForecast"
    ).innerHTML = `${secondHourForecast}`;
    document.getElementById("thirdForecast").innerHTML = `${thirdHourForecast}`;
    document.getElementById("forthForecast").innerHTML = `${forthHourForecast}`;
    document.getElementById("fifthForecast").innerHTML = `${fifthHourForecast}`;
    document.getElementById("sixthForecast").innerHTML = `${sixthHourForecast}`;

    //

    document.getElementById(
      "tempHourFirst"
    ).innerHTML = `${firstHourTemp}\xB0C`;
    document.getElementById(
      "realFeelFirstHour"
    ).innerHTML = `${firstFeelHour}\xB0C`;
    const windDirection = hours.hourly[1].wind_deg;
    let windSpeed = hours.hourly[1].wind_speed;
    console.log(windDirection);
    // let text;
    // switch (true) {
    //   case windDirection >= 326.25 && windDirection <= 348.75:
    //     text = "NNW";
    //     break;
    //   case windDirection >= 303.75 && windDirection <= 326.25:
    //     text = "NW";
    //     break;
    //   case windDirection >= 281.25 && windDirection <= 303.75:
    //     text = "WNW";
    //     break;
    //   case windDirection >= 258.75 && windDirection <= 281.25:
    //     text = "W";
    //     break;
    //   case windDirection >= 236.25 && windDirection <= 258.75:
    //     text = "WSW";
    //     break;
    //   case windDirection >= 213.75 && windDirection <= 236.25:
    //     text = "SW";
    //     break;
    //   case windDirection >= 191.25 && windDirection <= 213.75:
    //     text = "SSW";
    //     break;
    //   case windDirection >= 168.75 && windDirection <= 191.25:
    //     text = "S";
    //     break;
    //   case windDirection >= 146.25 && windDirection <= 168.75:
    //     text = "SSE";
    //     break;
    //   case windDirection >= 123.75 && windDirection <= 146.25:
    //     text = "SE";
    //     break;
    //   case windDirection >= 101.25 && windDirection <= 123.75:
    //     text = "ESE";
    //     break;
    //   case windDirection >= 78.75 && windDirection <= 101.25:
    //     text = "E";
    //     break;
    //   case windDirection >= 56.25 && windDirection <= 78.75:
    //     text = "ENE";
    //     break;
    //   case windDirection >= 33.75 && windDirection <= 56.25:
    //     text = "NE";
    //     break;
    //   case windDirection >= 11.25 && windDirection <= 33.75:
    //     text = "NNE";
    //     break;
    //   case windDirection >= 348.75 && windDirection <= 11.25:
    //     text = "N";
    //     break;
    // }
    document.getElementById(
      "windHourFirst"
    ).innerHTML = `${windSpeed} ${degToText(windDirection)}`;
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
