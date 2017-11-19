var getLondonAirApiUrl = function (siteCode) {
  //CT3
  return (
    'http://api.erg.kcl.ac.uk/AirQuality/Hourly/MonitoringIndex/SiteCode=' +
    siteCode +
    '/JSON'
  );
};

var displayFooter = function (locationName, speciesName, airQualityBand, url) {
  var footer = document.getElementById('footer-text');
  if (footer && footer.innerHTML) {
    var footerText = footer.innerHTML;
    footerText += ' Current risk index for '+ speciesName +' in \''+ locationName +'\' appears to be \'<a target="blank" href="'+url+'">'+ airQualityBand +'</a>\'.';
    footer.innerHTML = footerText;
  }
  if (footer.style) {
    footer.style.visibility = 'visible';
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
            if (response.HourlyAirQualityIndex.LocalAuthority && response.HourlyAirQualityIndex.LocalAuthority.Site && response.HourlyAirQualityIndex.LocalAuthority.Site.species) {
              var dioxideData = response.HourlyAirQualityIndex.LocalAuthority.Site.species[0];
              var locationName = response.HourlyAirQualityIndex.LocalAuthority['@LocalAuthorityName'];
              var speciesName = dioxideData['@SpeciesName'];
              var airQualityBand = dioxideData['@AirQualityBand'];
              var airQualityIndex = dioxideData['@AirQualityIndex'];
              if(airQualityBand && airQualityIndex && airQualityBand != 'No data') {
                displayFooter(locationName, speciesName, airQualityBand, getLondonAirApiUrl(siteCode));
                callback(airQualityIndex*2);
              }
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
