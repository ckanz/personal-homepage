var fahrenheitToCelsius = function (fahrenheitVal) {
  return (fahrenheitVal - 32) * 5 / 9;
};

var getYeahooWeatherApiUrl = function (woeid) {
  return (
    'https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20%3D%20' +
    woeid +
    '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
  );
};

var getTemperature = function (woeid, callback) {
  var xhr = new XMLHttpRequest();
  try {
    xhr.open('GET', getYeahooWeatherApiUrl(woeid), true);
    xhr.onload = function (err) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var fahrenheitVal = (JSON.parse(xhr.response)).query.results.channel.item.condition.temp;
          var celsiusVal = fahrenheitToCelsius(fahrenheitVal);
          celsiusVal += 10;  // show zero points when it's colder than -10 degree celcius
          callback(celsiusVal);
        }
      }
    };
    xhr.send(null);
  } catch (err) {}
};
