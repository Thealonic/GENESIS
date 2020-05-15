
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
// song tracking variables
var beatspersecond = 117, currentbeat = 0, ticker = 0, tock = 0;
var clock = new THREE.Clock;
/////////////////////////////////
var crosspointsgeometry, crosspoints;
var crosspointsmaterial, crosspointsmesh;
/////////////////////////////////
var outerglowinggeometry, outerglowingpoints;
var outerglowingmaterial, outerglowingmesh;
var line1point, linefpoint, line2point;
/////////////////////////////////
var corrector;
var trackerX, trackerY, trackerZ;
/////////////////////////////////
var topXlineR =  17,  topXlineL = -17;
var topYlineR =  55,  topYlineL =  55;
var topZlineR = -17,  topZlineL = -17;
/////////////////////////////////
var botXlineR =  30,  botXlineL = 30;
var botYlineR = -35,  botYlineL = -35;
var botZlineR =  95,  botZlineL =  95;
/////////////////////////////////
var sideRXlineR =  52,   sideRYlineR = 30,  sideRZlineR = -37;
var sideRXlineL =  24.2, sideRYlineL = 30,  sideRZlineL = -37;
var sideLXlineL = -24.2, sideLYlineL = 30,  sideLZlineL = -37;
var sideLXlineR = -52,   sideLYlineR = 30,  sideLZlineR = -37;
/////////////////////////////////
var botbotXlineR =  22,  botbotYlineR = -63, botbotZlineR = 75;
var botbotXlineL = -22,  botbotYlineL = -63, botbotZlineL = 75;
/////////////////////////////////
var toptopXlineR =  10, toptopYlineR = 100, toptopZlineR = -72.5;
var toptopXlineL = -10, toptopYlineL = 100, toptopZlineL = -72.5;
var topbottomXlineR =  10, topbottomYlineR = 100, topbottomZlineR = -72.5;
var topbottomXlineL = -10, topbottomYlineL = 100, topbottomZlineL = -72.5;
/////////////////////////////////
var midtopXlineR = 52, midtopYlineR = 71, midtopZlineR = -37;
var midtopXlineL = -52, midtopYlineL = 71, midtopZlineL = -37;
var midbottomXlineR = 52, midbottomYlineR = 71, midbottomZlineR = -37;
var midbottomXlineL = -52, midbottomYlineL = 71, midbottomZlineL = -37;

// Function setup
init();
animate();
update();

// # MUSIC STUFF HERE #

//==================================================
//  SETUP creation /////////////////////////////////
//==================================================

function init() {
  // predone render shit #octo&particles
  renderer = new THREE.WebGLRenderer;                                             // actual renderer call
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
  renderer.setSize(window.innerWidth, window.innerHeight);                        // window resize                                       // default background render
  document.getElementById('ThreeJS').appendChild(renderer.domElement);

  //scene setup
  scene = new THREE.Scene(), camera;                                              // scene creation
  var W = window.innerWidth, H = window.innerHeight;                              // scene size
  //camera setup
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 400);                                                 // camera assignment
  camera.up = new THREE.Vector3(0,500,0);

  controls = new THREE.OrbitControls(camera, renderer.domElement);                                     // centeralising the camera
  controls.target = new THREE.Vector3(500, 200, 500);                             // controls
  controls.addEventListener('change', render);                                    // renderer based on controls
  scene.add(camera);                                                              // camera to scene

	controls.enablePan = false;
  controls.enableDamping = true;                                                  //damping
  controls.dampingFactor = 0.25;                                                  //damping inertia
  controls.minPolarAngle = Math.PI / 2 ;
  controls.maxPolarAngle = Math.PI / 2 ;
  controls.minAzimuthAngle = -Math.PI * 0.5;
  controls.maxAzimuthAngle = Math.PI * 0.5;
	controls.minDistance = 300, controls.maxDistance = 700;                       // scroll limiting
  controls.addEventListener("change", () => {
  if (this.renderer) this.renderer.render(this.scene, camera)});

