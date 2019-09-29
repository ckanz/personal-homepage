var getLondonAirApiUrl = function (siteCode) {
  //CT3
  return (
    'http://api.erg.kcl.ac.uk/AirQuality/Hourly/MonitoringIndex/SiteCode=' +
    siteCode +
    '/JSON'
  );
};

var getLondonTimeSeriesAirApiUrl = function (siteCode) {
  //CT3
  return (
    'http://api.erg.kcl.ac.uk/AirQuality/Data/Wide/Site/SiteCode=' +
    siteCode +
    '/StartDate=2019-09-20/EndDate=2019-09-26/JSON'
  );
};

var displayFooter = function (locationName, speciesName, airQualityBand, url) {
  var footer = document.getElementById('footer-text');
  if (footer && footer.innerHTML) {
    var footerText = footer.innerHTML;
    footerText += ' Current risk index for \''+ speciesName +'\' in \''+ locationName +'\' appears to be \'<a target="blank" href="'+url+'">'+ airQualityBand +'</a>\'.';
    footer.innerHTML = footerText;
  }
  if (footer.style) {
    footer.style.display = 'block';
  }
};

var getLondonAirQuality = function (siteCode, callback) {
  var xhr = new XMLHttpRequest();
  try {
    xhr.open('GET', getLondonAirApiUrl(siteCode), true);
    xhr.onload = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            var response = JSON.parse(xhr.response);
          } catch (err) {
            console.log('Unable to parse London Air API response: ' + err);
            callback(10);
          }
          if (response && response.HourlyAirQualityIndex) {
            console.log('Current Hour', response);
            if (response.HourlyAirQualityIndex.LocalAuthority
              && response.HourlyAirQualityIndex.LocalAuthority.Site
              && response.HourlyAirQualityIndex.LocalAuthority.Site.species) {
              var locationName = response.HourlyAirQualityIndex.LocalAuthority['@LocalAuthorityName'];
              var airQualityDataArray = response.HourlyAirQualityIndex.LocalAuthority.Site.species;
              var validDataFound = false;
              airQualityDataArray.forEach(function(airQualityDataPoint) {
                var speciesName = airQualityDataPoint['@SpeciesName'];
                var airQualityBand = airQualityDataPoint['@AirQualityBand'];
                var airQualityIndex = parseInt(airQualityDataPoint['@AirQualityIndex']);
                console.log(speciesName + ' in London Air Api is ' + airQualityBand);
                if (!validDataFound && airQualityBand && airQualityIndex && airQualityBand != 'No data') {
                  displayFooter(locationName, speciesName, airQualityBand, getLondonAirApiUrl(siteCode));
                  validDataFound = true;
                  callback(airQualityIndex);
                }
              });
            } else {
              console.log('London Air Api response does not contain expected data.');
            }
          } else {
            console.log('London Air Api response does not contain expected data.');
          }
        }
      }
    };
    xhr.send(null);
  } catch (err) {
    console.log('Unable to retrieve London Air API data: ' + err);
  }
};

var getLondonTimeSeriesAirQuality = function (siteCode, callback) {
  var xhr = new XMLHttpRequest();
  try {
    xhr.open('GET', getLondonTimeSeriesAirApiUrl(siteCode), true);
    xhr.onload = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            var response = JSON.parse(xhr.response);
          } catch (err) {
            console.log('Unable to parse London Air API response: ' + err);
            callback(10);
          }
          if (response && response.AirQualityData) {
            if (response.AirQualityData.RawAQData
              && response.AirQualityData.RawAQData.Data
              && response.AirQualityData.RawAQData.Data.length > 0
              && response.AirQualityData.Columns
              && response.AirQualityData.Columns.Column
              && response.AirQualityData.Columns.Column .length > 0) {
              console.log('Last Week Time Series:', response);
              var columns = response.AirQualityData.Columns.Column
              console.log('columns', columns)
              var timeSeriesArray = []
              columns.forEach(function(column) {
                var timeSeries = response.AirQualityData.RawAQData.Data.map(function(record = {}) {
                  return parseFloat(record['@' + column['@ColumnId']]) || 0
                })
                timeSeriesArray.push(timeSeries)
              })
              callback(timeSeriesArray);
            } else {
              console.log('London Air Api response does not contain expected data.');
            }
          } else {
            console.log('London Air Api response does not contain expected data.');
          }
        }
      }
    };
    xhr.send(null);
  } catch (err) {
    console.log('Unable to retrieve London Air API data: ' + err);
  }
};
