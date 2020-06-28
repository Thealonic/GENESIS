
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
var renderer, scene, camera;  //scene generation
var orbitalControl = new THREE.OrbitControls(camera, renderer);
var controls = new THREE.OrbitControls( camera, renderer);
    controls.addEventListener( 'change', render );
/////////////////////////////////
var beatspersecond = 117;
var currentbeat = 0, ticker = 0, tock = 0;
var currentbeat1 = 0, tickertick = 0, tick = 0;
var clock = new THREE.Clock;
var corrector, trackerX, trackerY, trackerZ;
/////////////////////////////////
    // basic geometry storage //
var crosspointsgeometry, crosspoints, crosspointsmaterial, crosspointsmesh;
var outerglowinggeometry, outerglowingpoints, outerglowingmaterial, outerglowingmesh;
/////////////////////////////////
    // correctional variable adjustments //
var topXlineR =  17,  topXlineL = -17, topYlineR =  55,  topYlineL =  55,
    topZlineR = -17,  topZlineL = -17, botXlineR =  30,  botXlineL = 30,
    botYlineR = -35,  botYlineL = -35, botZlineR =  95,  botZlineL =  95;
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
    // additional toggles and storage //
var rightcorrector = 0, leftcorrector = 0, i = 0, crossstatus = 0;
var crossloop = [], crossobj, crosscolour = 0xdf1000, diff = 0, fps = 0
/////////////////////////////////
var line1x = 0, line1y = 0, line1z = 0, line2x = 0, line2y = 0, line2z = 0,
    line3x = 0, line3y = 0, line3z = 0, line4x = 0, line4y = 0, line4z = 0,
    line5x = 0, line5y = 0, line5z = 0, line6x = 0, line6y = 0, line6z = 0,
    line7x = 0, line7y = 0, line7z = 0, line8x = 0, line8y = 0, line8z = 0;
/////////////////////////////////
    // geometry position storage //
var point1x = -30, point1y = -35, point1z = 95,
    point2x = sideLXlineL, point2y = sideLYlineL, point2z = sideLZlineL,
    point3x = sideLXlineR, point3y = sideLYlineR, point3z = sideLZlineR,
    point4x = -57, point4y = 55, point4z = -17,
    point5x = -52, point5y = 71, point5z = -37,
    point6x = topbottomXlineL, point6y = topbottomYlineL, point6z = topbottomZlineL,
    point7x = toptopXlineL, point7y = toptopYlineL, point7z = toptopZlineL,
    point8x = -10, point8y = 100, point8z = -72.5,
    point9x = 10, point9y = 100, point9z = -72.5,
    point10x = toptopXlineR, point10y = toptopYlineR, point10z = toptopZlineR,
    point11x = topbottomXlineR, point11y = topbottomYlineR, point11z = topbottomZlineR,
    point12x = 52, point12y = 71, point12z = -37,
    point13x = 57, point13y = 55, point13z = -17,
    point14x = sideRXlineR, point14y = sideRYlineR, point14z = sideRZlineR;
    point15x = sideRXlineL, point15y = sideRYlineL, point15z = sideRZlineL,
    point16x = 30, point16y = -35, point16z = 95,
    point17x = botbotXlineR, point17y = botbotYlineR, point17z = botbotZlineR,
    point18x = botbotXlineL, point18y = botbotYlineL, point18z = botbotZlineL;
var glowinggeometry, glowingpoints, glowingmaterial, glowingmesh;
var glowloop = 0, glowloopreset = 0, status = 0, multiplier = 1, staticglow = 0;
/////////////////////////////////
var     crosstrigX = 0.625 / 4,         crosstrigY = 4.21875 / 4,       crosstrigZ = 5.234375 / 4; // trig for vertical
var crosssidetrigX = 0.35714285714, crosssidetrigY = 1.71428571429, crosssidetrigZ = 1.42857142857; // trig for horizontal
var scanline = 0.55, statusidle = 0, loopbuffer = 0, loopbufferR = 0, loopbufferL = 0, scanlinetoggle = 0;
var timerloop1, finaldelaytime, delaytimer
/////////////////////////////////
var lineMmesh = [], lineMpoints = [], lineMgeometry = [];
var lineRmesh = [], lineRpoints = [], lineRgeometry = [];
var lineLmesh = [], lineLpoints = [], lineLgeometry = [];
var lineBmesh = [], lineBpoints = [], lineBgeometry = [];
var denominatorR = 24, denominatorL = 24;
var i = 0, ic = i - 25, sri = 0, sric = sri - 25, bm = 24, bmi = bm + 24;
var linematerial = new MeshLineMaterial({ lineWidth: scanline, color: crosscolour });
var linematerial2 = new MeshLineMaterial({ lineWidth: 0.79, color: crosscolour });
/////////////////////////////////
var apple = 0, banana = 0, grape = 0, pear = 0, lime = 0, kiwi = 0;
var section1start = 0, section2start = 20;
/////////////////////////////////
var arraygeometry = new THREE.BoxGeometry( 1200/20, 2200/20 , 0.00000000000000000000001 );
var arraymaterial = [], array = [], granite = 1;
    arraymaterial[1] = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("test.png"), transparent: true }), //1
    arraymaterial[2] = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("test.png"), transparent: true }), //2
    arraymaterial[3] = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("test.png"), transparent: true }), //3
    arraymaterial[4] = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("test.png"), transparent: true }), //4
    arraymaterial[5] = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("test.png"), transparent: true }), //5
    arraymaterial[6] = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("test.png"), transparent: true }), //6
    arraymaterial[7] = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("test.png"), transparent: true }), //7
    arraymaterial[8] = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("test.png"), transparent: true }), //8
    arraymaterial[9] = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("test.png"), transparent: true }), //9
    arraymaterial[10] = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("test.png"), transparent: true }), //10
    arraymaterial[11] = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("test.png"), transparent: true }), //1
    arraymaterial[12] = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("test.png"), transparent: true }), //2
    arraymaterial[13] = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("test.png"), transparent: true }), //3
    arraymaterial[14] = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("test.png"), transparent: true }), //4
    arraymaterial[15] = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("test.png"), transparent: true }), //5
    arraymaterial[16] = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("test.png"), transparent: true }), //6
    arraymaterial[17] = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("test.png"), transparent: true }), //7
    arraymaterial[18] = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("test.png"), transparent: true }), //8
    arraymaterial[19] = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("test.png"), transparent: true }), //9
    arraymaterial[20] = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("test.png"), transparent: true }); //10
