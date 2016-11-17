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

var getTemperature = function (woeid) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', getYeahooWeatherApiUrl(woeid), false);
  xhr.send();
  if (xhr.status === 200) {
    try {
      var fahrenheitVal = (JSON.parse(xhr.response)).query.results.channel.item.condition.temp;
      var celsiusVal = fahrenheitToCelsius(fahrenheitVal);
      return celsiusVal;
    } catch (err) {
      return 0;
    }
  } else {
    return 0;
  }
};
