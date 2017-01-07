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
          try {
            var response = JSON.parse(xhr.response);
          } catch (err) {
            console.log('Unable to parse Yahoo Weather API response: ' + err);
            callback(10);
          }
          if (response && response.query) {
            if (!response.query.results) {
              console.log('Yahoo Weather API response empty.');
              callback(10);
            } else {
              if (response.query.results.channel && response.query.results.channel.item && response.query.results.channel.item.condition) {
                var fahrenheitVal = response.query.results.channel.item.condition.temp;
                var celsiusVal = fahrenheitToCelsius(fahrenheitVal);
                callback(celsiusVal);
              }
            }
          }
        }
      }
    };
    xhr.send(null);
  } catch (err) {
    console.log('Unable to retrieve Yahoo Weather API data: ' + err);
  }
};