init(), animate();
//==================================================
//  SETUP creation /////////////////////////////////
//==================================================
function init() {
  renderer = new THREE.WebGLRenderer;
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('ThreeJS').appendChild(renderer.domElement);
  //scene setup
  scene = new THREE.Scene(), camera;
  var W = window.innerWidth, H = window.innerHeight;
  camera = new THREE.PerspectiveCamera(45, W/H, 0.1, 1000);
  camera.position.set(0, 0, 400), camera.up = new THREE.Vector3(0,500,0);
  //controls setup
  controls = new THREE.OrbitControls(camera, renderer.domElement);                                     // centeralising the camera
  controls.target = new THREE.Vector3(500, 200, 500);                             // controls
  controls.addEventListener('change', render), scene.add(camera);
	controls.enablePan = false, controls.enableDamping = false;
  controls.minPolarAngle = Math.PI / 2 , controls.maxPolarAngle = Math.PI / 2 ;
  controls.minAzimuthAngle = -Math.PI * 0.5, controls.maxAzimuthAngle = Math.PI * 0.5;
	controls.minDistance = 410, controls.maxDistance = 410;
  controls.addEventListener("change", () => {
  if (this.renderer) this.renderer.render(this.scene, camera)});
  //=================================================
  // SCENE res and adjustment ///////////////////////
  //=================================================
  var gridXZ = new THREE.GridHelper(250,  25);
  gridXZ.position.set(0, -100, 0), gridXZ.setColors( new THREE.Color(0xff0000),
  new THREE.Color(0xffffff) ); //scene.add(gridXZ)
  /////////////////////////////////
  document.body.appendChild(renderer.domElement)};
  //=================================================
  // aspect rendering ///////////////////////////////
  //=================================================
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight)};
function animate() {
  corrector = camera.position.x, correctorPi = camera.rotation.y;
  requestAnimationFrame( animate );
  //=================================================
  // Variable Storage ///////////////////////////////
  //=================================================
  if(granite < 20){ array[granite] = new THREE.Mesh(arraygeometry, arraymaterial[granite]);
  array[granite].position.set(-0.3, 29, 14.9), array[granite].rotation.set(-70.01, 0, 0);
  array[granite].scale.set(1.95, 2.15, 3), scene.add(array[granite]);
  granite = granite + 1 }
  if(leftcorrector == 1){ leftcorrector = 0
    sideLXlineL = -52,   sideLYlineL = 30,  sideLZlineL = -37;
    sideLXlineR = -52,   sideLYlineR = 30,  sideLZlineR = -37}
  if(rightcorrector == 1){ rightcorrector = 0
    sideRXlineL =  52,   sideRYlineL = 30,  sideRZlineL = -37;
    sideRXlineR =  52,   sideRYlineR = 30,  sideRZlineR = -37}
  ///////////////////////////////// side panel geometry drawing
  if(camera.position.x < -65) { // camera going left
    topXlineL = -15, topYlineL =  30, topZlineL = -37; //box drawing
    topbottomXlineL = -10, topbottomYlineL = 100, topbottomZlineL = -72.5;
    botXlineL = (corrector / (Math.PI * 4)) - 22, botYlineL = -63, botZlineL =  75; //side bottom LEFT
    sideLXlineL = -15; //tight bottom left corner lock
    botbotXlineL = (corrector / (Math.PI * 4)) - 22; // continuation of (ABL)
    sideRXlineL = (-corrector / (Math.PI * 1.95)) + 22.9; // continuation of (TBR)
    toptopYlineL = (corrector / 50) + 86; // topback line vertical
    toptopXlineL = (corrector / (Math.PI * 12)) - 9;
    topbottomYlineL = (-corrector / 85) + 75.5; //topbackbottom line vertical
    topbottomXlineL = (corrector / (Math.PI * 20)) - 11
    if(camera.position.x < -325) {
      toptopXlineL = (corrector / (Math.PI * 12)) - 11;
      toptopYlineL = (corrector / 40) + 83; // topback line vertical
      toptopZlineL = (corrector / (Math.PI * 2.5)) - 30;
      topbottomXlineL = (corrector / (Math.PI * 20)) - 18;
      topbottomYlineL = (corrector / 5) + 137; // topback line vertical
      topbottomZlineL = (-corrector / (Math.PI * 3.8)) - 95 }};
  if(camera.position.x < -170) {
    sideRXlineR = ( -correctorPi * (Math.PI * (Math.PI * Math.PI) - (Math.PI + Math.PI) ) + 51.5 - ((Math.PI + Math.PI + 1) * 2) + 2);
    sideRYlineR = (( -correctorPi * (Math.PI * (Math.PI * Math.PI) - (Math.PI) ) + 28.5 - (Math.PI + Math.PI) - Math.PI) - Math.PI + 2);
    sideRZlineR = (( -correctorPi * (Math.PI * Math.PI)) - 36);
    sideRXlineL = sideRXlineR, sideRYlineL = sideRYlineR, sideRZlineL = sideRZlineR };
  if(camera.position.x < -155) {
    midtopXlineL = (-corrector / (Math.PI * 20)) - 50;
    midtopYlineL = (corrector / (Math.PI * 16)) + 58;
    midtopZlineL = (corrector / (Math.PI * 20)) - 50;
    midbottomYlineL = 30, midbottomZlineL = -37 };
  if(camera.position.x > -57) { botbotXlineL = (corrector / (Math.PI * 4)) - 22}; //(ABL)
  if(camera.position.x > -53 && camera.position.x < -170){
    sideRXlineL =- (corrector / (Math.PI * 1.94)) + 23 };
  /////////////////////////////////
  if(camera.position.x < 65 && camera.position.x > -65) {
    topXlineR =  17, topYlineR =  55, topZlineR = -17;    //top tight right side pannel
    botXlineR =  30, botYlineR = -35, botZlineR =  95;    //bottom right right side pannel
    topXlineL = -17, topYlineL =  55, topZlineL = -17;    //top tight left side pannel
    botXlineL = -30, botYlineL = -35, botZlineL =  95;    //bottom tight left side pannel
    toptopYlineR = 100, toptopYlineL = 100;
    toptopXlineR = 10,  toptopXlineL = -10;
    topbottomXlineR = 15, topbottomYlineR = 71, topbottomZlineR = -37;
    topbottomXlineL = -15, topbottomYlineL = 71, topbottomZlineL = -37,
    sideRXlineL = (-corrector / (Math.PI * 1.96)) + 25; //(TBR)
    sideLXlineL = (-corrector / (Math.PI * 1.96)) - 25 };//(TBL)
    if(camera.position.x < 5 && camera.position.x > -65 ){
      sideRXlineL = (-corrector / (Math.PI * 1.97)) + 24 };//(TBL)
    if(camera.position.x > -5 && camera.position.x < 65 ){
      sideLXlineL = (-corrector / (Math.PI * 1.97)) - 24 };//(TBL)
  /////////////////////////////////
  if(camera.position.x > -155 && camera.position.x < 155){
    midtopXlineR = 52, midtopYlineR = 71, midtopZlineR = -37;
    midtopXlineL = -52, midtopYlineL = 71, midtopZlineL = -37;
    midbottomXlineR = 52, midbottomYlineR = 71, midbottomZlineR = -37;
    midbottomXlineL = -52, midbottomYlineL = 71, midbottomZlineL = -37;
    sideRXlineR =  52,   sideRYlineR = 30,  sideRZlineR = -37 };
  if(camera.position.x < 57 && camera.position.x > -57) {
    botbotXlineR = (corrector / (Math.PI * 4)) + 22;
    botbotXlineL = (corrector / (Math.PI * 4)) - 22};
  /////////////////////////////////
  if(camera.position.x < 57) { botbotXlineR = (corrector / (Math.PI * 4)) + 22};  //(ABR)
  if(camera.position.x > 65) { // camera going right
    topXlineR = 15, topYlineR =  30, topZlineR = -37; //box drawing
    topbottomXlineR = 10, topbottomYlineR = 100, topbottomZlineR = -72.5;
    botXlineR = (corrector / (Math.PI * 4)) + 22, botYlineR = -63, botZlineR =  75; //side bottom right
    sideRXlineL = 15; //tight bottom right corner lock
    botbotXlineR = (corrector / (Math.PI * 4)) + 22; // continuation of (ABR)
    sideLXlineL = (-corrector / (Math.PI * 1.94)) - 22.9; // continuation of (TBL)
    toptopYlineR = (-corrector / 50) + 86; // topback line vertical
    toptopXlineR = (corrector / (Math.PI * 12)) + 9;
    topbottomYlineR = (corrector / 85) + 75.5; //topbackbottom line vertical
    topbottomXlineR = (corrector / (Math.PI * 18)) + 11
    if(camera.position.x > 325) {
      toptopXlineR = (corrector / (Math.PI * 12)) + 11;
      toptopYlineR = (-corrector / 40) + 83; // topback line vertical
      toptopZlineR = -(corrector / (Math.PI * 2.5)) - 30;
      topbottomXlineR = (corrector / (Math.PI * 20)) + 18;
      topbottomYlineR = -(corrector / 5) + 137; // topback line vertical
      topbottomZlineR = (corrector / (Math.PI * 3.8)) - 95 }};
  if(camera.position.x > 170) {
    sideLXlineL = -( correctorPi * (Math.PI * (Math.PI * Math.PI) - (Math.PI + Math.PI) ) + 51.5 - ((Math.PI + Math.PI + 1) * 2) + 2);
    sideLYlineL = (( correctorPi * (Math.PI * (Math.PI * Math.PI) - (Math.PI) ) + 28.5 - (Math.PI + Math.PI) - Math.PI) - Math.PI + 2);
    sideLZlineL = (( correctorPi * (Math.PI * Math.PI)) - 36);
    sideLXlineR = sideLXlineL, sideLYlineR = sideLYlineL, sideLZlineR = sideLZlineL }
  point3x = sideLXlineR // quick bold lines patch
  if(camera.position.x > 155) {
    midtopXlineR = (-corrector / (Math.PI * 20)) + 50;
    midtopYlineR = (-corrector / (Math.PI * 16)) + 58;
    midtopZlineR = (-corrector / (Math.PI * 20)) - 50;
    midbottomYlineR = 30, midbottomZlineR = -37 };
  if(camera.position.x > 57) { botbotXlineL = (corrector / (Math.PI * 4)) - 22}; //(ABL)
  if(camera.position.x > 53 && camera.position.x < 170){
    sideLXlineL =- -(-corrector / (Math.PI * 1.94)) - 23 };
  ///////////////////////////////// Additional geometry patches
  if(camera.position.x > 110  && camera.position.x < 170 ) { leftcorrector = 1 };
  if(camera.position.x < -110  && camera.position.x > -170 ) { rightcorrector = 1 };
  //=================================================
  // Glow Animation var correction 2////////////////
  //=================================================
  // additional corrections relying on delay
  if(camera.position.x < 65 && camera.position.x > -65) { point16x = 30,  point16y = -35, point16z = 95, point1x = -30,  point1y = -35,  point1z = 95};
  //left side correctional fixes
  if(camera.position.x < -65){ point1x = point18x, point1y = point18y, point1z = point18z};
  if(camera.position.x < -170) { point4x = midtopXlineL, point4y = midtopYlineL, point4z = midtopZlineL } else { point4x = -57, point4y = 55, point4z = -17 };
  if(camera.position.x < -325) { point5x = point6x, point5y = point6y, point5z = point6z } else { point5x = -52, point5y = 71, point5z = -37};
  //right side correctional fixes
  if(camera.position.x > 65){ point16x = point17x, point16y = point17y, point16z = point17z };
  if(camera.position.x > 170) { point13x = midtopXlineR, point13y = midtopYlineR, point13z = midtopZlineR } else { point13x = 57, point13y = 55, point13z = -17 };
  if(camera.position.x > 325) { point12x = point11x, point12y = point11y, point12z = point11z } else { point12x = 52, point12y = 71, point12z = -37 };
  //=================================================
  // BPM Animation Calling //////////////////////////
  //=================================================
  //required setup function calls;
  glowstatic();
  basiccrossani();
  timerloop1 = 1 / 4 // speed of the animation
  finaldelaytime = 0 // adjusts the delay at the end of the animation
  delaytimer = 50
  /////////////////////////////////
  if ( tock > 0 && tock < 12){
    if (i <= 128 + delaytimer + 24 + finaldelaytime){ i = i + timerloop1 , ic = i - ( delaytimer ) // change this for different rendering techniques
      if (i <= 128 + delaytimer){ scene.remove(lineMmesh[ic]); // 28 - 42 < widened lines
        if (i <= 128){

          if (i >= 28.5 && i <= 42.25){ lineMgeometry[i] = new THREE.Geometry(), lineMgeometry[i].vertices.push(
            new THREE.Vector3((-42 - (crosssidetrigX * i)), (104 - (crosstrigY * i) - ((crosstrigY * i)/10)), (-77.2 + (crosssidetrigZ * i))),
            new THREE.Vector3(( 42 + (crosssidetrigX * i)), (104 - (crosstrigY * i) - ((crosstrigY * i)/10)), (-77.2 + (crosssidetrigZ * i))));
            lineMpoints[i] = new MeshLine(), lineMpoints[i].setGeometry( lineMgeometry[i] ); //b
          } else { lineMgeometry[i] = new THREE.Geometry(), lineMgeometry[i].vertices.push(
              new THREE.Vector3((-10 - (crosstrigX * i)), (100 - (crosstrigY * i)), (-72.5 + (crosstrigZ * i))),
              new THREE.Vector3(( 10 + (crosstrigX * i)), (100 - (crosstrigY * i)), (-72.5 + (crosstrigZ * i))));
            lineMpoints[i] = new MeshLine(), lineMpoints[i].setGeometry( lineMgeometry[i] )};
          lineMmesh[i] = new THREE.Mesh( lineMpoints[i].geometry, linematerial ), scene.add( lineMmesh[i] );
          lineMmesh[i].geometry.verticesNeedUpdate = true }};

      if(i >= 42){ scene.remove(lineRmesh[sric]), scene.remove(lineLmesh[sric]);
        if (i == 42){ sri = 0 } sri = sri + timerloop1; if( sri >= 0 && sri <= 24 ){
          lineRgeometry[sri] = new THREE.Geometry(), lineRgeometry[sri].vertices.push( // right side panel
            new THREE.Vector3(57.4 - (((57 - sideRXlineR)/24) * sri), 55 - (((55 - sideRYlineL)/24) * sri), -17 - (((-17 - sideRZlineL)/24) * sri)),
            new THREE.Vector3(16.5 - (((17 - sideRXlineL)/24) * sri), 55 - (((55 - sideRYlineR)/24) * sri), -17 - (((-17 - sideRZlineR)/24) * sri)));
          lineRpoints[sri] = new MeshLine(), lineRpoints[sri].setGeometry( lineRgeometry[sri] );
          lineRmesh[sri] = new THREE.Mesh( lineRpoints[sri].geometry, linematerial ), scene.add(lineRmesh[sri]);
          lineRmesh[sri].geometry.verticesNeedUpdate = true;
          lineLgeometry[sri] = new THREE.Geometry(), lineLgeometry[sri].vertices.push( //left side panel
            new THREE.Vector3(-57.4 - (((-57 - sideLXlineR)/24) * sri), 55 - (((55 - sideLYlineR)/24) * sri), -17 - (((-17 - sideLZlineR)/24) * sri)),
            new THREE.Vector3(-16.5  - (((-17 - sideLXlineL)/24) * sri), 55 - (((55 - sideLYlineL)/24) * sri), -17 - (((-17 - sideLZlineL)/24) * sri)));
          lineLpoints[sri] = new MeshLine(), lineLpoints[sri].setGeometry( lineLgeometry[sri] );
          lineLmesh[sri] = new THREE.Mesh( lineLpoints[sri].geometry, linematerial ), scene.add(lineLmesh[sri]);
          lineLmesh[sri].geometry.verticesNeedUpdate = true } else { sric = sri - delaytimer }};

        if(i >= 128 && i <= 128 + 24 + delaytimer){ scene.remove(lineBmesh[bm]);
          if ((bmi > 0 && bmi < 0 + 24)){
            lineBgeometry[bmi] = new THREE.Geometry(), lineBgeometry[bmi].vertices.push( // right side panel
              new THREE.Vector3((botbotXlineR - ((botbotXlineR - 30)/24) * bmi), (botbotYlineR - ((botbotYlineL - -35)/24) * bmi), botbotZlineL - ((botbotZlineL - 95)/24 * bmi)),
              new THREE.Vector3((botbotXlineL - ((botbotXlineL - -30)/24) * bmi), (botbotYlineL - ((botbotYlineL - -35)/24) * bmi), botbotZlineL - ((botbotZlineL - 95)/24 * bmi)));
            lineBpoints[bmi] = new MeshLine(), lineBpoints[bmi].setGeometry( lineBgeometry[bmi] );
            lineBmesh[bmi] = new THREE.Mesh( lineBpoints[bmi].geometry, linematerial ), scene.add(lineBmesh[bmi]);
            lineBmesh[bmi].geometry.verticesNeedUpdate = true
          } else { bm = bmi + delaytimer } bmi = bmi - timerloop1;
        } else { bmi = 24, bm = bmi + delaytimer }}}
  if (tock == 12) { crossscleanR(), apple = 0, crossscleanL(), pear = 0, crossscleanM(), kiwi = 0, crossscleanB(), lime = 0, console.log("CLEANUP @ ", tock) };
  /////////////////////////////////
  if ( tick > 95 && tick < 112){
    if (tick == 96) { crossflash() }
    if (tick == 97){ crossscleanM(), kiwi = 0, grape = 0  }
    if (tick == 98) { crossflash() }
    if (tick == 99){ crossscleanM(), kiwi = 0, grape = 0  }
    if (tick == 100) { crossflash() }
    if (tick == 101){ crossscleanM(), kiwi = 0, grape = 0  }
    if (tick == 102) { crossflash() }
    if (tick == 103){ crossscleanM(), kiwi = 0, grape = 0  }
    if (tick == 104) { crossflash() }
    if (tick == 105){ crossscleanM(), kiwi = 0, grape = 0  }
    if (tick == 106) { crossflash() }
    if (tick == 107){ crossscleanM(), kiwi = 0, grape = 0  }
    if (tick == 108) { crossflash() }
    if (tick == 109){ crossscleanM(), kiwi = 0, grape = 0  }
    if (tick == 110) { crossflash() }
    if (tick == 111){ crossscleanM(), kiwi = 0, grape = 0  }}
  if (tock == 15) { crossscleanR(), apple = 0, crossscleanL(), pear = 0, crossscleanM(), kiwi = 0, crossscleanB(), lime = 0, console.log("CLEANUP @ ", tock) };
  /////////////////////////////////



  //frame counter per beat ((DEBUGGER))
  //if( diff < tock){ diff = diff + 1 } else { console.log(diff) };
  //=================================================
  // Other animation storage ////////////////////////
  //=================================================
  point2x = sideLXlineL,      point2y = sideLYlineL,      point2z = sideLZlineL,
  promoint3x = sideLXlineR,      point3y = sideLYlineR,      point3z = sideLZlineR,
  point6x = topbottomXlineL,  point6y = topbottomYlineL,  point6z = topbottomZlineL,
  point7x = toptopXlineL,     point7y = toptopYlineL,     point7z = toptopZlineL,
  point10x = toptopXlineR,    point10y = toptopYlineR,    point10z = toptopZlineR,
  point11x = topbottomXlineR, point11y = topbottomYlineR, point11z = topbottomZlineR,
  point14x = sideRXlineR,     point14y = sideRYlineR,     point14z = sideRZlineR,
  point15x = sideRXlineL,     point15y = sideRYlineL,     point15z = sideRZlineL,
  point17x = botbotXlineR,    point17y = botbotYlineR,   point17z = botbotZlineR,
  point18x = botbotXlineL,    point18y = botbotYlineL,    point18z = botbotZlineL;
  /////////////////////////////////
  trackerX = camera.position.x, trackerY = camera.position.y, trackerZ = camera.position.Z;
  renderer.render(scene, camera), camera.lookAt( scene.position ), camera.updateMatrixWorld();
  controls.update(), update(), render() };
  //=================================================
  // Cross drawing functions ////////////////////////
  //=================================================
