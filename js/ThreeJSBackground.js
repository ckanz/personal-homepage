var mouseX = 0, mouseY = 0,
SEPARATION = 200,
AMOUNTX = 10,
AMOUNTY = 10,
camera, scene, renderer;

			init();
			animate();

			function init() {

				var container, separation = 100, amountX = 50, amountY = 50,
				particles, particle;

				container = document.getElementById("background");

				camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000);
				camera.position.z = 1;

				scene = new THREE.Scene();
				

				renderer = new THREE.CanvasRenderer();
				renderer.setClearColorHex( 0x444444, 1 );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( 2000, window.innerHeight );
				container.appendChild( renderer.domElement );

				var PI2 = Math.PI * 2;
				var material = new THREE.SpriteCanvasMaterial( {

					color: 0x000000,
					border: 1.0,
					
					program: function ( context ) {
						context.beginPath();
						context.arc( 0, 0, 0.5, 0, PI2, true );
						context.fill();

					}

				} );

				var geometry = new THREE.Geometry();

				for ( var i = 0; i < 15; i ++ ) {

					particle = new THREE.Sprite( material );
					particle.position.x = Math.random() * 2 - 1;
					particle.position.y = Math.random() * 2 - 1;
					particle.position.z = Math.random() * 2 - 1;
					particle.position.normalize();
					particle.position.multiplyScalar( Math.random() * 10 + 450 );
					particle.scale.x = particle.scale.y = 50;
					scene.add( particle );

					geometry.vertices.push( particle.position );

				}

				var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.5, linewidth: 5 } ) );
				scene.add( line );

				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.addEventListener( 'touchstart', onDocumentTouchStart, false );
				document.addEventListener( 'touchmove', onDocumentTouchMove, false );

				//

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//

			function onDocumentMouseMove(event) {

				mouseX = event.clientX;
				mouseY = event.clientY;

			}

			function onDocumentTouchStart( event ) {

				if ( event.touches.length > 1 ) {

					//event.preventDefault();

					mouseX = event.touches[ 0 ].pageX;
					mouseY = event.touches[ 0 ].pageY;

				}

			}

			function onDocumentTouchMove( event ) {

				if ( event.touches.length == 1 ) {

					//event.preventDefault();

					mouseX = event.touches[ 0 ].pageX;
					mouseY = event.touches[ 0 ].pageY;

				}

			}

			//

			function animate() {

				requestAnimationFrame( animate );

				render();

			}

			function render() {

				camera.position.x += ( mouseX/5 - camera.position.x ) * .02;
				camera.position.y += ( - mouseY/5 + 200 - camera.position.y ) * .02;
				camera.lookAt( scene.position );

				renderer.render( scene, camera );

			}