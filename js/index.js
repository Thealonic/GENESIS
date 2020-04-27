
//             71 69 78 69 83 73 83
// dP""b8 888888 88b 88 888888 .dP"Y8 88 .dP"Y8
//dP   `" 88__   88Yb88 88__   `Ybo." 88 `Ybo."
//Yb  "88 88""   88 Y88 88""   o.`Y8b 88 o.`Y8b
// YboodP 888888 88  Y8 888888 8bodP' 88 8bodP'

// Created by Thea Vherst

//====================================================
// VARIABLE creation /////////////////////////////////
//====================================================

var dirs = [], parts = [], container = document.createElement('div');
document.body.appendChild( container );
/////////////////////////////////
// control + camera assignment
var renderer, scene, camera;                                                      // scene render var creation
var orbitalControl = new THREE.OrbitControls(camera, renderer);                   //orbitcontrol setup
var controls = new THREE.OrbitControls( camera, renderer);                        // camera to renderer
    controls.addEventListener( 'change', render );                                //control listening
/////////////////////////////////




/////////////////////////////////
// song tracking variables
var beatspersecond = 117, currentbeat = 0, ticker;
var clock = new THREE.Clock;
/////////////////////////////////
// Function setup
init();
animate();
update();

// # MUSIC STUFF HERE #

//==================================================
//  SETUP creation /////////////////////////////////
//==================================================

