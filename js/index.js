
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
var renderer, scene, camera;                                                      // scene render var creation
var orbitalControl = new THREE.OrbitControls(camera, renderer);                   //orbitcontrol setup
var controls = new THREE.OrbitControls( camera, renderer);                        // camera to renderer
    controls.addEventListener( 'change', render );                                //control listening
/////////////////////////////////
var beatspersecond = 117, currentbeat = 0, ticker = 0, tock = 0;
var clock = new THREE.Clock;
/////////////////////////////////
var crosspointsgeometry, crosspoints, crosspointsmaterial, crosspointsmesh;
/////////////////////////////////
var outerglowinggeometry, outerglowingpoints, outerglowingmaterial, outerglowingmesh;
/////////////////////////////////
var corrector;
var trackerX, trackerY, trackerZ;
/////////////////////////////////
var topXlineR =  17,  topXlineL = -17,
    topYlineR =  55,  topYlineL =  55,
    topZlineR = -17,  topZlineL = -17;
var botXlineR =  30,  botXlineL = 30,
    botYlineR = -35,  botYlineL = -35,
    botZlineR =  95,  botZlineL =  95;
/////////////////////////////////
var sideRXlineR =  52,   sideRYlineR = 30,  sideRZlineR = -37,
    sideRXlineL =  24.2, sideRYlineL = 30,  sideRZlineL = -37,
    sideLXlineL = -24.2, sideLYlineL = 30,  sideLZlineL = -37,
    sideLXlineR = -52,   sideLYlineR = 30,  sideLZlineR = -37;
var botbotXlineR =  22,  botbotYlineR = -63, botbotZlineR = 75,
    botbotXlineL = -22,  botbotYlineL = -63, botbotZlineL = 75;
var toptopXlineR =  10, toptopYlineR = 100, toptopZlineR = -72.5,
    toptopXlineL = -10, toptopYlineL = 100, toptopZlineL = -72.5;
var topbottomXlineR =  10, topbottomYlineR = 100, topbottomZlineR = -72.5,
    topbottomXlineL = -10, topbottomYlineL = 100, topbottomZlineL = -72.5;
var midtopXlineR = 52, midtopYlineR = 71, midtopZlineR = -37,
    midtopXlineL = -52, midtopYlineL = 71, midtopZlineL = -37,
    midbottomXlineR = 52, midbottomYlineR = 71, midbottomZlineR = -37,
    midbottomXlineL = -52, midbottomYlineL = 71, midbottomZlineL = -37;
/////////////////////////////////
var rightcorrector = 0, leftcorrector = 0, i = 0, crossstatus = 0;
var crossloop = [], crossobj;
var crosscolour = 0xff0000
/////////////////////////////////
var line1x = 0, line1y = 0, line1z = 0, line2x = 0, line2y = 0, line2z = 0,
    line3x = 0, line3y = 0, line3z = 0, line4x = 0, line4y = 0, line4z = 0,
    line5x = 0, line5y = 0, line5z = 0, line6x = 0, line6y = 0, line6z = 0,
    line7x = 0, line7y = 0, line7z = 0, line8x = 0, line8y = 0, line8z = 0;
/////////////////////////////////
var point1x = -30,              point1y = -35,              point1z = 95,
    point2x = sideLXlineL,      point2y = sideLYlineL,      point2z = sideLZlineL,
    point3x = sideLXlineR,      point3y = sideLYlineR,      point3z = sideLZlineR,
    point4x = -57,              point4y = 55,               point4z = -17,
    point5x = -52,              point5y = 71,               point5z = -37,
    point6x = topbottomXlineL,  point6y = topbottomYlineL,  point6z = topbottomZlineL,
    point7x = toptopXlineL,     point7y = toptopYlineL,     point7z = toptopZlineL,
    point8x = -10,              point8y = 100,              point8z = -72.5,
    point9x = 10,               point9y = 100,              point9z = -72.5,
    point10x = toptopXlineR,    point10y = toptopYlineR,    point10z = toptopZlineR,
    point11x = topbottomXlineR, point11y = topbottomYlineR, point11z = topbottomZlineR,
    point12x = 52,              point12y = 71,              point12z = -37,
    point13x = 57,              point13y = 55,              point13z = -17,
    point14x = sideRXlineR,     point14y = sideRYlineR,     point14z = sideRZlineR;
    point15x = sideRXlineL,     point15y = sideRYlineL,     point15z = sideRZlineL,
    point16x = 30,              point16y = -35,             point16z = 95,
    point17x = botbotXlineR,    point17y = botbotYlineR,   point17z = botbotZlineR,
    point18x = botbotXlineL,    point18y = botbotYlineL,    point18z = botbotZlineL;
/////////////////////////////////
var glowloop = 0, glowloopreset = 0, status = 0, multiplier = 1;
var denominator = 6, denominator2 = denominator / 3,
    denominator4 = denominator / 3 * 2, denominator3 = denominator / 2;
var startpoint0 = denominator - denominator,
    startpoint1 = denominator * 1, startpoint2 = denominator * 2, startpoint3 = denominator * 3, startpoint4 = denominator * 4,
    startpoint5 = denominator * 5, startpoint6 = denominator * 6, startpoint7 = denominator * 7, startpoint8 = denominator * 8,
    startpoint9 = denominator * 9, startpoint10 = denominator * 10, startpoint11 = denominator * 11, startpoint12 = denominator * 12,
    startpoint13 = denominator * 13, startpoint14 = denominator * 14, startpoint15 = denominator * 15, startpoint16 = denominator * 16,
    startpoint17 = denominator * 17, startpoint18 = denominator * 18, startpoint19 = denominator * 19
var startpointpre24 = (denominator * 4), startpointpre16 = (startpointpre24 / 3) * 2,
    startpointpre8 = (startpointpre24 / 3), startpointpre12 = (startpointpre24 / 2);
/////////////////////////////////
init(), animate(), update(); // basic functions
/////////////////////////////////
glowringani(); // clockwise glow idle glowloop
//==================================================
//  SETUP creation /////////////////////////////////
//==================================================
function init() {
  renderer = new THREE.WebGLRenderer;                                             // actual renderer call
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
  renderer.setSize(window.innerWidth, window.innerHeight);                        // window resize                                       // default background render
  document.getElementById('ThreeJS').appendChild(renderer.domElement);
  //scene setup
  scene = new THREE.Scene(), camera;                                              // scene creation
  var W = window.innerWidth, H = window.innerHeight;                              // scene size
  //camera setup
  camera = new THREE.PerspectiveCamera(45, W/H, 0.1, 1000);
  camera.position.set(0, 0, 400);                                                 // camera assignment
  camera.up = new THREE.Vector3(0,500,0);
  //controls setup
  controls = new THREE.OrbitControls(camera, renderer.domElement);                                     // centeralising the camera
  controls.target = new THREE.Vector3(500, 200, 500);                             // controls
  controls.addEventListener('change', render);                                    // renderer based on controls
  scene.add(camera);                                                              // camera to scene
	controls.enablePan = false;
  controls.enableDamping = false;                                                  //damping
  controls.minPolarAngle = Math.PI / 2 ;
  controls.maxPolarAngle = Math.PI / 2 ;
  controls.minAzimuthAngle = -Math.PI * 0.5;
  controls.maxAzimuthAngle = Math.PI * 0.5;
	controls.minDistance = 410, controls.maxDistance = 410;                       // scroll limiting
  controls.addEventListener("change", () => {
  if (this.renderer) this.renderer.render(this.scene, camera)});
//=================================================
// SCENE creation /////////////////////////////////
//=================================================
  var gridXZ = new THREE.GridHelper(100, 10);
  gridXZ.setColors( new THREE.Color(0xff0000), new THREE.Color(0xffffff) );
  //scene.add(gridXZ);
  document.body.appendChild(renderer.domElement)};
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight)};
    /////////////////////////////////