// required functions to call on genesis startup ////////////////////////////
function crossbinding() {
  glowinggeometry = new THREE.Geometry(); // CROSS GEOMETRY STORAGE
  glowinggeometry.vertices.push(
    new THREE.Vector3(point1x, point1y, point1z), new THREE.Vector3(point2x, point2y, point2z),
    new THREE.Vector3(point3x, point3y, point3z), new THREE.Vector3(point4x, point4y, point4z),
    new THREE.Vector3(point5x, point5y, point5z), new THREE.Vector3(point6x, point6y, point6z),
    new THREE.Vector3(point7x, point7y, point7z), new THREE.Vector3(point8x, point8y, point8z),
    new THREE.Vector3(point9x, point9y, point9z), new THREE.Vector3(point10x, point10y, point10z),
    new THREE.Vector3(point11x, point11y, point11z), new THREE.Vector3(point12x, point12y, point12z),
    new THREE.Vector3(point13x, point13y, point13z), new THREE.Vector3(point14x, point14y, point14z),
    new THREE.Vector3(point15x, point15y, point15z), new THREE.Vector3(point16x, point16y, point16z),
    new THREE.Vector3(point17x, point17y, point17z), new THREE.Vector3(point18x, point18y, point18z),
    new THREE.Vector3(point1x, point1y, point1z));
    glowingpoints = new MeshLine(), glowingpoints.setGeometry( glowinggeometry );
    glowingmaterial = new MeshLineMaterial({ lineWidth: 3.5, color: crosscolour });
} // assigns the cross to positional values on bpm1
// scanline animation based on array calling ////////////////////////////
function basiccrossani() { crosspointsgeometry = new THREE.Geometry(); // CROSS GEOMETRY STORAGE
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
  crosspoints = new MeshLine(), crosspoints.setGeometry( crosspointsgeometry );
  crosspointsmaterial = new MeshLineMaterial({ lineWidth: 0.7, color: crosscolour });
  scene.remove( crosspointsmesh );
  crosspointsmesh = new THREE.Mesh( crosspoints.geometry, crosspointsmaterial );
  crosspointsmesh.geometry.verticesNeedUpdate = true, scene.add( crosspointsmesh ) };
  //=================================================
  // animation functions ////////////////////////////
  //=================================================