function init() {
  /////////////////////////////////
  // predone render shit #octo&particles
  renderer = new THREE.WebGLRenderer;                                             // actual renderer call
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
  renderer.setSize(window.innerWidth, window.innerHeight);                        // window resize
  renderer.setClearColor(0x000000, 1);                                            // default background render
  document.getElementById('ThreeJS').appendChild(renderer.domElement);

  /////////////////////////////////
  //scene setup
  scene = new THREE.Scene();                                                      // scene creation
  var W = window.innerWidth, H = window.innerHeight;                              // scene size
  //camera setup
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.set(0, 0, 400);                                                 // camera assignment
  camera.up = new THREE.Vector3(0,500,0);

  /////////////////////////////////
  // control setup
  controls = new THREE.OrbitControls(camera);                                     // centeralising the camera
  controls.target = new THREE.Vector3(500, 200, 500);                             // controls
  controls.addEventListener('change', render);                                    // renderer based on controls
  // control assignments
  scene.add(camera);                                                              // camera to scene
  controls.addEventListener( 'change', render );                                  // control adjustments
	controls.screenSpacePanning = false;
  controls.enableDamping = true;   //damping
  controls.dampingFactor = 0.25;   //damping inertia
  controls.enableZoom = false;      //Zooming
  controls.autoRotate = false;       // enable rotation

  controls.minPolarAngle = Math.PI / 2 ; // radians
  controls.maxPolarAngle = Math.PI / 2 // radians

  controls.minAzimuthAngle = -Math.PI / 2;
  controls.maxAzimuthAngle = Math.PI / 2;

  


	//controls.minDistance = 300, controls.maxDistance = 700;                         // scroll limiting
  controls.addEventListener("change", () => {
      if (this.renderer) this.renderer.render(this.scene, camera);
    });
  /////////////////////////////////



//=================================================
// SCENE creation /////////////////////////////////
//=================================================

  //var geometry = new THREE.BoxGeometry(100, 100, 100);
  //var material = new THREE.MeshPhongMaterial({shininess: 1});
  //mesh = new THREE.Mesh( geometry, material );
  //scene.add( mesh );

  var light1 = new THREE.AmbientLight(0xff0000, 0.5);
  scene.add(light1);


  // CROSS OBJECT CREATION
  cross = new THREE.OBJLoader();
  var crossMaterial = new THREE.MeshPhongMaterial({
    reflectivity: 3.9, shininess: 900, specular: 0xffffff, wireframe: true });
  // CROSS VALUE ASIGNMENT
  cross.load("cross.obj", function(mesh){ mesh.traverse(function(node){
      if( node instanceof THREE.Mesh ){ node.material = crossMaterial }});
    //scene.add(mesh);
    mesh.scale.set(50, 50, 50), mesh.position.set(0, -15, 0), mesh.rotation.set(0.2, 0, 0)});
  var crosspointsgeometry = new THREE.Geometry(); // CROSS GEOMETRY STORAGE

  //TOP Angle fixes                 L                                                       DEFAULTS R;    DEFAULTS R;
  var topXlineR =  17, topXlineL = -17 // angle corrector for the mid horizontal line       HIDDEN (17)    PATCH:(24.2)   << A1 A2
  var topYlineR =  55, topYlineL =  55 // angle corrector for the mid vertical line         HIDDEN (55)    PATCH:(30)     << A1 A2
  var topZlineR = -17, topZlineL = -17 // angle corrector for the mid horizontal line       HIDDEN (17)    PATCH:(37)     << A1 A2
  //BOTTOM angle fixes              L                                                       DEFAULTS R;    DEFAULTS R;
  var botXlineR = 30,  botXlineL = -30 // angle corrector for the mid horizontal line       HIDDEN (30)    PATCH:(22)     << B1 B2
  var botYlineR = -35, botYlineL = -35 // angle corrector for the mid vertical line         HIDDEN (-35)   PATCH:(-63)    << B1 B2
  var botZlineR = 95,  botZlineL =  95 // angle corrector for the mid horizontal line       HIDDEN (95)    PATCH:(75)     << B1 B2

  /////////////////////////////////
  //line drawing <<LEFT>>                              L+R  U+D  B+F
  crosspointsgeometry.vertices.push( new THREE.Vector3( -30, -35, 95 ) );         //bottom left corner .
  crosspointsgeometry.vertices.push( new THREE.Vector3( -17, 55, -17 ) );
  crosspointsgeometry.vertices.push( new THREE.Vector3( -57, 55, -17 ) );         //bottom left corner <
  crosspointsgeometry.vertices.push( new THREE.Vector3( -52, 71, -37 ) );         //top left corner <
  crosspointsgeometry.vertices.push( new THREE.Vector3( -15, 71, -37 ) );
  crosspointsgeometry.vertices.push( new THREE.Vector3( -10, 100, -72.5 ) );      //top left corner ^
  //line drawing <<RIGHT>>
  crosspointsgeometry.vertices.push( new THREE.Vector3( 10, 100, -72.5 ) );       //top right corner ^
  crosspointsgeometry.vertices.push( new THREE.Vector3( 15, 71, -37 ) );
  crosspointsgeometry.vertices.push( new THREE.Vector3( 52, 71, -37 ) );          //top right corner >
  crosspointsgeometry.vertices.push( new THREE.Vector3( 57, 55, -17 ) );          //bottom right corner >
  crosspointsgeometry.vertices.push( new THREE.Vector3( 17, 55, -17 ) );
  crosspointsgeometry.vertices.push( new THREE.Vector3( 30, -35, 95 ) );          //bottom right corner .
  // return line
  crosspointsgeometry.vertices.push( new THREE.Vector3( -30, -35, 95 ) );         //bottom right corner .

  //crosspoints line drawing <<BOTTOM>>                 L+R  U+D  B+F
  crosspointsgeometry.vertices.push( new THREE.Vector3( -22, -63, 75 ) );         // << BOTTOM LEFT, BOTTOM >>    ORIGINAL: (-22, -63, 75)
  crosspointsgeometry.vertices.push( new THREE.Vector3( 22, -63, 75 ) );          // << BOTTOM RIGHT, BOTTOM >>    ORIGINAL: (22, -63, 75)
  crosspointsgeometry.vertices.push( new THREE.Vector3( 30, -35, 95 ) );          //bottom right corner .

  /////////////////////////////////
  //right undercarrage angle fix << RIGHT SIDE
  crosspointsgeometry.vertices.push( new THREE.Vector3(botXlineR, botYlineR, botZlineR ) );
  crosspointsgeometry.vertices.push( new THREE.Vector3(topXlineR, topYlineR, topZlineR ) );
      //top right under <<TRAVEL>>
      crosspointsgeometry.vertices.push( new THREE.Vector3( 17, 55, -17 ) );      // RIGHT SIDE, TOP WIDE TOP
      crosspointsgeometry.vertices.push( new THREE.Vector3( 57, 55, -17 ) );      // RIGHT SIDE, TIGHT CORNER TOP
  //top right under
  crosspointsgeometry.vertices.push( new THREE.Vector3( 52, 30, -37 ) );          // below bottom right corner >
  crosspointsgeometry.vertices.push( new THREE.Vector3( 24.2, 30, -37 ) );        // below bottom right corner >

      //top left under <<RETURN>>
      crosspointsgeometry.vertices.push( new THREE.Vector3( 17, 55, -17 ) );      // VERTIAL LINE DRAW EQUAL TO A1
      crosspointsgeometry.vertices.push( new THREE.Vector3( 30, -35, 95 ) );      // bottom right corner .

  /////////////////////////////////
  //top undercarrage angle fix << LEFT SIDE
  crosspointsgeometry.vertices.push( new THREE.Vector3(botXlineL, botYlineL, botZlineL ) );
  crosspointsgeometry.vertices.push( new THREE.Vector3(topXlineL, topYlineL, topZlineL ) );
      //top left under <<TRAVEL>>
      crosspointsgeometry.vertices.push( new THREE.Vector3( -17, 55, -17 ) );     // LEFT SIDE, TOP WIDE TOP
      crosspointsgeometry.vertices.push( new THREE.Vector3( -57, 55, -17 ) );     // LEFT SIDE, TIGHT CORNER TOP
  //top right under
  crosspointsgeometry.vertices.push( new THREE.Vector3( -52, 30, -37 ) );         // below bottom left corner <
  crosspointsgeometry.vertices.push( new THREE.Vector3( -24.2, 30, -37 ) );       // below bottom left corner <
      //top left under <<RETURN>>
      crosspointsgeometry.vertices.push( new THREE.Vector3( -17, 55, -17 ) );     // VERTIAL LINE DRAW EQUAL TO A2
      crosspointsgeometry.vertices.push( new THREE.Vector3( -30, -35, 95 ) );     // bottom right corner .

  /////////////////////////////////
  var crosspoints = new MeshLine();                                               //position storage
  crosspoints.setGeometry( crosspointsgeometry );
  var crosspointsmaterial = new MeshLineMaterial({                                // Line Material Adjustment
    lineWidth: 0.7, color: 0xff0000 });
  var crosspointsmesh = new THREE.Mesh( crosspoints.geometry, crosspointsmaterial );
  scene.add( crosspointsmesh );                                                   // creation

  //




  document.body.appendChild(renderer.domElement);
} // FUNCTION init END

//=================================================
// SCENE rendering ////////////////////////////////
//=================================================

/////////////////////////////////
// Resize function
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

/////////////////////////////////
// Animation camera calling
function animate() {
    requestAnimationFrame( animate );
    camera.lookAt( scene.position ), camera.updateMatrixWorld();
    controls.update();
    update(), render();
} // FUNCTION animate END

/////////////////////////////////
// Animation renderer
function update() { // start
  // Song timer generation
  if(clock.elapsedTime < 240){
     ticker = clock.elapsedTime * (beatspersecond / 60); // bpm calculation
     currentbeat = Math.round(ticker); // rounds off the current beat based on time
      //console.log(currentbeat); // console logger
  }
  clock.getDelta();





} // FUNCTION Update END

/////////////////////////////////
// Final renderer
renderer.setAnimationLoop(() => {
  update();
});

function render(){ // start
  renderer.render(scene, camera);
} // FUNCTION Render END

/////////////////////////////////
//           fin.
/////////////////////////////////