function animate() {
    corrector = camera.position.x;
    correctorPi = camera.rotation.y;
    requestAnimationFrame( animate );
    //=================================================
    // Variable Storage ///////////////////////////////
    //=================================================
    if(camera.position.x < 65 && camera.position.x > -65) {
      topXlineR =  17, topYlineR =  55, topZlineR = -17;    //top tight right side pannel
      botXlineR =  30, botYlineR = -35, botZlineR =  95;    //bottom right right side pannel
      topXlineL = -17, topYlineL =  55, topZlineL = -17;    //top tight left side pannel
      botXlineL = -30, botYlineL = -35, botZlineL =  95;    //bottom tight left side pannel
      toptopYlineR = 100, toptopYlineL = 100;
      toptopXlineR = 10,  toptopXlineL = -10;
      topbottomXlineR = 15, topbottomYlineR = 71, topbottomZlineR = -37;
      topbottomXlineL = -15, topbottomYlineL = 71, topbottomZlineL = -37,
      sideRXlineL = (-corrector / (Math.PI * 1.96)) + 24.4; //(TBR)
      sideLXlineL = (-corrector / (Math.PI * 1.96)) - 24.4};//(TBL)
    /////////////////////////////////
    if(leftcorrector == 1){ leftcorrector = 0
      sideLXlineL = -52,   sideLYlineL = 30,  sideLZlineL = -37;
      sideLXlineR = -52,   sideLYlineR = 30,  sideLZlineR = -37}
    if(rightcorrector == 1){ rightcorrector = 0
      sideRXlineL =  52,   sideRYlineL = 30,  sideRZlineL = -37;
      sideRXlineR =  52,   sideRYlineR = 30,  sideRZlineR = -37}
    /////////////////////////////////
    if(camera.position.x > 65) { // camera going right
      topXlineR = 15, topYlineR =  30, topZlineR = -37; //box drawing
      topbottomXlineR = 10, topbottomYlineR = 100, topbottomZlineR = -72.5;
      botXlineR = (corrector / (Math.PI * 4)) + 22, botYlineR = -63, botZlineR =  75; //side bottom right
      sideRXlineL = 15; //tight bottom right corner lock
      botbotXlineR = (corrector / (Math.PI * 4)) + 22; // continuation of (ABR)
      sideLXlineL = (-corrector / (Math.PI * 1.94)) - 24.4; // continuation of (TBL)
      toptopYlineR = (-corrector / 50) + 86; // topback line vertical
      toptopXlineR = (corrector / (Math.PI * 12)) + 9;
      topbottomYlineR = (corrector / 85) + 75.5; //topbackbottom line vertical
      topbottomXlineR = (corrector / (Math.PI * 18)) + 9.5
      if(camera.position.x > 325) {
        toptopXlineR = (corrector / (Math.PI * 12)) + 11;
        toptopYlineR = (-corrector / 40) + 83; // topback line vertical
        toptopZlineR = -(corrector / (Math.PI * 2.5)) - 30;
        topbottomXlineR = (corrector / (Math.PI * 20)) + 18;
        topbottomYlineR = -(corrector / 5) + 137; // topback line vertical
        topbottomZlineR = (corrector / (Math.PI * 3.8)) - 95 }};
    /////////////////////////////////
    if(camera.position.x < -65) { // camera going left
      topXlineL = -15, topYlineL =  30, topZlineL = -37; //box drawing
      topbottomXlineL = -10, topbottomYlineL = 100, topbottomZlineL = -72.5;
      botXlineL = (corrector / (Math.PI * 4)) - 22, botYlineL = -63, botZlineL =  75; //side bottom LEFT
      sideLXlineL = -15; //tight bottom left corner lock
      botbotXlineL = (corrector / (Math.PI * 4)) - 22; // continuation of (ABL)
      sideRXlineL = (-corrector / (Math.PI * 1.94)) + 24.4; // continuation of (TBR)
      toptopYlineL = (corrector / 50) + 86; // topback line vertical
      toptopXlineL = (corrector / (Math.PI * 12)) - 9;
      topbottomYlineL = (-corrector / 85) + 75.5; //topbackbottom line vertical
      topbottomXlineL = (corrector / (Math.PI * 20)) - 11
    /////////////////////////////////
      if(camera.position.x < -325) {
        toptopXlineL = (corrector / (Math.PI * 12)) - 11;
        toptopYlineL = (corrector / 40) + 83; // topback line vertical
        toptopZlineL = (corrector / (Math.PI * 2.5)) - 30;
        topbottomXlineL = (corrector / (Math.PI * 20)) - 18;
        topbottomYlineL = (corrector / 5) + 137; // topback line vertical
        topbottomZlineL = (-corrector / (Math.PI * 3.8)) - 95 }};
    /////////////////////////////////
    if(camera.position.x < 57 && camera.position.x > -57) {
      botbotXlineR = (corrector / (Math.PI * 4)) + 22;
      botbotXlineL = (corrector / (Math.PI * 4)) - 22};
    /////////////////////////////////
    if(camera.position.x < 57) { botbotXlineR = (corrector / (Math.PI * 4)) + 22};  //(ABR)
    if(camera.position.x > -57) { botbotXlineL = (corrector / (Math.PI * 4)) - 22}; //(ABL)
    /////////////////////////////////
    if(camera.position.x > -155 && camera.position.x < 155){
      midtopXlineR = 52, midtopYlineR = 71, midtopZlineR = -37;
      midtopXlineL = -52, midtopYlineL = 71, midtopZlineL = -37;
      midbottomXlineR = 52, midbottomYlineR = 71, midbottomZlineR = -37;
      midbottomXlineL = -52, midbottomYlineL = 71, midbottomZlineL = -37;
      sideRXlineR =  52,   sideRYlineR = 30,  sideRZlineR = -37 };
    /////////////////////////////////
    if(camera.position.x < -170) {
      sideRXlineR = ( -correctorPi * (Math.PI * (Math.PI * Math.PI) - (Math.PI + Math.PI) ) + 52 - ((Math.PI + Math.PI + 1) * 2) + 2);
      sideRYlineR = (( -correctorPi * (Math.PI * (Math.PI * Math.PI) - (Math.PI) ) + 30 - (Math.PI + Math.PI) - Math.PI) - Math.PI + 2);
      sideRZlineR = (( -correctorPi * (Math.PI * Math.PI)) - 37);
      sideRXlineL = sideRXlineR, sideRYlineL = sideRYlineR, sideRZlineL = sideRZlineR };
      if(camera.position.x < -155) {
        midtopXlineL = (-corrector / (Math.PI * 20)) - 50;
        midtopYlineL = (corrector / (Math.PI * 16)) + 58;
        midtopZlineL = (corrector / (Math.PI * 20)) - 50;
        midbottomYlineL = 30, midbottomZlineL = -37 };
    /////////////////////////////////
    if(camera.position.x > 170) {
      sideLXlineL = -( correctorPi * (Math.PI * (Math.PI * Math.PI) - (Math.PI + Math.PI) ) + 52 - ((Math.PI + Math.PI + 1) * 2) + 2);
      sideLYlineL = (( correctorPi * (Math.PI * (Math.PI * Math.PI) - (Math.PI) ) + 30 - (Math.PI + Math.PI) - Math.PI) - Math.PI + 2);
      sideLZlineL = (( correctorPi * (Math.PI * Math.PI)) - 37);
      sideLXlineR = sideLXlineL, sideLYlineR = sideLYlineL, sideLZlineR = sideLZlineL };
    if(camera.position.x > 155) {
      midtopXlineR = (-corrector / (Math.PI * 20)) + 50;
      midtopYlineR = (-corrector / (Math.PI * 16)) + 58;
      midtopZlineR = (-corrector / (Math.PI * 20)) - 50;
      midbottomYlineR = 30, midbottomZlineR = -37 };
    /////////////////////////////////
    //far out correctors
    if(camera.position.x > 110  && camera.position.x < 170 ) { leftcorrector = 1 };
    if(camera.position.x < -110  && camera.position.x > -170 ) { rightcorrector = 1 };
    //=================================================
    // Geometry Drawing ///////////////////////////////
    //=================================================
    crosspointsgeometry = new THREE.Geometry(); // CROSS GEOMETRY STORAGE
    crosspointsgeometry.vertices.push(
      new THREE.Vector3( -30, -35, 95 ), new THREE.Vector3( -17, 55, -17 ),
      new THREE.Vector3( -57, 55, -17 ), new THREE.Vector3( -52, 71, -37 ),
        new THREE.Vector3( midtopXlineL, midtopYlineL, midtopZlineL ),
        new THREE.Vector3( midbottomXlineL, midbottomYlineL, midbottomZlineL ),
        new THREE.Vector3( midtopXlineL, midtopYlineL, midtopZlineL ),
      new THREE.Vector3( -52, 71, -37 ), new THREE.Vector3( -15, 71, -37 ),
      new THREE.Vector3( -10, 100, -72.5 ),
        new THREE.Vector3( toptopXlineL, toptopYlineL, toptopZlineL ),
        new THREE.Vector3( topbottomXlineL, topbottomYlineL, topbottomZlineL ),
        new THREE.Vector3( toptopXlineL, toptopYlineL, toptopZlineL ),
      new THREE.Vector3( -10, 100, -72.5 ), new THREE.Vector3( 10, 100, -72.5 ),
        new THREE.Vector3( toptopXlineR, toptopYlineR, toptopZlineR ),
        new THREE.Vector3( topbottomXlineR, topbottomYlineR, topbottomZlineR ),
        new THREE.Vector3( toptopXlineR, toptopYlineR, toptopZlineR ),
      new THREE.Vector3( 10, 100, -72.5 ), new THREE.Vector3( 15, 71, -37 ),
      new THREE.Vector3( 52, 71, -37 ),
        new THREE.Vector3( midtopXlineR, midtopYlineR, midtopZlineR ),
        new THREE.Vector3( midbottomXlineR, midbottomYlineR, midbottomZlineR ),
        new THREE.Vector3( midtopXlineR, midtopYlineR, midtopZlineR ),
      new THREE.Vector3( 52, 71, -37 ), new THREE.Vector3( 57, 55, -17 ),
      new THREE.Vector3( 17, 55, -17 ), new THREE.Vector3( 30, -35, 95 ),
        new THREE.Vector3( -30, -35, 95 ),
        new THREE.Vector3( botbotXlineL, botbotYlineL, botbotZlineL ),
        new THREE.Vector3( botbotXlineR, botbotYlineR, botbotZlineR ),
        new THREE.Vector3( 30, -35, 95 ),
      new THREE.Vector3(botXlineR, botYlineR, botZlineR ),
      new THREE.Vector3(topXlineR, topYlineR, topZlineR ),
        new THREE.Vector3( 17, 55, -17 ), new THREE.Vector3( 57, 55, -17 ),
        new THREE.Vector3( sideRXlineR, sideRYlineR, sideRZlineR ),
        new THREE.Vector3( sideRXlineL, sideRYlineL, sideRZlineL ),
          new THREE.Vector3( 17, 55, -17 ), new THREE.Vector3( 30, -35, 95 ),
          new THREE.Vector3( -30, -35, 95 ),
      new THREE.Vector3(botXlineL, botYlineL, botZlineL ),
      new THREE.Vector3(topXlineL, topYlineL, topZlineL ),
          new THREE.Vector3( -17, 55, -17 ), new THREE.Vector3( -57, 55, -17 ),
        new THREE.Vector3( sideLXlineR, sideLYlineR, sideLZlineR ),
        new THREE.Vector3( sideLXlineL, sideLYlineL, sideLZlineL ),
          new THREE.Vector3( -17, 55, -17 ), new THREE.Vector3( -30, -35, 95 ));
    /////////////////////////////////
    crosspoints = new MeshLine(), crosspoints.setGeometry( crosspointsgeometry );
    crosspointsmaterial = new MeshLineMaterial({ lineWidth: 0.7, color: crosscolour });
    scene.remove(crosspointsmesh);
    crosspointsmesh = new THREE.Mesh( crosspoints.geometry, crosspointsmaterial );
    scene.add( crosspointsmesh ), crosspointsmesh.geometry.verticesNeedUpdate = true;
    //=================================================
    // Glow Animation Drawing /////////////////////////
    //=================================================
    if(camera.position.x < 65 && camera.position.x > -65) {
      point16x = 30,  point16y = -35, point16z = 95, point1x = -30,  point1y = -35,  point1z = 95};
    //left side correctional fixes
    if(camera.position.x < -65){ point1x = point18x, point1y = point18y, point1z = point18z};
    if(camera.position.x < -170) { point4x = midtopXlineL, point4y = midtopYlineL, point4z = midtopZlineL
    } else { point4x = -57, point4y = 55, point4z = -17 };
    if(camera.position.x < -325) { point5x = point6x, point5y = point6y, point5z = point6z
    } else { point5x = -52, point5y = 71, point5z = -37};
    //right side correctional fixes
    if(camera.position.x > 65){ point16x = point17x, point16y = point17y, point16z = point17z };
    if(camera.position.x > 170) { point13x = midtopXlineR, point13y = midtopYlineR, point13z = midtopZlineR
    } else { point13x = 57, point13y = 55, point13z = -17 };
    if(camera.position.x > 325) { point12x = point11x, point12y = point11y, point12z = point11z
    } else { point12x = 52, point12y = 71, point12z = -37};
    /////////////////////////////////
    if(tock >= 0 && tock <= 92){ glowringani();
    } else { scene.remove(outerglowingmesh) };
    /////////////////////////////////
    //console.log(line6x, line6y, line6z);
    trackerX = camera.position.x;
    trackerY = camera.position.y;
    trackerZ = camera.position.Z;
    //console.log(camera.position.x, camera.position.z);
    renderer.render(scene, camera);
    camera.lookAt( scene.position ), camera.updateMatrixWorld();
    controls.update();
    update(), render() };
    //=================================================
    // Glow Animation Idle ////////////////////////////
    //=================================================