function glowstatic() { glowinggeometry = new THREE.Geometry(); // CROSS GEOMETRY STORAGE
  glowinggeometry.vertices.push(
    new THREE.Vector3(point1x, point1y, point1z), new THREE.Vector3(point2x, point2y, point2z),
    new THREE.Vector3(point3x, point3y, point3z), new THREE.Vector3(point4x, point4y, point4z),
    new THREE.Vector3(point5x, point5y, point5z), new THREE.Vector3(point6x, point6y, point6z),
    new THREE.Vector3(point7x, point7y, point7z), new THREE.Vector3(point8x, point8y, point8z),
    new THREE.Vector3(point9x, point9y, point9z), new THREE.Vector3(point10x, point10y, point10z),
    new THREE.Vector3(point11x, point11y, point11z), new THREE.Vector3(point12x, point12y, point12z),
    new THREE.Vector3(point13x, point13y, point13z), new THREE.Vector3(point14x, point14y, point14z),
    new THREE.Vector3(point15x, point15y, point15z), new THREE.Vector3(point16x, point16y, point16z),
    new THREE.Vector3(point17x, point17y, point17z), new THREE.Vector3(point18x, point18y, point18z),
    new THREE.Vector3(point1x, point1y, point1z));
  glowingpoints = new MeshLine(), glowingpoints.setGeometry( glowinggeometry );
  glowingmaterial = new MeshLineMaterial({ lineWidth: 3.5, color: crosscolour });
  scene.remove(glowingmesh);
  glowingmesh = new THREE.Mesh( glowingpoints.geometry, glowingmaterial );
  glowingmesh.geometry.verticesNeedUpdate = true;
  scene.add(glowingmesh) }; // assigns positional values based apon currently rendered cross
