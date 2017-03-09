var getParticleSettings = function (particleNumber) {
  var colour = '#ffffff';
  if (particleNumber < 0) {
    colour = '#08C';
    particleNumber = Math.abs(particleNumber);
  }
  return {
    'particles': {
      'number': {
        'value': particleNumber,
        'density': {
          'enable': true,
          'value_area': 800
        }
      },
      'color': {
        'value': colour
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
        'value': 10,
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
        'color': colour,
        'opacity': 0.4,
        'width': 1
      },
      'move': {
        'enable': true,
        'speed': particleNumber,
        'direction': 'none',
        'random': false,
        'straight': false,
        'out_mode': 'out',
        'attract': {
          'enable': true,
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
  };
};