//=================================================
// SCENE creation /////////////////////////////////
//=================================================

  var gridXZ = new THREE.GridHelper(100, 10);
  gridXZ.setColors( new THREE.Color(0xff0000), new THREE.Color(0xffffff) );
  //scene.add(gridXZ);

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
    corrector = camera.position.x;
    correctorPi = camera.rotation.y;
    console.log(correctorPi);
    requestAnimationFrame( animate );

    if(camera.position.x < 65 && camera.position.x > -65) {
      topXlineR =  17, topYlineR =  55, topZlineR = -17;    //top tight right side pannel
      botXlineR =  30, botYlineR = -35, botZlineR =  95;    //bottom right right side pannel
      topXlineL = -17, topYlineL =  55, topZlineL = -17;    //top tight left side pannel
      botXlineL = -30, botYlineL = -35, botZlineL =  95;    //bottom tight left side pannel
      toptopYlineR = 100, toptopYlineL = 100;
      toptopXlineR = 10,  toptopXlineL = -10;
      topbottomYlineR = 100, topbottomYlineL = 100;
      topbottomXlineR = 10,  topbottomXlineL = -10;
      //line perspective corrector
      sideRXlineL = (-corrector / (Math.PI * 1.96)) + 24.4; //(TBR)
      sideLXlineL = (-corrector / (Math.PI * 1.96)) - 24.4};//(TBL)

    if(camera.position.x > 65) { // camera going right
      topXlineR = 15, topYlineR =  30, topZlineR = -37; //box drawing
      botXlineR = (corrector / (Math.PI * 4)) + 22, botYlineR = -63, botZlineR =  75; //side bottom right
      sideRXlineL = 15; //tight bottom right corner lock
      botbotXlineR = (corrector / (Math.PI * 4)) + 22; // continuation of (ABR)
      sideLXlineL = (-corrector / (Math.PI * 1.94)) - 24.4; // continuation of (TBL)
      toptopYlineR = (corrector / 80) + 80; // topback line vertical
      toptopXlineR = (corrector / (Math.PI * 12)) + 9;
      topbottomYlineR = (corrector / 80) + 75.5; //topbackbottom line vertical
      topbottomXlineR = (corrector / (Math.PI * 18)) + 9.5 };

    if(camera.position.x < -65) { // camera going left
      topXlineL = -15, topYlineL =  30, topZlineL = -37; //box drawing
      botXlineL = (corrector / (Math.PI * 4)) - 22, botYlineL = -63, botZlineL =  75; //side bottom LEFT
      sideLXlineL = -15; //tight bottom left corner lock
      botbotXlineL = (corrector / (Math.PI * 4)) - 22; // continuation of (ABL)
      sideRXlineL = (-corrector / (Math.PI * 1.94)) + 24.4; // continuation of (TBR)
      toptopYlineL = (-corrector / 80) + 78; // topback line vertical
      toptopXlineL = (corrector / (Math.PI * 12)) - 9;
      topbottomYlineL = (-corrector / 80) + 75.5; //topbackbottom line vertical
      topbottomXlineL = (corrector / (Math.PI * 20)) - 11 };
    /////////////////////////////////
    if(camera.position.x < 57 && camera.position.x > -57) {
      botbotXlineR = (corrector / (Math.PI * 4)) + 22;
      botbotXlineL = (corrector / (Math.PI * 4)) - 22};
    // perspective opposite shifts
    if(camera.position.x < 57) { botbotXlineR = (corrector / (Math.PI * 4)) + 22};  //(ABR)
    if(camera.position.x > -57) { botbotXlineL = (corrector / (Math.PI * 4)) - 22}; //(ABL)
    /////////////////////////////////
    if(camera.position.x > -155 && camera.position.x < 155){
      midtopXlineR = 52, midtopYlineR = 71, midtopZlineR = -37;
      midtopXlineL = -52, midtopYlineL = 71, midtopZlineL = -37;
      midbottomXlineR = 52, midbottomYlineR = 71, midbottomZlineR = -37;
      midbottomXlineL = -52, midbottomYlineL = 71, midbottomZlineL = -37;
      sideRXlineR =  52,   sideRYlineR = 30,  sideRZlineR = -37 };
    if(camera.position.x < -155) {
      midtopXlineL = (-corrector / (Math.PI * 20)) - 50;
      midtopYlineL = (corrector / (Math.PI * 16)) + 58;
      midtopZlineL = (corrector / (Math.PI * 20)) - 50;
      midbottomYlineL = 30, midbottomZlineL = -37 };
    if(camera.position.x > 155) {
      midtopXlineR = (-corrector / (Math.PI * 20)) + 50;
      midtopYlineR = (-corrector / (Math.PI * 16)) + 58;
      midtopZlineR = (-corrector / (Math.PI * 20)) - 50;
      midbottomYlineR = 30, midbottomZlineR = -37 };
    /////////////////////////////////
    if(camera.position.x < -170) {
      sideRXlineR = ( -correctorPi * (Math.PI * (Math.PI * Math.PI) - (Math.PI + Math.PI) ) + 52 - ((Math.PI + Math.PI + 1) * 2) + 2);
      sideRYlineR = (( -correctorPi * (Math.PI * (Math.PI * Math.PI) - (Math.PI) ) + 30 - (Math.PI + Math.PI) - Math.PI) - Math.PI + 2);
      sideRZlineR = (( -correctorPi * (Math.PI * Math.PI)) - 37);
      sideRXlineL = 57, sideRYlineL = 55, sideRZlineL = -17 };
    if(camera.position.x > -170 && camera.position.x < -165 ) {
      sideRXlineL =  52,   sideRYlineL = 30,  sideRZlineL = -37
      sideRXlineR =  52,   sideRYlineR = 30,  sideRZlineR = -37};
    if(camera.position.x > 170) {
      sideLXlineL = -( correctorPi * (Math.PI * (Math.PI * Math.PI) - (Math.PI + Math.PI) ) + 52 - ((Math.PI + Math.PI + 1) * 2) + 2);
      sideLYlineL = (( correctorPi * (Math.PI * (Math.PI * Math.PI) - (Math.PI) ) + 30 - (Math.PI + Math.PI) - Math.PI) - Math.PI + 2);
      sideLZlineL = (( correctorPi * (Math.PI * Math.PI)) - 37);
      sideLXlineR = -57, sideLYlineR = 55, sideLZlineR = -17 };
    if(camera.position.x > 165  && camera.position.x < 170 ) {
      sideLXlineL = -52,   sideLYlineL = 30,  sideLZlineL = -37
      sideLXlineR = -52,   sideLYlineR = 30,  sideLZlineR = -37};

    /////////////////////////////////

    crosspointsgeometry = new THREE.Geometry(); // CROSS GEOMETRY STORAGE
    crosspointsgeometry.vertices.push(
      new THREE.Vector3( -30, -35, 95 ),         //                               <<LEFT>>
      new THREE.Vector3( -17, 55, -17 ),         //bottom left corner .  A
      new THREE.Vector3( -17, 55, -17 ),         //                      B
      new THREE.Vector3( -57, 55, -17 ),         //bottom left corner <
      new THREE.Vector3( -52, 71, -37 ),         //top left corner <
      new THREE.Vector3( midtopXlineL, midtopYlineL, midtopZlineL ),
      new THREE.Vector3( midbottomXlineL, midbottomYlineL, midbottomZlineL ),
      new THREE.Vector3( midtopXlineL, midtopYlineL, midtopZlineL ),
      new THREE.Vector3( -52, 71, -37 ),
      new THREE.Vector3( -15, 71, -37 ),
      new THREE.Vector3( -10, 100, -72.5 ),      //top left corner ^
      new THREE.Vector3( toptopXlineL, toptopYlineL, toptopZlineL ),
      new THREE.Vector3( topbottomXlineL, topbottomYlineL, topbottomZlineL ),
      new THREE.Vector3( toptopXlineL, toptopYlineL, toptopZlineL ),
      new THREE.Vector3( -10, 100, -72.5 ),
      new THREE.Vector3( 10, 100, -72.5 ),       //top right corner ^             <<RIGHT>>
      new THREE.Vector3( toptopXlineR, toptopYlineR, toptopZlineR ),
      new THREE.Vector3( topbottomXlineR, topbottomYlineR, topbottomZlineR ),
      new THREE.Vector3( toptopXlineR, toptopYlineR, toptopZlineR ),
      new THREE.Vector3( 10, 100, -72.5 ),
      new THREE.Vector3( 15, 71, -37 ),
      new THREE.Vector3( 52, 71, -37 ),
      new THREE.Vector3( midtopXlineR, midtopYlineR, midtopZlineR ),
      new THREE.Vector3( midbottomXlineR, midbottomYlineR, midbottomZlineR ),
      new THREE.Vector3( midtopXlineR, midtopYlineR, midtopZlineR ),
      new THREE.Vector3( 52, 71, -37 ),          //top right corner >
      new THREE.Vector3( 57, 55, -17 ),          //bottom right corner >
      new THREE.Vector3( 17, 55, -17 ),
      new THREE.Vector3( 30, -35, 95 ),          //bottom right corner .
        new THREE.Vector3( -30, -35, 95 ),       //bottom right corner .          <<RETURN>>
      //crosspoints line drawing                                                  <<BOTTOM>>
        new THREE.Vector3( botbotXlineL, botbotYlineL, botbotZlineL ),            // ORIGINAL: (-22, -63, 75)
        new THREE.Vector3( botbotXlineR, botbotYlineR, botbotZlineR ),            // ORIGINAL: ( 22, -63, 75)
        new THREE.Vector3( 30, -35, 95 ),          //bottom right corner .
      //right undercarrage angle fix << RIGHT SIDE
      new THREE.Vector3(botXlineR, botYlineR, botZlineR ),
      new THREE.Vector3(topXlineR, topYlineR, topZlineR ),
        new THREE.Vector3( 17, 55, -17 ),        // RIGHT SIDE, TOP WIDE TOP      <<RIGHT>>
        new THREE.Vector3( 57, 55, -17 ),        // RIGHT SIDE, TIGHT CORNER TOP
        new THREE.Vector3( sideRXlineR, sideRYlineR, sideRZlineR ),
        new THREE.Vector3( sideRXlineL, sideRYlineL, sideRZlineL ),
          new THREE.Vector3( 17, 55, -17 ),
          new THREE.Vector3( 30, -35, 95 ),
          new THREE.Vector3( -30, -35, 95 ),
    //top undercarrage angle fix << LEFT SIDE
      new THREE.Vector3(botXlineL, botYlineL, botZlineL ),
      new THREE.Vector3(topXlineL, topYlineL, topZlineL ),
        new THREE.Vector3( -17, 55, -17 ),       // LEFT SIDE, TOP WIDE TOP       <<LEFT>>
        new THREE.Vector3( -57, 55, -17 ),       // LEFT SIDE, TIGHT CORNER TOP
        new THREE.Vector3( sideLXlineR, sideLYlineR, sideLZlineR ),
        new THREE.Vector3( sideLXlineL, sideLYlineL, sideLZlineL ),
          new THREE.Vector3( -17, 55, -17 ),
          new THREE.Vector3( -30, -35, 95 ));                                     //<<RETURN>>

    crosspoints = new MeshLine();                                                 //position storage
    crosspoints.setGeometry( crosspointsgeometry );
    crosspointsmaterial = new MeshLineMaterial({ lineWidth: 0.7, color: 0xff0000 });
    scene.remove(crosspointsmesh);
    crosspointsmesh = new THREE.Mesh( crosspoints.geometry, crosspointsmaterial );
    scene.add( crosspointsmesh );
    crosspointsmesh.geometry.verticesNeedUpdate = true;

    /////////////////////////////////

    trackerX = camera.position.x;
    trackerY = camera.position.y;
    trackerZ = camera.position.Z;
    //if(trackerX > 138){ camera.position.set(trackerX - 1) }

    renderer.render(scene, camera);
    camera.lookAt( scene.position ), camera.updateMatrixWorld();
    controls.update();
    update(), render();

    //console.log(camera.position.x, camera.position.z);
} // FUNCTION animate END

/////////////////////////////////
// Animation renderer
function update() { // start

  if(clock.elapsedTime < 240){ if(currentbeat == tock){
      ticker = clock.elapsedTime * (beatspersecond / 60); // bpm calculation
      currentbeat = Math.round(ticker); // rounds off the current beat based on time
    } else { tock = tock + 1, console.log("Current Beat:", tock)}};
  clock.getDelta();

} // FUNCTION Update END

/////////////////////////////////
// Final renderer
function render(){ // start
} // FUNCTION Render END

/////////////////////////////////
//           fin.
/////////////////////////////////
