var getLondonAirApiUrl = function (siteCode) {
  //CT3
  return (
    'http://api.erg.kcl.ac.uk/AirQuality/Daily/MonitoringIndex/Latest/SiteCode=' +
    siteCode +
    '/JSON'
  );
};

var displayFooter = function () {
  var footer = document.getElementById('footer-text');
  if (footer && footer.style) {
    footer.style.visibility = 'visible';
  }
};

var getLondonAirQuality = function (siteCode, callback) {
  var xhr = new XMLHttpRequest();
  try {
    xhr.open('GET', getLondonAirApiUrl(siteCode), true);
    xhr.onload = function (err) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            var response = JSON.parse(xhr.response);
          } catch (err) {
            console.log('Unable to parse London Air API response: ' + err);
            callback(10);
          }
          if (response && response.DailyAirQualityIndex) {
            if (response.DailyAirQualityIndex.LocalAuthority && response.DailyAirQualityIndex.LocalAuthority.Site && response.DailyAirQualityIndex.LocalAuthority.Site.Species) {
              var dioxideData = response.DailyAirQualityIndex.LocalAuthority.Site.Species[0];
              var particleAmount = dioxideData['@AirQualityIndex'] * 2;
              displayFooter();
              callback(particleAmount);
            } else {
              console.log('London Air Api response empty.')
            }
          }
        }
      }
    };
    xhr.send(null);
  } catch (err) {
    console.log('Unable to retrieve London Air API data: ' + err);
  }
};