function crossflash(){
    if ( grape < 28.5 ){
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ),grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ),grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25 };
    if (grape >= 28.5 && grape < 42.5){
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-42 - (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))), new THREE.Vector3(( 42 + (crosssidetrigX * grape)), (104 - (crosstrigY * grape) - ((crosstrigY * grape)/10)), (-77.2 + (crosssidetrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      };
    if (grape >= 42.5 && grape < 128 ){
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25;
      lineMgeometry[grape] = new THREE.Geometry(), lineMgeometry[grape].vertices.push( new THREE.Vector3((-10 - (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))), new THREE.Vector3(( 10 + (crosstrigX * grape)), (100 - (crosstrigY * grape)), (-72.5 + (crosstrigZ * grape))) );
      lineMpoints[grape] = new MeshLine(), lineMpoints[grape].setGeometry( lineMgeometry[grape] ), lineMmesh[grape] = new THREE.Mesh( lineMpoints[grape].geometry, linematerial2 ), scene.add( lineMmesh[grape] ), grape = grape + 0.25 };
} // cross flash animation;
function glowringani() { outerglowinggeometry = new THREE.Geometry(); // CROSS GEOMETRY STORAGE
  outerglowinggeometry.vertices.push(
    new THREE.Vector3( line1x, line1y, line1z ), new THREE.Vector3( line2x, line2y, line2z ),
    new THREE.Vector3( line3x, line3y, line3z ), new THREE.Vector3( line4x, line4y, line4z ),
    new THREE.Vector3( line5x, line5y, line5z ), new THREE.Vector3( line6x, line6y, line6z ),
    new THREE.Vector3( line7x, line7y, line7z ), new THREE.Vector3( line8x, line8y, line8z ));
  if(glowloop <= 0){
    line1x = point1x, line1y = point1y, line1z = point1z;
    line2x = point1x, line2y = point1y, line2z = point1z, line3x = point1x, line3y = point1y, line3z = point1z;
    line4x = point1x, line4y = point1y, line4z = point1z, line5x = point1x, line5y = point1y, line5z = point1z;
    line6x = point1x, line6y = point1y, line6z = point1z, line7x = point1x, line7y = point1y, line7z = point1z;
    line8x = ( point1x + ((-point1x - -point2x)/24) * (glowloop + 24));
    line8y = ( point1y + ((-point1y - -point2y)/24) * (glowloop + 24));
    line8z = ( point1z + ((-point1z - -point2z)/24) * (glowloop + 24)) };
  if(glowloop > 0 && glowloop <= 24){
    line1x = ( point1x + ((-point1x - -point2x)/24) * glowloop);
    line1y = ( point1y + ((-point1y - -point2y)/24) * glowloop);
    line1z = ( point1z + ((-point1z - -point2z)/24) * glowloop) };
  if(glowloop > 0 && glowloop <= 6){
    line2x = point2x, line2y = point2y, line2z = point2z, line3x = point2x, line3y = point2y, line3z = point2z;
    line4x = point2x, line4y = point2y, line4z = point2z, line5x = point2x, line5y = point2y, line5z = point2z;
    line6x = point2x, line6y = point2y, line6z = point2z, line7x = point2x, line7y = point2y, line7z = point2z;
    line8x = ( point2x + ((-point2x - -point3x)/(6 - 0)) * glowloop);
    line8y = ( point2y + ((-point2y - -point3y)/(6 - 0)) * glowloop);
    line8z = ( point2z + ((-point2z - -point3z)/(6 - 0)) * glowloop) };
  if(glowloop > 6 && glowloop <= 12){
    line2x = point2x, line2y = point2y, line2z = point2z, line3x = point3x, line3y = point3y, line3z = point3z;
    line4x = point3x, line4y = point3y, line4z = point3z, line5x = point3x, line5y = point3y, line5z = point3z;
    line6x = point3x, line6y = point3y, line6z = point3z, line7x = point3x, line7y = point3y, line7z = point3z;
    line8x = ( point3x + ((-point3x - -point4x)/(12 - 6)) * (glowloop - 6));
    line8y = ( point3y + ((-point3y - -point4y)/(12 - 6)) * (glowloop - 6));
    line8z = ( point3z + ((-point3z - -point4z)/(12 - 6)) * (glowloop - 6)) };
  if(glowloop > 12 && glowloop <= 18){
    line2x = point2x, line2y = point2y, line2z = point2z, line3x = point3x, line3y = point3y, line3z = point3z;
    line4x = point4x, line4y = point4y, line4z = point4z, line5x = point4x, line5y = point4y, line5z = point4z;
    line6x = point4x, line6y = point4y, line6z = point4z, line7x = point4x, line7y = point4y, line7z = point4z;
    line8x = ( point4x + ((-point4x - -point5x)/(18 - 12)) * (glowloop - 12));
    line8y = ( point4y + ((-point4y - -point5y)/(18 - 12)) * (glowloop - 12));
    line8z = ( point4z + ((-point4z - -point5z)/(18 - 12)) * (glowloop - 12)) };
  if(glowloop > 18 && glowloop <= 24){
    if(camera.position.x < -65){ if(glowloop > 18 && glowloop <= (18 + 4)){
      line2x = point2x, line3y = point2y, line3z = point2z, line3x = point3x, line3y = point3y, line3z = point3z;
      line4x = point3x, line4y = point3y, line4z = point3z, line5x = point3x, line5y = point3y, line5z = point3z;
      line6x = point4x, line6y = point4y, line6z = point4z, line7x = point5x, line7y = point5y, line7z = point5z;
      line8x = ( point5x - ((-point6x - -point5x)/4) * (glowloop - 18));
      line8y = ( point5y - ((-point6y - -point5y)/4) * (glowloop - 18));
      line8z = ( point5z - ((-point6z - -point5z)/4) * (glowloop - 18));
    } else {
      line2x = point2x, line2y = point2y, line2z = point2z, line3x = point3x, line3y = point3y, line3z = point3z;
      line4x = point3x, line4y = point3y, line4z = point3z, line5x = point4x, line5y = point4y, line5z = point4z;
      line6x = point5x, line6y = point5y, line6z = point5z, line7x = point6x, line7y = point6y, line7z = point6z;
      line8x = ( point6x + ((-point6x - -point7x)/2) * (glowloop - (18 + 4)));
      line8y = ( point6y + ((-point6y - -point7y)/2) * (glowloop - (18 + 4)));
      line8z = ( point6z + ((-point6z - -point7z)/2) * (glowloop - (18 + 4))) };
    } else {
      line2x = point2x, line2y = point2y, line2z = point2z, line3x = point3x, line3y = point3y, line3z = point3z;
      line4x = point4x, line4y = point4y, line4z = point4z, line5x = point5x, line5y = point5y, line5z = point5z;
      line6x = point5x, line6y = point5y, line6z = point5z, line7x = point5x, line7y = point5y, line7z = point5z;
      line8x = ( point5x + ((-point5x - -point6x)/(24 - 18)) * (glowloop - 18));
      line8y = ( point5y + ((-point5y - -point6y)/(24 - 18)) * (glowloop - 18));
      line8z = ( point5z + ((-point5z - -point6z)/(24 - 18)) * (glowloop - 18)) }};
  if(glowloop > 24 && glowloop <= 30){
    if(camera.position.x < -65){
      line1x = ( point2x + ((-point2x - -point3x)/(30 - 24)) * (glowloop - 24));
      line1y = ( point2y - ((-point2y - -point3y)/(30 - 24)) * (glowloop - 24));
      line1z = ( point2z - ((-point2z - -point3z)/(30 - 24)) * (glowloop - 24));
      line2x = point3x, line2y = point3y, line2z = point3z, line3x = point4x, line3y = point4y, line3z = point4z;
      line4x = point5x, line4y = point5y, line4z = point5z, line5x = point6x, line5y = point6y, line5z = point6z;
      line6x = point7x, line6y = point7y, line6z = point7z, line7x = point7x, line7y = point7y, line7z = point7z;
      line8x = ( point8x - ((-point8x - -point7x)/(30 - 24)) * (glowloop - 30));
      line8y = ( point8y - ((-point8y - -point7y)/(30 - 24)) * (glowloop - 30));
      line8z = ( point8z - ((-point8z - -point7z)/(30 - 24)) * (glowloop - 30))
      } else {
      line1x = ( point2x + ((-point2x - -point3x)/(30 - 24)) * (glowloop - 24));
      line1y = ( point2y - ((-point2y - -point3y)/(30 - 24)) * (glowloop - 24));
      line1z = ( point2z - ((-point2z - -point3z)/(30 - 24)) * (glowloop - 24));
      line2x = point3x, line2y = point3y, line2z = point3z, line3x = point4x, line3y = point4y, line3z = point4z;
      line4x = point5x, line4y = point5y, line4z = point5z, line5x = point6x, line5y = point6y, line5z = point6z;
      line6x = point5x, line6y = point5y, line6z = point5z, line7x = point6x, line7y = point6y, line7z = point6z;
      line8x = ( point8x - ((-point8x - -point6x)/(30 - 24)) * (glowloop - 30));
      line8y = ( point8y - ((-point8y - -point6y)/(30 - 24)) * (glowloop - 30));
      line8z = ( point8z - ((-point8z - -point6z)/(30 - 24)) * (glowloop - 30)) }};
  if(glowloop > 30 && glowloop <= 36){
    line1x = ( point3x - ((-point4x - -point3x)/(36 - 30)) * (glowloop - 30));
    line1y = ( point3y - ((-point4y - -point3y)/(36 - 30)) * (glowloop - 30));
    line1z = ( point3z - ((-point4z - -point3z)/(36 - 30)) * (glowloop - 30));
    line2x = point4x, line2y = point4y, line2z = point4z, line3x = point5x, line3y = point5y, line3z = point5z;
    line4x = point6x, line4y = point6y, line4z = point6z, line5x = point7x, line5y = point7y, line5z = point7z;
    line6x = point7x, line6y = point7y, line6z = point7z, line7x = point8x, line7y = point8y, line7z = point8z;
    line8x = ( point8x - ((-point9x - -point8x)/(36 - 30)) * (glowloop - 30));
    line8y = ( point8y - ((-point9y - -point8y)/(36 - 30)) * (glowloop - 30));
    line8z = ( point8z - ((-point9z - -point8z)/(36 - 30)) * (glowloop - 30)) };
  if(glowloop > 36 && glowloop <= 42){
    if(camera.position.x > 65){ // far back right line
      line1x = ( point4x - ((-point5x - -point4x)/(42 - 36)) * (glowloop - 36));
      line1y = ( point4y - ((-point5y - -point4y)/(42 - 36)) * (glowloop - 36));
      line1z = ( point4z - ((-point5z - -point4z)/(42 - 36)) * (glowloop - 36));
      line2x = point5x, line2y = point5y, line2z = point5z, line3x = point6x, line3y = point6y, line3z = point6z;
      line4x = point7x, line4y = point7y, line4z = point7z, line5x = point8x, line5y = point8y, line5z = point8z;
      line6x = point8x, line6y = point8y, line6z = point8z, line7x = point9x, line7y = point9y, line7z = point9z;
      line8x = ( point9x - ((-point10x - -point9x)/(42 - 36)) * (glowloop - 36));
      line8y = ( point9y - ((-point10y - -point9y)/(42 - 36)) * (glowloop - 36));
      line8z = ( point9z - ((-point10z - -point9z)/(42 - 36)) * (glowloop - 36));
    } else {
      line1x = ( point4x - ((-point5x - -point4x)/(42 - 36)) * (glowloop - 36));
      line1y = ( point4y - ((-point5y - -point4y)/(42 - 36)) * (glowloop - 36));
      line1z = ( point4z - ((-point5z - -point4z)/(42 - 36)) * (glowloop - 36));
      line2x = point5x, line2y = point5y, line2z = point5z, line3x = point6x, line3y = point6y, line3z = point6z;
      line4x = point7x, line4y = point7y, line4z = point7z, line5x = point7x, line5y = point7y, line5z = point7z;
      line6x = point8x, line6y = point8y, line6z = point8z, line7x = point9x, line7y = point9y, line7z = point9z;
      line8x = ( point9x - ((-point11x - -point9x)/(42 - 36)) * (glowloop - 36));
      line8y = ( point9y - ((-point11y - -point9y)/(42 - 36)) * (glowloop - 36));
      line8z = ( point9z - ((-point11z - -point9z)/(42 - 36)) * (glowloop - 36)) }};
  if(glowloop > 42 && glowloop <= 48){
    if(camera.position.x < 65 && camera.position.x > -65 ){ // optimised right side undercarrage
      line1x = ( point5x - ((-point6x - -point5x)/(48 - 42)) * (glowloop - 42));
      line1y = ( point5y - ((-point6y - -point5y)/(48 - 42)) * (glowloop - 42));
      line1z = ( point5z - ((-point6z - -point5z)/(48 - 42)) * (glowloop - 42));
      line2x = point6x, line2y = point6y, line2z = point6z, line3x = point7x, line3y = point7y, line3z = point7z;
      line4x = point8x, line4y = point8y, line4z = point8z, line5x = point9x, line5y = point9y, line5z = point9z;
      line6x = point10x, line6y = point10y, line6z = point10z, line7x = point11x, line7y = point11y, line7z = point11z;
      line8x = ( point11x - ((-point12x - -point11x)/(48 - 42)) * (glowloop - 42));
      line8y = ( point11y - ((-point12y - -point11y)/(48 - 42)) * (glowloop - 42));
      line8z = ( point11z - ((-point12z - -point11z)/(48 - 42)) * (glowloop - 42)) }
    if(camera.position.x > 65) { if(glowloop > 42 && glowloop <= (42 + 2)) {
      line1x = ( point5x - ((-point6x - -point5x)/(48 - 42)) * (glowloop - 42));
      line1y = ( point5y - ((-point6y - -point5y)/(48 - 42)) * (glowloop - 42));
      line1z = ( point5z - ((-point6z - -point5z)/(48 - 42)) * (glowloop - 42));
      line2x = point6x, line2y = point6y, line2z = point6z, line3x = point7x, line3y = point7y, line3z = point7z;
      line4x = point8x, line4y = point8y, line4z = point8z, line5x = point9x, line5y = point9y, line5z = point9z;
      line6x = point10x, line6y = point10y, line6z = point10z, line7x = point10x, line7y = point10y, line7z = point10z;
      line8x = ( point10x - ((-point11x - -point10x)/(48 - 42 - 4)) * (glowloop - 42));
      line8y = ( point10y - ((-point11y - -point10y)/(48 - 42 - 4)) * (glowloop - 42));
      line8z = ( point10z - ((-point11z - -point10z)/(48 - 42 - 4)) * (glowloop - 42))
    } else {
      line1x = ( point5x - ((-point6x - -point5x)/(48 - 42)) * (glowloop - 42));
      line1y = ( point5y - ((-point6y - -point5y)/(48 - 42)) * (glowloop - 42));
      line1z = ( point5z - ((-point6z - -point5z)/(48 - 42)) * (glowloop - 42));
      line2x = point6x, line2y = point6y, line2z = point6z, line3x = point7x, line3y = point7y, line3z = point7z;
      line4x = point8x, line4y = point8y, line4z = point8z, line5x = point9x, line5y = point9y, line5z = point9z;
      line6x = point10x, line6y = point10y, line6z = point10z, line7x = point11x, line7y = point11y, line7z = point11z;
      line8x = ( point11x - ((-point12x - -point11x)/(48 - 42 - 2)) * (glowloop - (42 + 2)));
      line8y = ( point11y - ((-point12y - -point11y)/(48 - 42 - 2)) * (glowloop - (42 + 2)));
      line8z = ( point11z - ((-point12z - -point11z)/(48 - 42 - 2)) * (glowloop - (42 + 2))) }};
    if(camera.position.x < -65) { if(glowloop > 42 && glowloop <= (48 - 2)) {
      line1x = ( point5x - ((-point6x - -point5x)/(48 - 42 - 2)) * (glowloop - 42));
      line1y = ( point5y - ((-point6y - -point5y)/(48 - 42 - 2)) * (glowloop - 42));
      line1z = ( point5z - ((-point6z - -point5z)/(48 - 42 - 2)) * (glowloop - 42));
      line2x = point6x, line2y = point6y, line2z = point6z, line3x = point7x, line3y = point7y, line3z = point7z;
      line4x = point8x, line4y = point8y, line4z = point8z, line5x = point9x, line5y = point9y, line5z = point9z;
      line6x = point10x, line6y = point10y, line6z = point10z, line7x = point11x, line7y = point11y, line7z = point11z;
      line8x = ( point11x - ((-point12x - -point11x)/(48 - 42)) * (glowloop - 42));
      line8y = ( point11y - ((-point12y - -point11y)/(48 - 42)) * (glowloop - 42));
      line8z = ( point11z - ((-point12z - -point11z)/(48 - 42)) * (glowloop - 42))
    } else {
      line1x = ( point6x - ((-point7x - -point6x)/(48 - 42 - 4)) * (glowloop - (48 - 2)));
      line1y = ( point6y - ((-point7y - -point6y)/(48 - 42 - 4)) * (glowloop - (48 - 2)));
      line1z = ( point6z - ((-point7z - -point6z)/(48 - 42 - 4)) * (glowloop - (48 - 2)));
      line2x = point7x, line2y = point7y, line2z = point7z, line3x = point8x, line3y = point8y, line3z = point8z;
      line4x = point9x, line4y = point9y, line4z = point9z, line5x = point10x, line5y = point10y, line5z = point10z;
      line6x = point11x, line6y = point11y, line6z = point11z, line7x = point11x, line7y = point11y, line7z = point11z;
      line8x = ( point11x - ((-point12x - -point11x)/(48 - 42)) * (glowloop - 42));
      line8y = ( point11y - ((-point12y - -point11y)/(48 - 42)) * (glowloop - 42));
      line8z = ( point11z - ((-point12z - -point11z)/(48 - 42)) * (glowloop - 42)) }}};
  if(glowloop > 48 && glowloop <= 54){
    if(camera.position.x > -65){
      line1x = ( point6x - ((-point7x - -point6x)/(54 - 48)) * (glowloop - 48));
      line1y = ( point6y - ((-point7y - -point6y)/(54 - 48)) * (glowloop - 48));
      line1z = ( point6z - ((-point7z - -point6z)/(54 - 48)) * (glowloop - 48));
      line2x = point8x, line2y = point8y, line2z = point8z, line3x = point9x, line3y = point9y, line3z = point9z;
      line4x = point10x, line4y = point10y, line4z = point10z, line5x = point11x, line5y = point11y, line5z = point11z;
      line6x = point12x, line6y = point12y, line6z = point12z, line7x = point12x, line7y = point12y, line7z = point12z;
      line8x = ( point12x - ((-point13x - -point12x)/(54 - 48)) * (glowloop - 48));
      line8y = ( point12y - ((-point13y - -point12y)/(54 - 48)) * (glowloop - 48));
      line8z = ( point12z - ((-point13z - -point12z)/(54 - 48)) * (glowloop - 48));
    } else {
      line1x = ( point7x - ((-point8x - -point7x)/(54 - 48)) * (glowloop - 48));
      line1y = ( point7y - ((-point8y - -point7y)/(54 - 48)) * (glowloop - 48));
      line1z = ( point7z - ((-point8z - -point7z)/(54 - 48)) * (glowloop - 48));
      line2x = point8x, line2y = point8y, line2z = point8z, line3x = point9x, line3y = point9y, line3z = point9z;
      line4x = point10x, line4y = point10y, line4z = point10z, line5x = point11x, line5y = point11y, line5z = point11z;
      line6x = point12x, line6y = point12y, line6z = point12z, line7x = point12x, line7y = point12y, line7z = point12z;
      line8x = ( point12x - ((-point13x - -point12x)/(54 - 48)) * (glowloop - 48));
      line8y = ( point12y - ((-point13y - -point12y)/(54 - 48)) * (glowloop - 48));
      line8z = ( point12z - ((-point13z - -point12z)/(54 - 48)) * (glowloop - 48))}};
  if(glowloop > 54 && glowloop <= 60){
    line1x = ( point8x + ((-point8x - -point9x)/(60 - 54)) * (glowloop - 54));
    line1y = ( point8y + ((-point8y - -point9y)/(60 - 54)) * (glowloop - 54));
    line1z = ( point8z + ((-point8z - -point9z)/(60 - 54)) * (glowloop - 54));
    line2x = point9x, line2y = point9y, line2z = point9z, line3x = point9x, line3y = point9y, line3z = point9z;
    line4x = point10x, line4y = point10y, line4z = point10z, line5x = point11x, line5y = point11y, line5z = point11z;
    line6x = point12x, line6y = point12y, line6z = point12z, line7x = point13x, line7y = point13y, line7z = point13z;
    line8x = ( point13x - ((-point14x - -point13x)/(60 - 54)) * (glowloop - 54));
    line8y = ( point13y - ((-point14y - -point13y)/(60 - 54)) * (glowloop - 54));
    line8z = ( point13z - ((-point14z - -point13z)/(60 - 54)) * (glowloop - 54)) };
  if(glowloop > 60 && glowloop <= 66){
    if(camera.position.x > 65){
      line1x = ( point9x + ((-point9x - -point10x)/(66 - 60)) * (glowloop - 60));
      line1y = ( point9y + ((-point9y - -point10y)/(66 - 60)) * (glowloop - 60));
      line1z = ( point9z + ((-point9z - -point10z)/(66 - 60)) * (glowloop - 60));
      line2x = point10x, line2y = point10y, line2z = point10z, line3x = point11x, line3y = point11y, line3z = point11z;
      line4x = point12x, line4y = point12y, line4z = point12z, line5x = point13x, line5y = point13y, line5z = point13z;
      line6x = point14x, line6y = point14y, line6z = point14z, line7x = point14x, line7y = point14y, line7z = point14z;
      line8x = ( point14x - ((-point15x - -point14x)/(66 - 60)) * (glowloop - 60));
      line8y = ( point14y - ((-point15y - -point14y)/(66 - 60)) * (glowloop - 60));
      line8z = ( point14z - ((-point15z - -point14z)/(66 - 60)) * (glowloop - 60));
    } else {
      line1x = ( point9x + ((-point9x - -point11x)/(66 - 60)) * (glowloop - 60));
      line1y = ( point9y + ((-point9y - -point11y)/(66 - 60)) * (glowloop - 60));
      line1z = ( point9z + ((-point9z - -point11z)/(66 - 60)) * (glowloop - 60));
      line2x = point11x, line2y = point11y, line2z = point11z, line3x = point12x, line3y = point12y, line3z = point12z;
      line4x = point13x, line4y = point13y, line4z = point13z, line5x = point14x, line5y = point14y, line5z = point14z;
      line6x = point14x, line6y = point14y, line6z = point14z, line7x = point14x, line7y = point14y, line7z = point14z;
      line8x = ( point14x - ((-point15x - -point14x)/(66 - 60)) * (glowloop - 60));
      line8y = ( point14y - ((-point15y - -point14y)/(66 - 60)) * (glowloop - 60));
      line8z = ( point14z - ((-point15z - -point14z)/(66 - 60)) * (glowloop - 60)) }};
  if(glowloop > 66 && glowloop <= 72){
    if(camera.position.x > 65){ if(glowloop > 66 && glowloop <= (66 + 2)){
      line1x = ( point10x + ((-point10x - -point11x)/(72 - 66 - 4)) * (glowloop - 66));
      line1y = ( point10y + ((-point10y - -point11y)/(72 - 66 - 4)) * (glowloop - 66));
      line1z = ( point10z + ((-point10z - -point11z)/(72 - 66 - 4)) * (glowloop - 66));
      line2x = point11x, line2y = point11y, line2z = point11z, line3x = point12x, line3y = point12y, line3z = point12z;
      line4x = point13x, line4y = point13y, line4z = point13z, line5x = point14x, line5y = point14y, line5z = point14z;
      line6x = point15x, line6y = point15y, line6z = point15z, line7x = point15x, line7y = point15y, line7z = point15z;
    } else {
      line1x = ( point11x + ((-point11x - -point12x)/(72 - 66 + 4)) * (glowloop - (66 + 4)));
      line1y = ( point11y + ((-point11y - -point12y)/(72 - 66 + 4)) * (glowloop - (66 + 4)));
      line1z = ( point11z + ((-point11z - -point12z)/(72 - 66 + 4)) * (glowloop - (66 + 4)));
      line2x = point12x, line2y = point12y, line2z = point12z, line3x = point12x, line3y = point12y, line3z = point12z;
      line4x = point13x, line4y = point13y, line4z = point13z, line5x = point14x, line5y = point14y, line5z = point14z;
      line6x = point15x, line6y = point15y, line6z = point15z, line7x = point15x, line7y = point15y, line7z = point15z };
  } else {
    line1x = ( point11x + ((-point11x - -point12x)/(72 - 66)) * (glowloop - 66));
    line1y = ( point11y + ((-point11y - -point12y)/(72 - 66)) * (glowloop - 66));
    line1z = ( point11z + ((-point11z - -point12z)/(72 - 66)) * (glowloop - 66));
    line2x = point12x, line2y = point12y, line2z = point12z, line3x = point12x, line3y = point12y, line3z = point12z;
    line4x = point13x, line4y = point13y, line4z = point13z, line5x = point14x, line5y = point14y, line5z = point14z;
    line6x = point15x, line6y = point15y, line6z = point15z, line7x = point15x, line7y = point15y, line7z = point15z }};
  if(glowloop > 66 && glowloop <= 90){
    line8x = ( point15x - ((-point16x - -point15x)/(90 - 66)) * (glowloop - 66));
    line8y = ( point15y - ((-point16y - -point15y)/(90 - 66)) * (glowloop - 66));
    line8z = ( point15z - ((-point16z - -point15z)/(90 - 66)) * (glowloop - 66)) };
  if(glowloop > 72 && glowloop <= 78){
    line1x = ( point12x + ((-point12x - -point13x)/(78 - 72)) * (glowloop - 72));
    line1y = ( point12y + ((-point12y - -point13y)/(78 - 72)) * (glowloop - 72));
    line1z = ( point12z + ((-point12z - -point13z)/(78 - 72)) * (glowloop - 72));
    line2x = point13x, line2y = point13y, line2z = point13z, line3x = point14x, line3y = point14y, line3z = point14z;
    line4x = point15x, line4y = point15y, line4z = point15z, line5x = point15x, line5y = point15y, line5z = point15z;
    line6x = point15x, line6y = point15y, line6z = point15z, line7x = point15x, line7y = point15y, line7z = point15z };
  if(glowloop > 78 && glowloop <= 84){
    line1x = ( point13x + ((-point13x - -point14x)/(84 - 78)) * (glowloop - 78));
    line1y = ( point13y + ((-point13y - -point14y)/(84 - 78)) * (glowloop - 78));
    line1z = ( point13z + ((-point13z - -point14z)/(84 - 78)) * (glowloop - 78));
    line2x = point14x, line2y = point14y, line2z = point14z, line3x = point15x, line3y = point15y, line3z = point15z;
    line4x = point15x, line4y = point15y, line4z = point15z, line5x = point15x, line5y = point15y, line5z = point15z;
    line6x = point15x, line6y = point15y, line6z = point15z, line7x = point15x, line7y = point15y, line7z = point15z };
  if(glowloop > 84 && glowloop <= 90){
    line1x = ( point14x + ((-point14x - -point15x)/(90 - 84)) * (glowloop - 84));
    line1y = ( point14y + ((-point14y - -point15y)/(90 - 84)) * (glowloop - 84));
    line1z = ( point14z + ((-point14z - -point15z)/(90 - 84)) * (glowloop - 84));
    line2x = point15x, line2y = point15y, line2z = point15z, line3x = point15x, line3y = point15y, line3z = point15z;
    line4x = point15x, line4y = point15y, line4z = point15z, line5x = point15x, line5y = point15y, line5z = point15z;
    line6x = point15x, line6y = point15y, line6z = point15z, line7x = point15x, line7y = point15y, line7z = point15z };
  if(glowloop > 90 && glowloop <= 114){
    line1x = ( point15x + ((-point15x - -point16x)/(108 - 90)) * (glowloop - 90));
    line1y = ( point15y + ((-point15y - -point16y)/(108 - 90)) * (glowloop - 90));
    line1z = ( point15z + ((-point15z - -point16z)/(108 - 90)) * (glowloop - 90)) };
  if(glowloop > 90 && glowloop <= 96){
    line2x = point16x, line2y = point16y, line2z = point16z, line3x = point16x, line3y = point16y, line3z = point16z;
    line4x = point16x, line4y = point16y, line4z = point16z, line5x = point16x, line5y = point16y, line5z = point16z;
    line6x = point16x, line6y = point16y, line6z = point16z, line7x = point16x, line7y = point16y, line7z = point16z };
  if(glowloop > 96 && glowloop <= 102){
    line2x = point16x, line2y = point16y, line2z = point16z, line3x = point17x, line3y = point17y, line3z = point17z;
    line4x = point17x, line4y = point17y, line4z = point17z, line5x = point17x, line5y = point17y, line5z = point17z;
    line6x = point17x, line6y = point17y, line6z = point17z, line7x = point17x, line7y = point17y, line7z = point17z };
  if(glowloop > 102 && glowloop <= 108){
    line2x = point16x, line2y = point16y, line2z = point16z, line3x = point17x, line3y = point17y, line3z = point17z;
    line4x = point17x, line4y = point17y, line4z = point17z, line5x = point17x, line5y = point17y, line5z = point17z;
    line6x = point17x, line6y = point17y, line6z = point17z, line7x = point18x, line7y = point18y, line7z = point18z };
  if(glowloop > 90 && glowloop <= 108){
    if(camera.position.x < 65 && camera.position.x > -65){
      if(glowloop > 90 && glowloop <= 96){
        line8x = ( point16x - ((-point17x - -point16x)/(96 - 90)) * (glowloop - 90));
        line8y = ( point16y - ((-point17y - -point16y)/(96 - 90)) * (glowloop - 90));
        line8z = ( point16z - ((-point17z - -point16z)/(96 - 90)) * (glowloop - 90)) };
      if(glowloop > 96 && glowloop <= 102){
        line8x = ( point17x - ((-point18x - -point17x)/(102 - 96)) * (glowloop - 96));
        line8y = ( point17y - ((-point18y - -point17y)/(102 - 96)) * (glowloop - 96));
        line8z = ( point17z - ((-point18z - -point17z)/(102 - 96)) * (glowloop - 96)) };
      if(glowloop > 102 && glowloop <= 108){
        line8x = ( point18x - ((-point1x - -point18x)/(108 - 102)) * (glowloop - 102));
        line8y = ( point18y - ((-point1y - -point18y)/(108 - 102)) * (glowloop - 102));
        line8z = ( point18z - ((-point1z - -point18z)/(108 - 102)) * (glowloop - 102)) }};
    if(camera.position.x < -65){
      if(glowloop > 90 && glowloop <= (96 + 3)){
        line7x = point16x, line7y = point16y, line7z = point16z
        line8x = ( point16x - ((-point17x - -point16x)/(102 - (90 + 3))) * (glowloop - 90));
        line8y = ( point16y - ((-point17y - -point16y)/(102 - (90 + 3))) * (glowloop - 90));
        line8z = ( point16z - ((-point17z - -point16z)/(102 - (90 + 3))) * (glowloop - 90)) };
      if(glowloop > (96 + 3) && glowloop <= 108){
        line7x = point17x, line7y = point17y, line7z = point17z
        line8x = ( point17x - ((-point18x - -point17x)/(108 - (102 - 3))) * (glowloop - (96 + 3)));
        line8y = ( point17y - ((-point18y - -point17y)/(108 - (102 - 3))) * (glowloop - (96 + 3)));
        line8z = ( point17z - ((-point18z - -point17z)/(108 - (102 - 3))) * (glowloop - (96 + 3))) }};
    if(camera.position.x > 65){
      if(glowloop > 90 && glowloop <= (96 + 3)){
        line7x = point17x, line7y = point17y, line7z = point17z
        line8x = ( point17x - ((-point18x - -point17x)/(102 - (90 + 3))) * (glowloop - 90));
        line8y = ( point17y - ((-point18y - -point17y)/(102 - (90 + 3))) * (glowloop - 90));
        line8z = ( point17z - ((-point18z - -point17z)/(102 - (90 + 3))) * (glowloop - 90)) };
      if(glowloop > (96 + 3) && glowloop <= 108){
        line7x = point18x, line7y = point18y, line7z = point18z
        line8x = ( point18x - ((-point1x - -point18x)/(108 - (102 - 3))) * (glowloop - (96 + 3)));
        line8y = ( point18y - ((-point1y - -point18y)/(108 - (102 - 3))) * (glowloop - (96 + 3)));
        line8z = ( point18z - ((-point1z - -point18z)/(108 - (102 - 3))) * (glowloop - (96 + 3))) }};
  if( glowloop >= 107.7 && glowloop <= 108){ status = 1, glowloopreset = 1 }};
  if(glowloopreset == 1){
    if( glowloop <= 0 ){
      if(camera.position.x < 65 && camera.position.x > -65){
        if(glowloop > -24 && glowloop <= -16){
          line1x = ( point16x + ((-point16x - -point17x)/ 8) * (glowloop - -24));
          line1y = ( point16y + ((-point16y - -point17y)/ 8) * (glowloop - -24));
          line1z = ( point16z + ((-point16z - -point17z)/ 8) * (glowloop - -24))
          line2x = point17x, line2y = point17y, line2z = point17z, line3x = point18x, line3y = point18y, line3z = point18z;
          line4x = point18x, line4y = point18y, line4z = point18z, line5x = point18x, line5y = point18y, line5z = point18z;
          line6x = point18x, line6y = point18y, line6z = point18z, line7x = point1x, line7y = point1y, line7z = point1z };
        if(glowloop > -16 && glowloop <= -8){
          line1x = ( point17x + ((-point17x - -point18x)/ 8) * (glowloop - -16));
          line1y = ( point17y + ((-point17y - -point18y)/ 8) * (glowloop - -16));
          line1z = ( point17z + ((-point17z - -point18z)/ 8) * (glowloop - -16))
          line2x = point18x, line2y = point18y, line2z = point18z, line3x = point18x, line3y = point18y, line3z = point18z;
          line4x = point18x, line4y = point18y, line4z = point18z, line5x = point18x, line5y = point18y, line5z = point18z;
          line6x = point18x, line6y = point18y, line6z = point18z, line7x = point1x, line7y = point1y, line7z = point1z };
        if(glowloop > -8 && glowloop <= 0){
          line1x = ( point18x + ((-point18x - -point1x)/ 8) * (glowloop - -8));
          line1y = ( point18y + ((-point18y - -point1y)/ 8) * (glowloop - -8));
          line1z = ( point18z + ((-point18z - -point1z)/ 8) * (glowloop - -8))
          line2x = point1x, line2y = point1y, line2z = point1z, line3x = point1x, line3y = point1y, line3z = point1z;
          line4x = point1x, line4y = point1y, line4z = point1z, line5x = point1x, line5y = point1y, line5z = point1z;
          line6x = point1x, line6y = point1y, line6z = point1z, line7x = point1x, line7y = point1y, line7z = point1z }};
      if(camera.position.x < -65){
        if(glowloop > -24 && glowloop <= -12){
          line1x = ( point16x + ((-point16x - -point17x)/ 12) * (glowloop - -24));
          line1y = ( point16y + ((-point16y - -point17y)/ 12) * (glowloop - -24));
          line1z = ( point16z + ((-point16z - -point17z)/ 12) * (glowloop - -24))
          line2x = point17x, line2y = point17y, line2z = point17z, line3x = point18x, line3y = point18y, line3z = point18z;
          line4x = point18x, line4y = point18y, line4z = point18z, line5x = point18x, line5y = point18y, line5z = point18z;
          line6x = point18x, line6y = point18y, line6z = point18z, line7x = point1x, line7y = point1y, line7z = point1z };
        if(glowloop > -12 && glowloop <= 0){
          line1x = ( point17x + ((-point17x - -point18x)/ 12) * (glowloop - -12));
          line1y = ( point17y + ((-point17y - -point18y)/ 12) * (glowloop - -12));
          line1z = ( point17z + ((-point17z - -point18z)/ 12) * (glowloop - -12))
          line2x = point18x, line2y = point18y, line2z = point18z, line3x = point18x, line3y = point18y, line3z = point18z;
          line4x = point18x, line4y = point18y, line4z = point18z, line5x = point18x, line5y = point18y, line5z = point18z;
          line6x = point18x, line6y = point18y, line6z = point18z, line7x = point1x, line7y = point1y, line7z = point1z }};
      if(camera.position.x > 65){
        if(glowloop > -24 && glowloop <= -startpointpre12){
          line1x = ( point17x + ((-point17x - -point18x)/ 12) * (glowloop - -24));
          line1y = ( point17y + ((-point17y - -point18y)/ 12) * (glowloop - -24));
          line1z = ( point17z + ((-point17z - -point18z)/ 12) * (glowloop - -24))
          line2x = point18x, line2y = point18y, line2z = point18z, line3x = point18x, line3y = point18y, line3z = point18z;
          line4x = point18x, line4y = point18y, line4z = point18z, line5x = point18x, line5y = point18y, line5z = point18z;
          line6x = point18x, line6y = point18y, line6z = point18z, line7x = point1x, line7y = point1y, line7z = point1z };
        if(glowloop > -12 && glowloop <= 0){
          line1x = ( point18x + ((-point18x - -point1x)/12) * (glowloop - -12));
          line1y = ( point18y + ((-point18y - -point1y)/12) * (glowloop - -12));
          line1z = ( point18z + ((-point18z - -point1z)/12) * (glowloop - -12))
          line2x = point1x, line2y = point1y, line2z = point1z, line3x = point1x, line3y = point1y, line3z = point1z;
          line4x = point1x, line4y = point1y, line4z = point1z, line5x = point1x, line5y = point1y, line5z = point1z;
          line6x = point1x, line6y = point1y, line6z = point1z, line7x = point1x, line7y = point1y, line7z = point1z }
        if(glowloop > -0.5){ status = 0 }}}};
  //console.log( glowloop, glowloopreset);
  /////////////////////////////////
  outerglowingpoints = new MeshLine(), outerglowingpoints.setGeometry( outerglowinggeometry );
  outerglowingmaterial = new MeshLineMaterial({ lineWidth: 3.5, color: crosscolour });
  scene.remove(outerglowingmesh);
  outerglowingmesh = new THREE.Mesh( outerglowingpoints.geometry, outerglowingmaterial );
  scene.add( outerglowingmesh ), outerglowingmesh.geometry.verticesNeedUpdate = true };
function basiccrossclean(){ scene.remove( crosspointsmesh ) };
// cross clean functions;
function glowstaticclean() { scene.remove(glowingmesh) }; // simple remove() command call
function glowringaniclean() { scene.remove(outerglowingmesh) }; // simple remove() command call
function crossscleanR(){
  scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1;
  scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1;
  scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1;
  scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1;
  scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1;
  scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1;
  scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1;
  scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1;
  scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1;
  scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1;
  scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1;
  scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1;
  scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1;
  scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1;
  scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1;
  scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1, scene.remove(lineRmesh[apple]), apple = apple + timerloop1 }
function crossscleanL(){
  scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1;
  scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1;
  scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1;
  scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1;
  scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1;
  scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1;
  scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1;
  scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1;
  scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1;
  scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1;
  scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1;
  scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1;
  scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1;
  scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1;
  scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1;
  scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1, scene.remove(lineLmesh[pear]), pear = pear + timerloop1 }
function crossscleanM(){
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
  scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1, scene.remove(lineMmesh[kiwi]), kiwi = kiwi + timerloop1;
}
function crossscleanB(){
  scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1;
  scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1;
  scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1;
  scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1;
  scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1;
  scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1;
  scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1;
  scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1;
  scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1;
  scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1;
  scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1;
  scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1;
  scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1;
  scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1;
  scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1;
  scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1, scene.remove(lineBmesh[lime]), lime = lime + timerloop1 }
  //=================================================
  // Background Math ////////////////////////////////
  //=================================================
function update() { // start
  glowloop += (beatspersecond / 60 / 100) * 1;
  if ( status == 1){ glowloop = (glowloop - glowloop) - 24, status = 0};
  //glowloop = tock
  if(clock.elapsedTime < 240){
    if(currentbeat == tock){
      if(currentbeat1 == tick){
          tickertick = clock.elapsedTime * (beatspersecond / 60); // bpm calculation
          currentbeat1 = Math.round(tickertick * 8); // rounds off the current beat based on time
        } else { tick = tick + 1 };
      ticker = clock.elapsedTime * (beatspersecond / 60); // bpm calculation
      currentbeat = Math.round(ticker); // rounds off the current beat based on time
    } else { tock = tock + 1, console.log("Current Bar:", tock, "Current Beat:", tick + 4) }};
  clock.getDelta()};
  //=================================================
  // FINAL FINAL rendering //////////////////////////
  //=================================================
function render(){}
