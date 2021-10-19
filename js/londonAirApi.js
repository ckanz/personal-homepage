var getLondonAirApiUrl = function (siteCode) {
  return (
    'http://api.erg.kcl.ac.uk/AirQuality/Hourly/MonitoringIndex/SiteCode=' +
    siteCode +
    '/JSON'
  );
};

var getLondonTimeSeriesAirApiUrl = function (siteCode) {
  // use local data until API connection is fixed
  return '/js/localPollutionData.json';

  var date = new Date();
  var day, month, year;

  day = date.getDate();
  month = ('0' + (date.getMonth() + 1)).slice(-2);
  year = date.getFullYear();
  var endDate = year + '-' + month + '-' + day

  date = new Date(date.setDate(date.getDate() - 7));
  day = date.getDate();
  month = ('0' + (date.getMonth() + 1)).slice(-2);
  year = date.getFullYear();
  var startDate = year + '-' + month + '-' + day;

  return (
    'http://api.erg.kcl.ac.uk/AirQuality/Data/Wide/Site/SiteCode=' +
    siteCode +
    '/StartDate=' +
    startDate +
    '/EndDate=' +
    endDate +
    '/JSON'
  );
};

var displayFooter = function () {
  var footerWrapper = document.getElementById('footer');
  if (footerWrapper.style) {
    footerWrapper.style.opacity = '1.0';
  }
};

var displayElement = function (id) {
  var element = document.getElementById(id);
  if (element && element.style) {
    element.style.opacity = '1.0';
    element.style.display = 'block';
  }
};

var displayFooterData = function (locationName, speciesName, airQualityBand, url) {
  var footerDataId = 'footer-data';
  var footer = document.getElementById(footerDataId);
  if (footer) {
    footer.innerHTML = ' Current risk index for \''+ speciesName +'\' in \''+ locationName +'\' appears to be \'<a target="blank" href="'+url+'">'+ airQualityBand +'</a>\'.';
  }
  displayElement(footerDataId);
};

var getLondonAirQuality = function (siteCode, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', getLondonAirApiUrl(siteCode), true);
  xhr.onload = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        try {
          var response = JSON.parse(xhr.response);
        } catch (err) {
          console.log('Unable to parse London Air API response: ', err);
          callback();
        }
        if (response && response.HourlyAirQualityIndex) {
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
                displayElement('footer');
                displayElement('footer-text');
                displayElement('footer-point-expl');
                displayFooterData(locationName, speciesName, airQualityBand, getLondonAirApiUrl(siteCode));
                validDataFound = true;
                callback(airQualityIndex);
              }
            });
          } else {
            console.error('London Air Api response does not contain expected data.');
          }
        } else {
          console.error('London Air Api response does not contain expected data.');
        }
      }
    }
  };
  xhr.send(null);
  xhr.onerror = function (err) {
    console.error('Unable to retrieve London Air API data: ', err);
  }
};

var getLondonTimeSeriesAirQuality = function (siteCode, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', getLondonTimeSeriesAirApiUrl(siteCode), true);
  xhr.onload = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        try {
          var response = JSON.parse(xhr.response);
        } catch (err) {
          console.error('Unable to parse London Air API response: ', err);
          callback();
        }
        if (response && response.AirQualityData) {
          if (response.AirQualityData.RawAQData
            && response.AirQualityData.RawAQData.Data
            && response.AirQualityData.RawAQData.Data.length > 0
            && response.AirQualityData.Columns
            && response.AirQualityData.Columns.Column
            && response.AirQualityData.Columns.Column .length > 0) {
            console.log('Pollution Time Series:', response);
            var timeSeriesArray = [];
            var metricNameArray = [];
            response.AirQualityData.Columns.Column.forEach(function(column) {
              if (column && column['@ColumnName'] && column['@ColumnId']) {
                metricNameArray.push(column['@ColumnName'].split(': ')[1]);
                var timeSeries = response.AirQualityData.RawAQData.Data.map(function(record = {}) {
                  return parseFloat(record['@' + column['@ColumnId']])
                })
                timeSeriesArray.push(
                  timeSeries.filter(function(d) { return !isNaN(d) })
                )
              }
            })
            displayElement('footer');
            displayElement('footer-text');
            displayElement('footer-line-expl');
            callback({ timeSeriesArray, metricNameArray });
          } else {
            console.error('London Air Api response does not contain expected data.');
          }
        } else {
          console.error('London Air Api response does not contain expected data.');
        }
      }
    }
  };
  xhr.send(null);
  xhr.onerror = function (err) {
    console.error('Unable to retrieve London Air API data: ', err);
  }
};