function glowringani() {
  point2x = sideLXlineL,      point2y = sideLYlineL,      point2z = sideLZlineL,
  point3x = sideLXlineR,      point3y = sideLYlineR,      point3z = sideLZlineR,
  point6x = topbottomXlineL,  point6y = topbottomYlineL,  point6z = topbottomZlineL,
  point7x = toptopXlineL,     point7y = toptopYlineL,     point7z = toptopZlineL,
  point10x = toptopXlineR,    point10y = toptopYlineR,    point10z = toptopZlineR,
  point11x = topbottomXlineR, point11y = topbottomYlineR, point11z = topbottomZlineR,
  point14x = sideRXlineR,     point14y = sideRYlineR,     point14z = sideRZlineR,
  point15x = sideRXlineL,     point15y = sideRYlineL,     point15z = sideRZlineL,
  point17x = botbotXlineR,    point17y = botbotYlineR,   point17z = botbotZlineR,
  point18x = botbotXlineL,    point18y = botbotYlineL,    point18z = botbotZlineL;
  /////////////////////////////////
  outerglowinggeometry = new THREE.Geometry(); // CROSS GEOMETRY STORAGE
  outerglowinggeometry.vertices.push(
    new THREE.Vector3( line1x, line1y, line1z ), new THREE.Vector3( line2x, line2y, line2z ),
    new THREE.Vector3( line3x, line3y, line3z ), new THREE.Vector3( line4x, line4y, line4z ),
    new THREE.Vector3( line5x, line5y, line5z ), new THREE.Vector3( line6x, line6y, line6z ),
    new THREE.Vector3( line7x, line7y, line7z ), new THREE.Vector3( line8x, line8y, line8z ));
  /////////////////////////////////
  if(glowloop <= startpoint0){
    line1x = point1x, line1y = point1y, line1z = point1z;
    line2x = point1x, line2y = point1y, line2z = point1z, line3x = point1x, line3y = point1y, line3z = point1z;
    line4x = point1x, line4y = point1y, line4z = point1z, line5x = point1x, line5y = point1y, line5z = point1z;
    line6x = point1x, line6y = point1y, line6z = point1z, line7x = point1x, line7y = point1y, line7z = point1z;
    line8x = ( point1x + ((-point1x - -point2x)/startpoint4) * (glowloop + startpoint4));
    line8y = ( point1y + ((-point1y - -point2y)/startpoint4) * (glowloop + startpoint4));
    line8z = ( point1z + ((-point1z - -point2z)/startpoint4) * (glowloop + startpoint4)) };
  if(glowloop > startpoint0 && glowloop <= startpoint4){
    line1x = ( point1x + ((-point1x - -point2x)/startpoint4) * glowloop);
    line1y = ( point1y + ((-point1y - -point2y)/startpoint4) * glowloop);
    line1z = ( point1z + ((-point1z - -point2z)/startpoint4) * glowloop) };
  if(glowloop > startpoint0 && glowloop <= startpoint1){
    line2x = point2x, line2y = point2y, line2z = point2z, line3x = point2x, line3y = point2y, line3z = point2z;
    line4x = point2x, line4y = point2y, line4z = point2z, line5x = point2x, line5y = point2y, line5z = point2z;
    line6x = point2x, line6y = point2y, line6z = point2z, line7x = point2x, line7y = point2y, line7z = point2z;
    line8x = ( point2x + ((-point2x - -point3x)/(startpoint1 - startpoint0)) * glowloop);
    line8y = ( point2y + ((-point2y - -point3y)/(startpoint1 - startpoint0)) * glowloop);
    line8z = ( point2z + ((-point2z - -point3z)/(startpoint1 - startpoint0)) * glowloop) };
  if(glowloop > startpoint1 && glowloop <= startpoint2){
    line2x = point2x, line2y = point2y, line2z = point2z, line3x = point3x, line3y = point3y, line3z = point3z;
    line4x = point3x, line4y = point3y, line4z = point3z, line5x = point3x, line5y = point3y, line5z = point3z;
    line6x = point3x, line6y = point3y, line6z = point3z, line7x = point3x, line7y = point3y, line7z = point3z;
    line8x = ( point3x + ((-point3x - -point4x)/(startpoint2 - startpoint1)) * (glowloop - startpoint1));
    line8y = ( point3y + ((-point3y - -point4y)/(startpoint2 - startpoint1)) * (glowloop - startpoint1));
    line8z = ( point3z + ((-point3z - -point4z)/(startpoint2 - startpoint1)) * (glowloop - startpoint1)) };
  if(glowloop > startpoint2 && glowloop <= startpoint3){
    line2x = point2x, line2y = point2y, line2z = point2z, line3x = point3x, line3y = point3y, line3z = point3z;
    line4x = point4x, line4y = point4y, line4z = point4z, line5x = point4x, line5y = point4y, line5z = point4z;
    line6x = point4x, line6y = point4y, line6z = point4z, line7x = point4x, line7y = point4y, line7z = point4z;
    line8x = ( point4x + ((-point4x - -point5x)/(startpoint3 - startpoint2)) * (glowloop - startpoint2));
    line8y = ( point4y + ((-point4y - -point5y)/(startpoint3 - startpoint2)) * (glowloop - startpoint2));
    line8z = ( point4z + ((-point4z - -point5z)/(startpoint3 - startpoint2)) * (glowloop - startpoint2)) };
  if(glowloop > startpoint3 && glowloop <= startpoint4){
    if(camera.position.x < -65){ if(glowloop > startpoint3 && glowloop <= (startpoint3 + denominator4)){
      line2x = point2x, line3y = point2y, line3z = point2z, line3x = point3x, line3y = point3y, line3z = point3z;
      line4x = point3x, line4y = point3y, line4z = point3z, line5x = point3x, line5y = point3y, line5z = point3z;
      line6x = point4x, line6y = point4y, line6z = point4z, line7x = point5x, line7y = point5y, line7z = point5z;
      line8x = ( point5x - ((-point6x - -point5x)/denominator4) * (glowloop - startpoint3));
      line8y = ( point5y - ((-point6y - -point5y)/denominator4) * (glowloop - startpoint3));
      line8z = ( point5z - ((-point6z - -point5z)/denominator4) * (glowloop - startpoint3));
    } else {
      line2x = point2x, line2y = point2y, line2z = point2z, line3x = point3x, line3y = point3y, line3z = point3z;
      line4x = point3x, line4y = point3y, line4z = point3z, line5x = point4x, line5y = point4y, line5z = point4z;
      line6x = point5x, line6y = point5y, line6z = point5z, line7x = point6x, line7y = point6y, line7z = point6z;
      line8x = ( point6x + ((-point6x - -point7x)/denominator2) * (glowloop - (startpoint3 + denominator4)));
      line8y = ( point6y + ((-point6y - -point7y)/denominator2) * (glowloop - (startpoint3 + denominator4)));
      line8z = ( point6z + ((-point6z - -point7z)/denominator2) * (glowloop - (startpoint3 + denominator4))) };
    } else {
      line2x = point2x, line2y = point2y, line2z = point2z, line3x = point3x, line3y = point3y, line3z = point3z;
      line4x = point4x, line4y = point4y, line4z = point4z, line5x = point5x, line5y = point5y, line5z = point5z;
      line6x = point5x, line6y = point5y, line6z = point5z, line7x = point5x, line7y = point5y, line7z = point5z;
      line8x = ( point5x + ((-point5x - -point6x)/(startpoint4 - startpoint3)) * (glowloop - startpoint3));
      line8y = ( point5y + ((-point5y - -point6y)/(startpoint4 - startpoint3)) * (glowloop - startpoint3));
      line8z = ( point5z + ((-point5z - -point6z)/(startpoint4 - startpoint3)) * (glowloop - startpoint3)) }};
  if(glowloop > startpoint4 && glowloop <= startpoint5){
    if(camera.position.x < -65){
      line1x = ( point2x + ((-point2x - -point3x)/(startpoint5 - startpoint4)) * (glowloop - startpoint4));
      line1y = ( point2y - ((-point2y - -point3y)/(startpoint5 - startpoint4)) * (glowloop - startpoint4));
      line1z = ( point2z - ((-point2z - -point3z)/(startpoint5 - startpoint4)) * (glowloop - startpoint4));
      line2x = point3x, line2y = point3y, line2z = point3z, line3x = point4x, line3y = point4y, line3z = point4z;
      line4x = point5x, line4y = point5y, line4z = point5z, line5x = point6x, line5y = point6y, line5z = point6z;
      line6x = point7x, line6y = point7y, line6z = point7z, line7x = point7x, line7y = point7y, line7z = point7z;
      line8x = ( point8x - ((-point8x - -point7x)/(startpoint5 - startpoint4)) * (glowloop - startpoint5));
      line8y = ( point8y - ((-point8y - -point7y)/(startpoint5 - startpoint4)) * (glowloop - startpoint5));
      line8z = ( point8z - ((-point8z - -point7z)/(startpoint5 - startpoint4)) * (glowloop - startpoint5))
      } else {
      line1x = ( point2x + ((-point2x - -point3x)/(startpoint5 - startpoint4)) * (glowloop - startpoint4));
      line1y = ( point2y - ((-point2y - -point3y)/(startpoint5 - startpoint4)) * (glowloop - startpoint4));
      line1z = ( point2z - ((-point2z - -point3z)/(startpoint5 - startpoint4)) * (glowloop - startpoint4));
      line2x = point3x, line2y = point3y, line2z = point3z, line3x = point4x, line3y = point4y, line3z = point4z;
      line4x = point5x, line4y = point5y, line4z = point5z, line5x = point6x, line5y = point6y, line5z = point6z;
      line6x = point5x, line6y = point5y, line6z = point5z, line7x = point6x, line7y = point6y, line7z = point6z;
      line8x = ( point8x - ((-point8x - -point6x)/(startpoint5 - startpoint4)) * (glowloop - startpoint5));
      line8y = ( point8y - ((-point8y - -point6y)/(startpoint5 - startpoint4)) * (glowloop - startpoint5));
      line8z = ( point8z - ((-point8z - -point6z)/(startpoint5 - startpoint4)) * (glowloop - startpoint5)) }};
  if(glowloop > startpoint5 && glowloop <= startpoint6){
    line1x = ( point3x - ((-point4x - -point3x)/(startpoint6 - startpoint5)) * (glowloop - startpoint5));
    line1y = ( point3y - ((-point4y - -point3y)/(startpoint6 - startpoint5)) * (glowloop - startpoint5));
    line1z = ( point3z - ((-point4z - -point3z)/(startpoint6 - startpoint5)) * (glowloop - startpoint5));
    line2x = point4x, line2y = point4y, line2z = point4z, line3x = point5x, line3y = point5y, line3z = point5z;
    line4x = point6x, line4y = point6y, line4z = point6z, line5x = point7x, line5y = point7y, line5z = point7z;
    line6x = point7x, line6y = point7y, line6z = point7z, line7x = point8x, line7y = point8y, line7z = point8z;
    line8x = ( point8x - ((-point9x - -point8x)/(startpoint6 - startpoint5)) * (glowloop - startpoint5));
    line8y = ( point8y - ((-point9y - -point8y)/(startpoint6 - startpoint5)) * (glowloop - startpoint5));
    line8z = ( point8z - ((-point9z - -point8z)/(startpoint6 - startpoint5)) * (glowloop - startpoint5)) };
  if(glowloop > startpoint6 && glowloop <= startpoint7){
    if(camera.position.x > 65){ // far back right line
      line1x = ( point4x - ((-point5x - -point4x)/(startpoint7 - startpoint6)) * (glowloop - startpoint6));
      line1y = ( point4y - ((-point5y - -point4y)/(startpoint7 - startpoint6)) * (glowloop - startpoint6));
      line1z = ( point4z - ((-point5z - -point4z)/(startpoint7 - startpoint6)) * (glowloop - startpoint6));
      line2x = point5x, line2y = point5y, line2z = point5z, line3x = point6x, line3y = point6y, line3z = point6z;
      line4x = point7x, line4y = point7y, line4z = point7z, line5x = point8x, line5y = point8y, line5z = point8z;
      line6x = point8x, line6y = point8y, line6z = point8z, line7x = point9x, line7y = point9y, line7z = point9z;
      line8x = ( point9x - ((-point10x - -point9x)/(startpoint7 - startpoint6)) * (glowloop - startpoint6));
      line8y = ( point9y - ((-point10y - -point9y)/(startpoint7 - startpoint6)) * (glowloop - startpoint6));
      line8z = ( point9z - ((-point10z - -point9z)/(startpoint7 - startpoint6)) * (glowloop - startpoint6));
    } else {
      line1x = ( point4x - ((-point5x - -point4x)/(startpoint7 - startpoint6)) * (glowloop - startpoint6));
      line1y = ( point4y - ((-point5y - -point4y)/(startpoint7 - startpoint6)) * (glowloop - startpoint6));
      line1z = ( point4z - ((-point5z - -point4z)/(startpoint7 - startpoint6)) * (glowloop - startpoint6));
      line2x = point5x, line2y = point5y, line2z = point5z, line3x = point6x, line3y = point6y, line3z = point6z;
      line4x = point7x, line4y = point7y, line4z = point7z, line5x = point7x, line5y = point7y, line5z = point7z;
      line6x = point8x, line6y = point8y, line6z = point8z, line7x = point9x, line7y = point9y, line7z = point9z;
      line8x = ( point9x - ((-point11x - -point9x)/(startpoint7 - startpoint6)) * (glowloop - startpoint6));
      line8y = ( point9y - ((-point11y - -point9y)/(startpoint7 - startpoint6)) * (glowloop - startpoint6));
      line8z = ( point9z - ((-point11z - -point9z)/(startpoint7 - startpoint6)) * (glowloop - startpoint6)) }};
  if(glowloop > startpoint7 && glowloop <= startpoint8){
    if(camera.position.x < 65 && camera.position.x > -65 ){ // optimised right side undercarrage
      line1x = ( point5x - ((-point6x - -point5x)/(startpoint8 - startpoint7)) * (glowloop - startpoint7));
      line1y = ( point5y - ((-point6y - -point5y)/(startpoint8 - startpoint7)) * (glowloop - startpoint7));
      line1z = ( point5z - ((-point6z - -point5z)/(startpoint8 - startpoint7)) * (glowloop - startpoint7));
      line2x = point6x, line2y = point6y, line2z = point6z, line3x = point7x, line3y = point7y, line3z = point7z;
      line4x = point8x, line4y = point8y, line4z = point8z, line5x = point9x, line5y = point9y, line5z = point9z;
      line6x = point10x, line6y = point10y, line6z = point10z, line7x = point11x, line7y = point11y, line7z = point11z;
      line8x = ( point11x - ((-point12x - -point11x)/(startpoint8 - startpoint7)) * (glowloop - startpoint7));
      line8y = ( point11y - ((-point12y - -point11y)/(startpoint8 - startpoint7)) * (glowloop - startpoint7));
      line8z = ( point11z - ((-point12z - -point11z)/(startpoint8 - startpoint7)) * (glowloop - startpoint7)) }
    if(camera.position.x > 65) { if(glowloop > startpoint7 && glowloop <= (startpoint7 + denominator2)) {
      line1x = ( point5x - ((-point6x - -point5x)/(startpoint8 - startpoint7)) * (glowloop - startpoint7));
      line1y = ( point5y - ((-point6y - -point5y)/(startpoint8 - startpoint7)) * (glowloop - startpoint7));
      line1z = ( point5z - ((-point6z - -point5z)/(startpoint8 - startpoint7)) * (glowloop - startpoint7));
      line2x = point6x, line2y = point6y, line2z = point6z, line3x = point7x, line3y = point7y, line3z = point7z;
      line4x = point8x, line4y = point8y, line4z = point8z, line5x = point9x, line5y = point9y, line5z = point9z;
      line6x = point10x, line6y = point10y, line6z = point10z, line7x = point10x, line7y = point10y, line7z = point10z;
      line8x = ( point10x - ((-point11x - -point10x)/(startpoint8 - startpoint7 - denominator4)) * (glowloop - startpoint7));
      line8y = ( point10y - ((-point11y - -point10y)/(startpoint8 - startpoint7 - denominator4)) * (glowloop - startpoint7));
      line8z = ( point10z - ((-point11z - -point10z)/(startpoint8 - startpoint7 - denominator4)) * (glowloop - startpoint7))
    } else {
      line1x = ( point5x - ((-point6x - -point5x)/(startpoint8 - startpoint7)) * (glowloop - startpoint7));
      line1y = ( point5y - ((-point6y - -point5y)/(startpoint8 - startpoint7)) * (glowloop - startpoint7));
      line1z = ( point5z - ((-point6z - -point5z)/(startpoint8 - startpoint7)) * (glowloop - startpoint7));
      line2x = point6x, line2y = point6y, line2z = point6z, line3x = point7x, line3y = point7y, line3z = point7z;
      line4x = point8x, line4y = point8y, line4z = point8z, line5x = point9x, line5y = point9y, line5z = point9z;
      line6x = point10x, line6y = point10y, line6z = point10z, line7x = point11x, line7y = point11y, line7z = point11z;
      line8x = ( point11x - ((-point12x - -point11x)/(startpoint8 - startpoint7 - denominator2)) * (glowloop - (startpoint7 + denominator2)));
      line8y = ( point11y - ((-point12y - -point11y)/(startpoint8 - startpoint7 - denominator2)) * (glowloop - (startpoint7 + denominator2)));
      line8z = ( point11z - ((-point12z - -point11z)/(startpoint8 - startpoint7 - denominator2)) * (glowloop - (startpoint7 + denominator2))) }};
    if(camera.position.x < -65) { if(glowloop > startpoint7 && glowloop <= (startpoint8 - denominator2)) {
      line1x = ( point5x - ((-point6x - -point5x)/(startpoint8 - startpoint7 - denominator2)) * (glowloop - startpoint7));
      line1y = ( point5y - ((-point6y - -point5y)/(startpoint8 - startpoint7 - denominator2)) * (glowloop - startpoint7));
      line1z = ( point5z - ((-point6z - -point5z)/(startpoint8 - startpoint7 - denominator2)) * (glowloop - startpoint7));
      line2x = point6x, line2y = point6y, line2z = point6z, line3x = point7x, line3y = point7y, line3z = point7z;
      line4x = point8x, line4y = point8y, line4z = point8z, line5x = point9x, line5y = point9y, line5z = point9z;
      line6x = point10x, line6y = point10y, line6z = point10z, line7x = point11x, line7y = point11y, line7z = point11z;
      line8x = ( point11x - ((-point12x - -point11x)/(startpoint8 - startpoint7)) * (glowloop - startpoint7));
      line8y = ( point11y - ((-point12y - -point11y)/(startpoint8 - startpoint7)) * (glowloop - startpoint7));
      line8z = ( point11z - ((-point12z - -point11z)/(startpoint8 - startpoint7)) * (glowloop - startpoint7))
    } else {
      line1x = ( point6x - ((-point7x - -point6x)/(startpoint8 - startpoint7 - denominator4)) * (glowloop - (startpoint8 - denominator2)));
      line1y = ( point6y - ((-point7y - -point6y)/(startpoint8 - startpoint7 - denominator4)) * (glowloop - (startpoint8 - denominator2)));
      line1z = ( point6z - ((-point7z - -point6z)/(startpoint8 - startpoint7 - denominator4)) * (glowloop - (startpoint8 - denominator2)));
      line2x = point7x, line2y = point7y, line2z = point7z, line3x = point8x, line3y = point8y, line3z = point8z;
      line4x = point9x, line4y = point9y, line4z = point9z, line5x = point10x, line5y = point10y, line5z = point10z;
      line6x = point11x, line6y = point11y, line6z = point11z, line7x = point11x, line7y = point11y, line7z = point11z;
      line8x = ( point11x - ((-point12x - -point11x)/(startpoint8 - startpoint7)) * (glowloop - startpoint7));
      line8y = ( point11y - ((-point12y - -point11y)/(startpoint8 - startpoint7)) * (glowloop - startpoint7));
      line8z = ( point11z - ((-point12z - -point11z)/(startpoint8 - startpoint7)) * (glowloop - startpoint7)) }}};
  if(glowloop > startpoint8 && glowloop <= startpoint9){
    if(camera.position.x > -65){
      line1x = ( point6x - ((-point7x - -point6x)/(startpoint9 - startpoint8)) * (glowloop - startpoint8));
      line1y = ( point6y - ((-point7y - -point6y)/(startpoint9 - startpoint8)) * (glowloop - startpoint8));
      line1z = ( point6z - ((-point7z - -point6z)/(startpoint9 - startpoint8)) * (glowloop - startpoint8));
      line2x = point8x, line2y = point8y, line2z = point8z, line3x = point9x, line3y = point9y, line3z = point9z;
      line4x = point10x, line4y = point10y, line4z = point10z, line5x = point11x, line5y = point11y, line5z = point11z;
      line6x = point12x, line6y = point12y, line6z = point12z, line7x = point12x, line7y = point12y, line7z = point12z;
      line8x = ( point12x - ((-point13x - -point12x)/(startpoint9 - startpoint8)) * (glowloop - startpoint8));
      line8y = ( point12y - ((-point13y - -point12y)/(startpoint9 - startpoint8)) * (glowloop - startpoint8));
      line8z = ( point12z - ((-point13z - -point12z)/(startpoint9 - startpoint8)) * (glowloop - startpoint8));
    } else {
      line1x = ( point7x - ((-point8x - -point7x)/(startpoint9 - startpoint8)) * (glowloop - startpoint8));
      line1y = ( point7y - ((-point8y - -point7y)/(startpoint9 - startpoint8)) * (glowloop - startpoint8));
      line1z = ( point7z - ((-point8z - -point7z)/(startpoint9 - startpoint8)) * (glowloop - startpoint8));
      line2x = point8x, line2y = point8y, line2z = point8z, line3x = point9x, line3y = point9y, line3z = point9z;
      line4x = point10x, line4y = point10y, line4z = point10z, line5x = point11x, line5y = point11y, line5z = point11z;
      line6x = point12x, line6y = point12y, line6z = point12z, line7x = point12x, line7y = point12y, line7z = point12z;
      line8x = ( point12x - ((-point13x - -point12x)/(startpoint9 - startpoint8)) * (glowloop - startpoint8));
      line8y = ( point12y - ((-point13y - -point12y)/(startpoint9 - startpoint8)) * (glowloop - startpoint8));
      line8z = ( point12z - ((-point13z - -point12z)/(startpoint9 - startpoint8)) * (glowloop - startpoint8))}};
  if(glowloop > startpoint9 && glowloop <= startpoint10){
    line1x = ( point8x + ((-point8x - -point9x)/(startpoint10 - startpoint9)) * (glowloop - startpoint9));
    line1y = ( point8y + ((-point8y - -point9y)/(startpoint10 - startpoint9)) * (glowloop - startpoint9));
    line1z = ( point8z + ((-point8z - -point9z)/(startpoint10 - startpoint9)) * (glowloop - startpoint9));
    line2x = point9x, line2y = point9y, line2z = point9z, line3x = point9x, line3y = point9y, line3z = point9z;
    line4x = point10x, line4y = point10y, line4z = point10z, line5x = point11x, line5y = point11y, line5z = point11z;
    line6x = point12x, line6y = point12y, line6z = point12z, line7x = point13x, line7y = point13y, line7z = point13z;
    line8x = ( point13x - ((-point14x - -point13x)/(startpoint10 - startpoint9)) * (glowloop - startpoint9));
    line8y = ( point13y - ((-point14y - -point13y)/(startpoint10 - startpoint9)) * (glowloop - startpoint9));
    line8z = ( point13z - ((-point14z - -point13z)/(startpoint10 - startpoint9)) * (glowloop - startpoint9)) };
  if(glowloop > startpoint10 && glowloop <= startpoint11){
    if(camera.position.x > 65){
      line1x = ( point9x + ((-point9x - -point10x)/(startpoint11 - startpoint10)) * (glowloop - startpoint10));
      line1y = ( point9y + ((-point9y - -point10y)/(startpoint11 - startpoint10)) * (glowloop - startpoint10));
      line1z = ( point9z + ((-point9z - -point10z)/(startpoint11 - startpoint10)) * (glowloop - startpoint10));
      line2x = point10x, line2y = point10y, line2z = point10z, line3x = point11x, line3y = point11y, line3z = point11z;
      line4x = point12x, line4y = point12y, line4z = point12z, line5x = point13x, line5y = point13y, line5z = point13z;
      line6x = point14x, line6y = point14y, line6z = point14z, line7x = point14x, line7y = point14y, line7z = point14z;
      line8x = ( point14x - ((-point15x - -point14x)/(startpoint11 - startpoint10)) * (glowloop - startpoint10));
      line8y = ( point14y - ((-point15y - -point14y)/(startpoint11 - startpoint10)) * (glowloop - startpoint10));
      line8z = ( point14z - ((-point15z - -point14z)/(startpoint11 - startpoint10)) * (glowloop - startpoint10));
    } else {
      line1x = ( point9x + ((-point9x - -point11x)/(startpoint11 - startpoint10)) * (glowloop - startpoint10));
      line1y = ( point9y + ((-point9y - -point11y)/(startpoint11 - startpoint10)) * (glowloop - startpoint10));
      line1z = ( point9z + ((-point9z - -point11z)/(startpoint11 - startpoint10)) * (glowloop - startpoint10));
      line2x = point11x, line2y = point11y, line2z = point11z, line3x = point12x, line3y = point12y, line3z = point12z;
      line4x = point13x, line4y = point13y, line4z = point13z, line5x = point14x, line5y = point14y, line5z = point14z;
      line6x = point14x, line6y = point14y, line6z = point14z, line7x = point14x, line7y = point14y, line7z = point14z;
      line8x = ( point14x - ((-point15x - -point14x)/(startpoint11 - startpoint10)) * (glowloop - startpoint10));
      line8y = ( point14y - ((-point15y - -point14y)/(startpoint11 - startpoint10)) * (glowloop - startpoint10));
      line8z = ( point14z - ((-point15z - -point14z)/(startpoint11 - startpoint10)) * (glowloop - startpoint10)) }};
  if(glowloop > startpoint11 && glowloop <= startpoint12){
    if(camera.position.x > 65){ if(glowloop > startpoint11 && glowloop <= (startpoint11 + denominator2)){
      line1x = ( point10x + ((-point10x - -point11x)/(startpoint12 - startpoint11 - denominator4)) * (glowloop - startpoint11));
      line1y = ( point10y + ((-point10y - -point11y)/(startpoint12 - startpoint11 - denominator4)) * (glowloop - startpoint11));
      line1z = ( point10z + ((-point10z - -point11z)/(startpoint12 - startpoint11 - denominator4)) * (glowloop - startpoint11));
      line2x = point11x, line2y = point11y, line2z = point11z, line3x = point12x, line3y = point12y, line3z = point12z;
      line4x = point13x, line4y = point13y, line4z = point13z, line5x = point14x, line5y = point14y, line5z = point14z;
      line6x = point15x, line6y = point15y, line6z = point15z, line7x = point15x, line7y = point15y, line7z = point15z;
    } else {
      line1x = ( point11x + ((-point11x - -point12x)/(startpoint12 - startpoint11 + denominator4)) * (glowloop - (startpoint11 + denominator4)));
      line1y = ( point11y + ((-point11y - -point12y)/(startpoint12 - startpoint11 + denominator4)) * (glowloop - (startpoint11 + denominator4)));
      line1z = ( point11z + ((-point11z - -point12z)/(startpoint12 - startpoint11 + denominator4)) * (glowloop - (startpoint11 + denominator4)));
      line2x = point12x, line2y = point12y, line2z = point12z, line3x = point12x, line3y = point12y, line3z = point12z;
      line4x = point13x, line4y = point13y, line4z = point13z, line5x = point14x, line5y = point14y, line5z = point14z;
      line6x = point15x, line6y = point15y, line6z = point15z, line7x = point15x, line7y = point15y, line7z = point15z };
  } else {
    line1x = ( point11x + ((-point11x - -point12x)/(startpoint12 - startpoint11)) * (glowloop - startpoint11));
    line1y = ( point11y + ((-point11y - -point12y)/(startpoint12 - startpoint11)) * (glowloop - startpoint11));
    line1z = ( point11z + ((-point11z - -point12z)/(startpoint12 - startpoint11)) * (glowloop - startpoint11));
    line2x = point12x, line2y = point12y, line2z = point12z, line3x = point12x, line3y = point12y, line3z = point12z;
    line4x = point13x, line4y = point13y, line4z = point13z, line5x = point14x, line5y = point14y, line5z = point14z;
    line6x = point15x, line6y = point15y, line6z = point15z, line7x = point15x, line7y = point15y, line7z = point15z }};
  if(glowloop > startpoint11 && glowloop <= startpoint15){
    line8x = ( point15x - ((-point16x - -point15x)/(startpoint15 - startpoint11)) * (glowloop - startpoint11));
    line8y = ( point15y - ((-point16y - -point15y)/(startpoint15 - startpoint11)) * (glowloop - startpoint11));
    line8z = ( point15z - ((-point16z - -point15z)/(startpoint15 - startpoint11)) * (glowloop - startpoint11)) };
  if(glowloop > startpoint12 && glowloop <= startpoint13){
    line1x = ( point12x + ((-point12x - -point13x)/(startpoint13 - startpoint12)) * (glowloop - startpoint12));
    line1y = ( point12y + ((-point12y - -point13y)/(startpoint13 - startpoint12)) * (glowloop - startpoint12));
    line1z = ( point12z + ((-point12z - -point13z)/(startpoint13 - startpoint12)) * (glowloop - startpoint12));
    line2x = point13x, line2y = point13y, line2z = point13z, line3x = point14x, line3y = point14y, line3z = point14z;
    line4x = point15x, line4y = point15y, line4z = point15z, line5x = point15x, line5y = point15y, line5z = point15z;
    line6x = point15x, line6y = point15y, line6z = point15z, line7x = point15x, line7y = point15y, line7z = point15z };
  if(glowloop > startpoint13 && glowloop <= startpoint14){
    line1x = ( point13x + ((-point13x - -point14x)/(startpoint14 - startpoint13)) * (glowloop - startpoint13));
    line1y = ( point13y + ((-point13y - -point14y)/(startpoint14 - startpoint13)) * (glowloop - startpoint13));
    line1z = ( point13z + ((-point13z - -point14z)/(startpoint14 - startpoint13)) * (glowloop - startpoint13));
    line2x = point14x, line2y = point14y, line2z = point14z, line3x = point15x, line3y = point15y, line3z = point15z;
    line4x = point15x, line4y = point15y, line4z = point15z, line5x = point15x, line5y = point15y, line5z = point15z;
    line6x = point15x, line6y = point15y, line6z = point15z, line7x = point15x, line7y = point15y, line7z = point15z };
  if(glowloop > startpoint14 && glowloop <= startpoint15){
    line1x = ( point14x + ((-point14x - -point15x)/(startpoint15 - startpoint14)) * (glowloop - startpoint14));
    line1y = ( point14y + ((-point14y - -point15y)/(startpoint15 - startpoint14)) * (glowloop - startpoint14));
    line1z = ( point14z + ((-point14z - -point15z)/(startpoint15 - startpoint14)) * (glowloop - startpoint14));
    line2x = point15x, line2y = point15y, line2z = point15z, line3x = point15x, line3y = point15y, line3z = point15z;
    line4x = point15x, line4y = point15y, line4z = point15z, line5x = point15x, line5y = point15y, line5z = point15z;
    line6x = point15x, line6y = point15y, line6z = point15z, line7x = point15x, line7y = point15y, line7z = point15z };
  if(glowloop > startpoint15 && glowloop <= startpoint19){
    line1x = ( point15x + ((-point15x - -point16x)/(startpoint18 - startpoint15)) * (glowloop - startpoint15));
    line1y = ( point15y + ((-point15y - -point16y)/(startpoint18 - startpoint15)) * (glowloop - startpoint15));
    line1z = ( point15z + ((-point15z - -point16z)/(startpoint18 - startpoint15)) * (glowloop - startpoint15)) };
  if(glowloop > startpoint15 && glowloop <= startpoint16){
    line2x = point16x, line2y = point16y, line2z = point16z, line3x = point16x, line3y = point16y, line3z = point16z;
    line4x = point16x, line4y = point16y, line4z = point16z, line5x = point16x, line5y = point16y, line5z = point16z;
    line6x = point16x, line6y = point16y, line6z = point16z, line7x = point16x, line7y = point16y, line7z = point16z };
  if(glowloop > startpoint16 && glowloop <= startpoint17){
    line2x = point16x, line2y = point16y, line2z = point16z, line3x = point17x, line3y = point17y, line3z = point17z;
    line4x = point17x, line4y = point17y, line4z = point17z, line5x = point17x, line5y = point17y, line5z = point17z;
    line6x = point17x, line6y = point17y, line6z = point17z, line7x = point17x, line7y = point17y, line7z = point17z };
  if(glowloop > startpoint17 && glowloop <= startpoint18){
    line2x = point16x, line2y = point16y, line2z = point16z, line3x = point17x, line3y = point17y, line3z = point17z;
    line4x = point17x, line4y = point17y, line4z = point17z, line5x = point17x, line5y = point17y, line5z = point17z;
    line6x = point17x, line6y = point17y, line6z = point17z, line7x = point18x, line7y = point18y, line7z = point18z };
  if(glowloop > startpoint15 && glowloop <= startpoint18){
    if(camera.position.x < 65 && camera.position.x > -65){
      if(glowloop > startpoint15 && glowloop <= startpoint16){
        line8x = ( point16x - ((-point17x - -point16x)/(startpoint16 - startpoint15)) * (glowloop - startpoint15));
        line8y = ( point16y - ((-point17y - -point16y)/(startpoint16 - startpoint15)) * (glowloop - startpoint15));
        line8z = ( point16z - ((-point17z - -point16z)/(startpoint16 - startpoint15)) * (glowloop - startpoint15)) };
      if(glowloop > startpoint16 && glowloop <= startpoint17){
        line8x = ( point17x - ((-point18x - -point17x)/(startpoint17 - startpoint16)) * (glowloop - startpoint16));
        line8y = ( point17y - ((-point18y - -point17y)/(startpoint17 - startpoint16)) * (glowloop - startpoint16));
        line8z = ( point17z - ((-point18z - -point17z)/(startpoint17 - startpoint16)) * (glowloop - startpoint16)) };
      if(glowloop > startpoint17 && glowloop <= startpoint18){
        line8x = ( point18x - ((-point1x - -point18x)/(startpoint18 - startpoint17)) * (glowloop - startpoint17));
        line8y = ( point18y - ((-point1y - -point18y)/(startpoint18 - startpoint17)) * (glowloop - startpoint17));
        line8z = ( point18z - ((-point1z - -point18z)/(startpoint18 - startpoint17)) * (glowloop - startpoint17)) }};
    if(camera.position.x < -65){
      if(glowloop > startpoint15 && glowloop <= (startpoint16 + denominator3)){
        line7x = point16x, line7y = point16y, line7z = point16z
        line8x = ( point16x - ((-point17x - -point16x)/(startpoint17 - (startpoint15 + denominator3))) * (glowloop - startpoint15));
        line8y = ( point16y - ((-point17y - -point16y)/(startpoint17 - (startpoint15 + denominator3))) * (glowloop - startpoint15));
        line8z = ( point16z - ((-point17z - -point16z)/(startpoint17 - (startpoint15 + denominator3))) * (glowloop - startpoint15)) };
      if(glowloop > (startpoint16 + denominator3) && glowloop <= startpoint18){
        line7x = point17x, line7y = point17y, line7z = point17z
        line8x = ( point17x - ((-point18x - -point17x)/(startpoint18 - (startpoint17 - denominator3))) * (glowloop - (startpoint16 + denominator3)));
        line8y = ( point17y - ((-point18y - -point17y)/(startpoint18 - (startpoint17 - denominator3))) * (glowloop - (startpoint16 + denominator3)));
        line8z = ( point17z - ((-point18z - -point17z)/(startpoint18 - (startpoint17 - denominator3))) * (glowloop - (startpoint16 + denominator3))) }};
    if(camera.position.x > 65){
      if(glowloop > startpoint15 && glowloop <= (startpoint16 + denominator3)){
        line7x = point17x, line7y = point17y, line7z = point17z
        line8x = ( point17x - ((-point18x - -point17x)/(startpoint17 - (startpoint15 + denominator3))) * (glowloop - startpoint15));
        line8y = ( point17y - ((-point18y - -point17y)/(startpoint17 - (startpoint15 + denominator3))) * (glowloop - startpoint15));
        line8z = ( point17z - ((-point18z - -point17z)/(startpoint17 - (startpoint15 + denominator3))) * (glowloop - startpoint15)) };
      if(glowloop > (startpoint16 + denominator3) && glowloop <= startpoint18){
        line7x = point18x, line7y = point18y, line7z = point18z
        line8x = ( point18x - ((-point1x - -point18x)/(startpoint18 - (startpoint17 - denominator3))) * (glowloop - (startpoint16 + denominator3)));
        line8y = ( point18y - ((-point1y - -point18y)/(startpoint18 - (startpoint17 - denominator3))) * (glowloop - (startpoint16 + denominator3)));
        line8z = ( point18z - ((-point1z - -point18z)/(startpoint18 - (startpoint17 - denominator3))) * (glowloop - (startpoint16 + denominator3))) }};
  if( glowloop >= 107.7 && glowloop <= startpoint18){ status = 1, glowloopreset = 1 }};
  if(glowloopreset == 1){
    if( glowloop <= 0 ){
      if(camera.position.x < 65 && camera.position.x > -65){
        if(glowloop > -startpointpre24 && glowloop <= -startpointpre16){
          line1x = ( point16x + ((-point16x - -point17x)/startpointpre8) * (glowloop - -startpointpre24));
          line1y = ( point16y + ((-point16y - -point17y)/startpointpre8) * (glowloop - -startpointpre24));
          line1z = ( point16z + ((-point16z - -point17z)/startpointpre8) * (glowloop - -startpointpre24))
          line2x = point17x, line2y = point17y, line2z = point17z, line3x = point18x, line3y = point18y, line3z = point18z;
          line4x = point18x, line4y = point18y, line4z = point18z, line5x = point18x, line5y = point18y, line5z = point18z;
          line6x = point18x, line6y = point18y, line6z = point18z, line7x = point1x, line7y = point1y, line7z = point1z };
        if(glowloop > -startpointpre16 && glowloop <= -startpointpre8){
          line1x = ( point17x + ((-point17x - -point18x)/startpointpre8) * (glowloop - -startpointpre16));
          line1y = ( point17y + ((-point17y - -point18y)/startpointpre8) * (glowloop - -startpointpre16));
          line1z = ( point17z + ((-point17z - -point18z)/startpointpre8) * (glowloop - -startpointpre16))
          line2x = point18x, line2y = point18y, line2z = point18z, line3x = point18x, line3y = point18y, line3z = point18z;
          line4x = point18x, line4y = point18y, line4z = point18z, line5x = point18x, line5y = point18y, line5z = point18z;
          line6x = point18x, line6y = point18y, line6z = point18z, line7x = point1x, line7y = point1y, line7z = point1z };
        if(glowloop > -startpointpre8 && glowloop <= 0){
          line1x = ( point18x + ((-point18x - -point1x)/startpointpre8) * (glowloop - -startpointpre8));
          line1y = ( point18y + ((-point18y - -point1y)/startpointpre8) * (glowloop - -startpointpre8));
          line1z = ( point18z + ((-point18z - -point1z)/startpointpre8) * (glowloop - -startpointpre8))
          line2x = point1x, line2y = point1y, line2z = point1z, line3x = point1x, line3y = point1y, line3z = point1z;
          line4x = point1x, line4y = point1y, line4z = point1z, line5x = point1x, line5y = point1y, line5z = point1z;
          line6x = point1x, line6y = point1y, line6z = point1z, line7x = point1x, line7y = point1y, line7z = point1z }};
      if(camera.position.x < -65){
        if(glowloop > -startpointpre24 && glowloop <= -startpointpre12){
          line1x = ( point16x + ((-point16x - -point17x)/startpointpre12) * (glowloop - -startpointpre24));
          line1y = ( point16y + ((-point16y - -point17y)/startpointpre12) * (glowloop - -startpointpre24));
          line1z = ( point16z + ((-point16z - -point17z)/startpointpre12) * (glowloop - -startpointpre24))
          line2x = point17x, line2y = point17y, line2z = point17z, line3x = point18x, line3y = point18y, line3z = point18z;
          line4x = point18x, line4y = point18y, line4z = point18z, line5x = point18x, line5y = point18y, line5z = point18z;
          line6x = point18x, line6y = point18y, line6z = point18z, line7x = point1x, line7y = point1y, line7z = point1z };
        if(glowloop > -startpointpre12 && glowloop <= 0){
          line1x = ( point17x + ((-point17x - -point18x)/startpointpre12) * (glowloop - -startpointpre12));
          line1y = ( point17y + ((-point17y - -point18y)/startpointpre12) * (glowloop - -startpointpre12));
          line1z = ( point17z + ((-point17z - -point18z)/startpointpre12) * (glowloop - -startpointpre12))
          line2x = point18x, line2y = point18y, line2z = point18z, line3x = point18x, line3y = point18y, line3z = point18z;
          line4x = point18x, line4y = point18y, line4z = point18z, line5x = point18x, line5y = point18y, line5z = point18z;
          line6x = point18x, line6y = point18y, line6z = point18z, line7x = point1x, line7y = point1y, line7z = point1z }};
      if(camera.position.x > 65){
        if(glowloop > -startpointpre24 && glowloop <= -startpointpre12){
          line1x = ( point17x + ((-point17x - -point18x)/startpointpre12) * (glowloop - -startpointpre24));
          line1y = ( point17y + ((-point17y - -point18y)/startpointpre12) * (glowloop - -startpointpre24));
          line1z = ( point17z + ((-point17z - -point18z)/startpointpre12) * (glowloop - -startpointpre24))
          line2x = point18x, line2y = point18y, line2z = point18z, line3x = point18x, line3y = point18y, line3z = point18z;
          line4x = point18x, line4y = point18y, line4z = point18z, line5x = point18x, line5y = point18y, line5z = point18z;
          line6x = point18x, line6y = point18y, line6z = point18z, line7x = point1x, line7y = point1y, line7z = point1z };
        if(glowloop > -startpointpre12 && glowloop <= 0){
          line1x = ( point18x + ((-point18x - -point1x)/startpointpre12) * (glowloop - -startpointpre12));
          line1y = ( point18y + ((-point18y - -point1y)/startpointpre12) * (glowloop - -startpointpre12));
          line1z = ( point18z + ((-point18z - -point1z)/startpointpre12) * (glowloop - -startpointpre12))
          line2x = point1x, line2y = point1y, line2z = point1z, line3x = point1x, line3y = point1y, line3z = point1z;
          line4x = point1x, line4y = point1y, line4z = point1z, line5x = point1x, line5y = point1y, line5z = point1z;
          line6x = point1x, line6y = point1y, line6z = point1z, line7x = point1x, line7y = point1y, line7z = point1z }
        if(glowloop > -0.5){ status = 0 }}}};
  //console.log( glowloop, glowloopreset);
  /////////////////////////////////
  outerglowingpoints = new MeshLine(), outerglowingpoints.setGeometry( outerglowinggeometry );
  outerglowingmaterial = new MeshLineMaterial({ lineWidth: 2.5, color: crosscolour });
  scene.remove(outerglowingmesh);
  outerglowingmesh = new THREE.Mesh( outerglowingpoints.geometry, outerglowingmaterial );
  scene.add( outerglowingmesh ), outerglowingmesh.geometry.verticesNeedUpdate = true };
  //=================================================
  // Background Math ////////////////////////////////
  //=================================================
function update() { // start
  glowloop += (beatspersecond / 60 / 100) * 1;
  if ( status == 1){ glowloop = (glowloop - glowloop) - 24, status = 0};
  //glowloop = tock
  if(clock.elapsedTime < 240){ if(currentbeat == tock){
      ticker = clock.elapsedTime * (beatspersecond / 60); // bpm calculation
      currentbeat = Math.round(ticker); // rounds off the current beat based on time
    } else { tock = tock + 1, console.log("Current Beat:", tock)}};
  clock.getDelta()};
  //=================================================
  // FINAL FINAL rendering //////////////////////////
  //=================================================
function render(){ // start
} // FUNCTION Render END
