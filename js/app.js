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
      return (JSON.parse(xhr.response)).query.results.channel.item.condition.temp;
    } catch (err) {
      return 0;
    }
  } else {
    return 0;
  }
};

particlesJS('particles-js',
  {
    'particles': {
      'number': {
        'value': getTemperature(4418),
        'density': {
          'enable': true,
          'value_area': 800
        }
      },
      'color': {
        'value': '#ffffff'
      },
      'shape': {
        'type': 'circle',
        'stroke': {
          'width': 0,
          'color': '#000000'
        },
        'polygon': {
          'nb_sides': 5
        }
      },
      'opacity': {
        'value': 0.5,
        'random': false,
        'anim': {
          'enable': true,
          'speed': 1,
          'opacity_min': 0.1,
          'sync': false
        }
      },
      'size': {
        'value': 5,
        'random': true,
        'anim': {
          'enable': true,
          'speed': 5,
          'size_min': 0.01,
          'sync': false
        }
      },
      'line_linked': {
        'enable': true,
        'distance': 150,
        'color': '#ffffff',
        'opacity': 0.4,
        'width': 1
      },
      'move': {
        'enable': true,
        'speed': 2.5,
        'direction': 'none',
        'random': false,
        'straight': false,
        'out_mode': 'out',
        'attract': {
          'enable': false,
          'rotateX': 600,
          'rotateY': 1200
        }
      }
    },
    'interactivity': {
      'detect_on': 'canvas',
      'events': {
        'onhover': {
          'enable': false
        },
        'onclick': {
          'enable': false
        }
      }
    },
    'retina_detect': true,
    'config_demo': {
      'hide_card': false,
      'background_color': '#000',
      'background_image': '',
      'background_position': '50% 50%',
      'background_repeat': 'no-repeat',
      'background_size': 'cover'
    }
  }
);
