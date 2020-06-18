
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
var corrector, trackerX, trackerY, trackerZ;
/////////////////////////////////
var crosspointsgeometry, crosspoints, crosspointsmaterial, crosspointsmesh;
var outerglowinggeometry, outerglowingpoints, outerglowingmaterial, outerglowingmesh;
/////////////////////////////////
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
var rightcorrector = 0, leftcorrector = 0, i = 0, crossstatus = 0;
var crossloop = [], crossobj, crosscolour = 0xdf1000
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
    point17x = botbotXlineR,    point17y = botbotYlineR,    point17z = botbotZlineR,
    point18x = botbotXlineL,    point18y = botbotYlineL,    point18z = botbotZlineL;
var glowinggeometry, glowingpoints, glowingmaterial, glowingmesh;
/////////////////////////////////
var glowloop = 0, glowloopreset = 0, status = 0, multiplier = 1, staticglow = 0;
/////////////////////////////////
  // 28 - 42 < widened lines
var     crosstrigX = 0.625 / 4,         crosstrigY = 4.21875 / 4,       crosstrigZ = 5.234375 / 4;
var crosssidetrigX = 0.35714285714, crosssidetrigY = 1.71428571429, crosssidetrigZ = 1.42857142857
var scanline = 0.55, statusidle = 0, loopbuffer = 0, scanlinetoggle = 0;
/////////////////////////////////
var line01geometry, line01points, line01mesh, line02geometry, line02points, line02mesh, line03geometry, line03points, line03mesh,
    line04geometry, line04points, line04mesh, line05geometry, line05points, line05mesh, line06geometry, line06points, line06mesh, 
    line07geometry, line07points, line07mesh, line08geometry, line08points, line08mesh, line09geometry, line09points, line09mesh;
var line10geometry, line10points, line10mesh, line11geometry, line11points, line11mesh, line12geometry, line12points, line12mesh,
    line13geometry, line13points, line13mesh, line14geometry, line14points, line14mesh, line15geometry, line15points, line15mesh,
    line16geometry, line16points, line16mesh, line17geometry, line17points, line17mesh, line18geometry, line18points, line18mesh;
var line19geometry, line19points, line19mesh, line20geometry, line20points, line20mesh, line21geometry, line21points, line21mesh,
    line22geometry, line22points, line22mesh, line23geometry, line23points, line23mesh, line24geometry, line24points, line24mesh,
    line25geometry, line25points, line25mesh, line26geometry, line26points, line26mesh, line27geometry, line27points, line27mesh;
var line28geometry, line28points, line28mesh, line29geometry, line29points, line29mesh, line30geometry, line30points, line30mesh,
    line31geometry, line31points, line31mesh, line32geometry, line32points, line32mesh, line33geometry, line33points, line33mesh,
    line34geometry, line34points, line34mesh, line35geometry, line35points, line35mesh, line36geometry, line36points, line36mesh;
var line37geometry, line37points, line37mesh, line38geometry, line38points, line38mesh, line39geometry, line39points, line39mesh,
    line40geometry, line40points, line40mesh, line41geometry, line41points, line41mesh, line42geometry, line42points, line42mesh,
    line43geometry, line43points, line43mesh, line44geometry, line44points, line44mesh, line45geometry, line45points, line45mesh;
var line46geometry, line46points, line46mesh, line47geometry, line47points, line47mesh,
    line48geometry, line48points, line48mesh, line49geometry, line49points, line49mesh,
var line50geometry, line50points, line50mesh, line51geometry, line51points, line51mesh,
    line52geometry, line52points, line52mesh, line53geometry, line53points, line53mesh,
    line54geometry, line54points, line54mesh, line55geometry, line55points, line55mesh,
    line56geometry, line56points, line56mesh, line57geometry, line57points, line57mesh,
    line58geometry, line58points, line58mesh, line59geometry, line59points, line59mesh;
var line60geometry, line60points, line60mesh, line61geometry, line61points, line61mesh,
    line62geometry, line62points, line62mesh, line63geometry, line63points, line63mesh,
    line64geometry, line64points, line64mesh, line65geometry, line65points, line65mesh,
    line66geometry, line66points, line66mesh, line67geometry, line67points, line67mesh,
    line68geometry, line68points, line68mesh, line69geometry, line69points, line69mesh;
var line70geometry, line70points, line70mesh, line71geometry, line71points, line71mesh,
    line72geometry, line72points, line72mesh, line73geometry, line73points, line73mesh,
    line74geometry, line74points, line74mesh, line75geometry, line75points, line75mesh,
    line76geometry, line76points, line76mesh, line77geometry, line77points, line77mesh,
    line78geometry, line78points, line78mesh, line79geometry, line79points, line79mesh;
var line80geometry, line80points, line80mesh, line81geometry, line81points, line81mesh,
    line82geometry, line82points, line82mesh, line83geometry, line83points, line83mesh,
    line84geometry, line84points, line84mesh, line85geometry, line85points, line85mesh,
    line86geometry, line86points, line86mesh, line87geometry, line87points, line87mesh,
    line88geometry, line88points, line88mesh, line89geometry, line89points, line89mesh;
var line90geometry, line90points, line90mesh, line91geometry, line91points, line91mesh,
    line92geometry, line92points, line92mesh, line93geometry, line93points, line93mesh,
    line94geometry, line94points, line94mesh, line95geometry, line95points, line95mesh,
    line96geometry, line96points, line96mesh, line97geometry, line97points, line97mesh,
    line98geometry, line98points, line98mesh, line99geometry, line99points, line99mesh;
var line100geometry, line100points, line100mesh, line101geometry, line101points, line101mesh,
    line102geometry, line102points, line102mesh, line103geometry, line103points, line103mesh,
    line104geometry, line104points, line104mesh, line105geometry, line105points, line105mesh,
    line106geometry, line106points, line106mesh, line107geometry, line107points, line107mesh,
    line108geometry, line108points, line108mesh, line109geometry, line109points, line109mesh;
var line110geometry, line110points, line110mesh, line111geometry, line111points, line111mesh,
    line112geometry, line112points, line112mesh, line113geometry, line113points, line113mesh,
    line114geometry, line114points, line114mesh, line115geometry, line115points, line115mesh,
    line116geometry, line116points, line116mesh, line117geometry, line117points, line117mesh,
    line118geometry, line118points, line118mesh, line119geometry, line119points, line119mesh;
var line120geometry, line120points, line120mesh, line121geometry, line121points, line121mesh,
    line122geometry, line122points, line122mesh, line123geometry, line123points, line123mesh,
    line124geometry, line124points, line124mesh, line125geometry, line125points, line125mesh,
    line126geometry, line126points, line126mesh, line127geometry, line127points, line127mesh,
    line128geometry, line128points, line128mesh;
var linetrigtog = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
/////////////////////////////////
point4x = -57, point4y = 55, point4z = -17
sideLXlineR = -52,   sideLYlineR = 30,  sideLZlineR = -37;
/////////////////////////////////
init(), animate(), update(); // basic functions
/////////////////////////////////
//animation sequences ((call these to generate the animation sequence))
glowringani(), scanlineani(), glowstatic();
//animation cleaning ((call these as an else statement to clean an animation))
scanlineclean(), glowstaticclean(), glowringaniclean();
//calling functions ((these assosiate values to things before tick 1))
crossbinding(), scanlinebinding();

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
  /////////////////////////////////
  //var linegeometry = ["linegeometry0","linegeometry1","linegeometry2","linegeometry3"];
  //var linepoints = ["linepoints0","linepoints1","linepoints2","linepoints3"];
  //var linematerial = ["linematerial","linematerial","linematerial","linematerial"];
  //var counter = 0
  //if(counter < 128){
  //  linegeometry[counter] = new THREE.Geometry(); // CROSS GEOMETRY STORAGE
  //  linegeometry[counter].vertices.push(
  //  new THREE.Vector3((-10 - (crosstrigX * counter)), (100 - (crosstrigY * counter)), (-72.5 + (crosstrigZ * counter))),
  //  new THREE.Vector3(( 10 + (crosstrigX * counter)), (100 - (crosstrigY * counter)), (-72.5 + (crosstrigZ * counter))));
  //  linematerial[counter] = new MeshLine(), linepoints[counter].setGeometry( linegeometry[counter] );
  //  linematerial[counter] = new MeshLineMaterial({ lineWidth: scanline, color: crosscolour });
  //  counter = counter + 1};
//=================================================
// SCENE res and adjustment ///////////////////////
//=================================================
  var gridXZ = new THREE.GridHelper(100, 10);
  gridXZ.setColors( new THREE.Color(0xff0000), new THREE.Color(0xffffff) );
  //scene.add(gridXZ);
  document.body.appendChild(renderer.domElement)};

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight)};

function animate() {
    corrector = camera.position.x;
    correctorPi = camera.rotation.y;
    requestAnimationFrame( animate );
  //=================================================
  // Variable Storage ///////////////////////////////
  //=================================================
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
      sideRXlineL = (-corrector / (Math.PI * 1.94)) + 24.4; // continuation of (TBR)
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
      sideRXlineR = ( -correctorPi * (Math.PI * (Math.PI * Math.PI) - (Math.PI + Math.PI) ) + 52 - ((Math.PI + Math.PI + 1) * 2) + 2);
      sideRYlineR = (( -correctorPi * (Math.PI * (Math.PI * Math.PI) - (Math.PI) ) + 30 - (Math.PI + Math.PI) - Math.PI) - Math.PI + 2);
      sideRZlineR = (( -correctorPi * (Math.PI * Math.PI)) - 37);
      sideRXlineL = sideRXlineR, sideRYlineL = sideRYlineR, sideRZlineL = sideRZlineR };
    if(camera.position.x < -155) {
      midtopXlineL = (-corrector / (Math.PI * 20)) - 50;
      midtopYlineL = (corrector / (Math.PI * 16)) + 58;
      midtopZlineL = (corrector / (Math.PI * 20)) - 50;
      midbottomYlineL = 30, midbottomZlineL = -37 };
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
      sideLXlineL = (-corrector / (Math.PI * 1.96)) - 24.4 };//(TBL)
    if(camera.position.x > -57) { botbotXlineL = (corrector / (Math.PI * 4)) - 22}; //(ABL)
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
    if(camera.position.x > 155) {
      midtopXlineR = (-corrector / (Math.PI * 20)) + 50;
      midtopYlineR = (-corrector / (Math.PI * 16)) + 58;
      midtopZlineR = (-corrector / (Math.PI * 20)) - 50;
      midbottomYlineR = 30, midbottomZlineR = -37 };
    if(camera.position.x > 170) {
      sideLXlineL = -( correctorPi * (Math.PI * (Math.PI * Math.PI) - (Math.PI + Math.PI) ) + 52 - ((Math.PI + Math.PI + 1) * 2) + 2);
      sideLYlineL = (( correctorPi * (Math.PI * (Math.PI * Math.PI) - (Math.PI) ) + 30 - (Math.PI + Math.PI) - Math.PI) - Math.PI + 2);
      sideLZlineL = (( correctorPi * (Math.PI * Math.PI)) - 37);
      sideLXlineR = sideLXlineL, sideLYlineR = sideLYlineL, sideLZlineR = sideLZlineL };
    ///////////////////////////////// Additional geometry patches
    if(camera.position.x > 110  && camera.position.x < 170 ) { leftcorrector = 1 };
    if(camera.position.x < -110  && camera.position.x > -170 ) { rightcorrector = 1 };
    /////////////////////////////////
    scene.remove(crosspointsmesh); // unrendering

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
    crosspointsmesh = new THREE.Mesh( crosspoints.geometry, crosspointsmaterial );
    crosspointsmesh.geometry.verticesNeedUpdate = true, scene.add( crosspointsmesh );

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
  if(tock < 1){ scanlinebinding() };
  if(tock < 1){ crossbinding() };
  var debug = 0
  var section1start = 0, section2start = 50, section3start = 90;
  //glowstatic();
    if(tock >= debug && tock < section1start){
      glowringani();
    } else { scene.remove(outerglowingmesh) };
    if(tock > section1start && tock < section2start){
      scanlineani();
      if ( loopbuffer <= 128){ loopbuffer = loopbuffer + 1 } else { loopbuffer = 1 };
      linetrigtog[loopbuffer] = 1, linetrigtog[loopbuffer - 25] = 0;
      if ( loopbuffer >= 0 && loopbuffer < 25) { linetrigtog[loopbuffer + (128 - 25)] = 0 }
    } else { scanlineclean() };

  //=================================================
  // Other animation storage ////////////////////////
  //=================================================
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
    trackerX = camera.position.x, trackerY = camera.position.y, trackerZ = camera.position.Z;
    renderer.render(scene, camera), camera.lookAt( scene.position ), camera.updateMatrixWorld();
    controls.update(), update(), render() };

  //=================================================
  // animation functions ////////////////////////////
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
function scanlinebinding() {
    linematerial = new MeshLineMaterial({ lineWidth: scanline, color: crosscolour });
    line01geometry = new THREE.Geometry(), line01geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 1)), (100 - (crosstrigY * 1)), (-72.5 + (crosstrigZ * 1))),
      new THREE.Vector3(( 10 + (crosstrigX * 1)), (100 - (crosstrigY * 1)), (-72.5 + (crosstrigZ * 1))));
    line01points = new MeshLine(), line01points.setGeometry( line01geometry ); //b
    line02geometry = new THREE.Geometry(), line02geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 2)), (100 - (crosstrigY * 2)), (-72.5 + (crosstrigZ * 2))),
      new THREE.Vector3(( 10 + (crosstrigX * 2)), (100 - (crosstrigY * 2)), (-72.5 + (crosstrigZ * 2))));
    line02points = new MeshLine(), line02points.setGeometry( line02geometry ); //b
    line03geometry = new THREE.Geometry(), line03geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 3)), (100 - (crosstrigY * 3)), (-72.5 + (crosstrigZ * 3))),
      new THREE.Vector3(( 10 + (crosstrigX * 3)), (100 - (crosstrigY * 3)), (-72.5 + (crosstrigZ * 3))));
    line03points = new MeshLine(), line03points.setGeometry( line03geometry ); //b
    line04geometry = new THREE.Geometry(), line04geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 4)), (100 - (crosstrigY * 4)), (-72.5 + (crosstrigZ * 4))),
      new THREE.Vector3(( 10 + (crosstrigX * 4)), (100 - (crosstrigY * 4)), (-72.5 + (crosstrigZ * 4))));
    line04points = new MeshLine(), line04points.setGeometry( line04geometry ); //b
    line05geometry = new THREE.Geometry(), line05geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 5)), (100 - (crosstrigY * 5)), (-72.5 + (crosstrigZ * 5))),
      new THREE.Vector3(( 10 + (crosstrigX * 5)), (100 - (crosstrigY * 5)), (-72.5 + (crosstrigZ * 5))));
    line05points = new MeshLine(), line05points.setGeometry( line05geometry ); //b
    line06geometry = new THREE.Geometry(), line06geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 6)), (100 - (crosstrigY * 6)), (-72.5 + (crosstrigZ * 6))),
      new THREE.Vector3(( 10 + (crosstrigX * 6)), (100 - (crosstrigY * 6)), (-72.5 + (crosstrigZ * 6))));
    line06points = new MeshLine(), line06points.setGeometry( line06geometry ); //b
    line07geometry = new THREE.Geometry(), line07geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 7)), (100 - (crosstrigY * 7)), (-72.5 + (crosstrigZ * 7))),
      new THREE.Vector3(( 10 + (crosstrigX * 7)), (100 - (crosstrigY * 7)), (-72.5 + (crosstrigZ * 7))));
    line07points = new MeshLine(), line07points.setGeometry( line07geometry ); //b
    line08geometry = new THREE.Geometry(), line08geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 8)), (100 - (crosstrigY * 8)), (-72.5 + (crosstrigZ * 8))),
      new THREE.Vector3(( 10 + (crosstrigX * 8)), (100 - (crosstrigY * 8)), (-72.5 + (crosstrigZ * 8))));
    line08points = new MeshLine(), line08points.setGeometry( line08geometry ); //b
    line09geometry = new THREE.Geometry(), line09geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 9)), (100 - (crosstrigY * 9)), (-72.5 + (crosstrigZ * 9))),
      new THREE.Vector3(( 10 + (crosstrigX * 9)), (100 - (crosstrigY * 9)), (-72.5 + (crosstrigZ * 9))));
    line09points = new MeshLine(), line09points.setGeometry( line09geometry ); //b
    line10geometry = new THREE.Geometry(), line10geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 10)), (100 - (crosstrigY * 10)), (-72.5 + (crosstrigZ * 10))),
      new THREE.Vector3(( 10 + (crosstrigX * 10)), (100 - (crosstrigY * 10)), (-72.5 + (crosstrigZ * 10))));
    line10points = new MeshLine(), line10points.setGeometry( line10geometry ); //b
    /////////////////////////////////
    line11geometry = new THREE.Geometry(), line11geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 11)), (100 - (crosstrigY * 11)), (-72.5 + (crosstrigZ * 11))),
      new THREE.Vector3(( 10 + (crosstrigX * 11)), (100 - (crosstrigY * 11)), (-72.5 + (crosstrigZ * 11))));
    line11points = new MeshLine(), line11points.setGeometry( line11geometry ); //b
    line12geometry = new THREE.Geometry(), line12geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 12)), (100 - (crosstrigY * 12)), (-72.5 + (crosstrigZ * 12))),
      new THREE.Vector3(( 10 + (crosstrigX * 12)), (100 - (crosstrigY * 12)), (-72.5 + (crosstrigZ * 12))));
    line12points = new MeshLine(), line12points.setGeometry( line12geometry ); //b
    line13geometry = new THREE.Geometry(), line13geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 13)), (100 - (crosstrigY * 13)), (-72.5 + (crosstrigZ * 13))),
      new THREE.Vector3(( 10 + (crosstrigX * 13)), (100 - (crosstrigY * 13)), (-72.5 + (crosstrigZ * 13))));
    line13points = new MeshLine(), line13points.setGeometry( line13geometry ); //b
    line14geometry = new THREE.Geometry(), line14geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 14)), (100 - (crosstrigY * 14)), (-72.5 + (crosstrigZ * 14))),
      new THREE.Vector3(( 10 + (crosstrigX * 14)), (100 - (crosstrigY * 14)), (-72.5 + (crosstrigZ * 14))));
    line14points = new MeshLine(), line14points.setGeometry( line14geometry ); //b
    line15geometry = new THREE.Geometry(), line15geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 15)), (100 - (crosstrigY * 15)), (-72.5 + (crosstrigZ * 15))),
      new THREE.Vector3(( 10 + (crosstrigX * 15)), (100 - (crosstrigY * 15)), (-72.5 + (crosstrigZ * 15))));
    line15points = new MeshLine(), line15points.setGeometry( line15geometry ); //b
    line16geometry = new THREE.Geometry(), line16geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 16)), (100 - (crosstrigY * 16)), (-72.5 + (crosstrigZ * 16))),
      new THREE.Vector3(( 10 + (crosstrigX * 16)), (100 - (crosstrigY * 16)), (-72.5 + (crosstrigZ * 16))));
    line16points = new MeshLine(), line16points.setGeometry( line16geometry ); //b
    line17geometry = new THREE.Geometry(), line17geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 17)), (100 - (crosstrigY * 17)), (-72.5 + (crosstrigZ * 17))),
      new THREE.Vector3(( 10 + (crosstrigX * 17)), (100 - (crosstrigY * 17)), (-72.5 + (crosstrigZ * 17))));
    line17points = new MeshLine(), line17points.setGeometry( line17geometry ); //b
    line18geometry = new THREE.Geometry(), line18geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 18)), (100 - (crosstrigY * 18)), (-72.5 + (crosstrigZ * 18))),
      new THREE.Vector3(( 10 + (crosstrigX * 18)), (100 - (crosstrigY * 18)), (-72.5 + (crosstrigZ * 18))));
    line18points = new MeshLine(), line18points.setGeometry( line18geometry ); //b
    line19geometry = new THREE.Geometry(), line19geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 19)), (100 - (crosstrigY * 19)), (-72.5 + (crosstrigZ * 19))),
      new THREE.Vector3(( 10 + (crosstrigX * 19)), (100 - (crosstrigY * 19)), (-72.5 + (crosstrigZ * 19))));
    line19points = new MeshLine(), line19points.setGeometry( line19geometry ); //b
    line20geometry = new THREE.Geometry(), line20geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 20)), (100 - (crosstrigY * 20)), (-72.5 + (crosstrigZ * 20))),
      new THREE.Vector3(( 10 + (crosstrigX * 20)), (100 - (crosstrigY * 20)), (-72.5 + (crosstrigZ * 20))));
    line20points = new MeshLine(), line20points.setGeometry( line20geometry ); //b
    /////////////////////////////////
    line21geometry = new THREE.Geometry(), line21geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 21)), (100 - (crosstrigY * 21)), (-72.5 + (crosstrigZ * 21))),
      new THREE.Vector3(( 10 + (crosstrigX * 21)), (100 - (crosstrigY * 21)), (-72.5 + (crosstrigZ * 21))));
    line21points = new MeshLine(), line21points.setGeometry( line21geometry ); //b
    line22geometry = new THREE.Geometry(), line22geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 22)), (100 - (crosstrigY * 22)), (-72.5 + (crosstrigZ * 22))),
      new THREE.Vector3(( 10 + (crosstrigX * 22)), (100 - (crosstrigY * 22)), (-72.5 + (crosstrigZ * 22))));
    line22points = new MeshLine(), line22points.setGeometry( line22geometry ); //b
    line23geometry = new THREE.Geometry(), line23geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 23)), (100 - (crosstrigY * 23)), (-72.5 + (crosstrigZ * 23))),
      new THREE.Vector3(( 10 + (crosstrigX * 23)), (100 - (crosstrigY * 23)), (-72.5 + (crosstrigZ * 23))));
    line23points = new MeshLine(), line23points.setGeometry( line23geometry ); //b
    line24geometry = new THREE.Geometry(), line24geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 24)), (100 - (crosstrigY * 24)), (-72.5 + (crosstrigZ * 24))),
      new THREE.Vector3(( 10 + (crosstrigX * 24)), (100 - (crosstrigY * 24)), (-72.5 + (crosstrigZ * 24))));
    line24points = new MeshLine(), line24points.setGeometry( line24geometry ); //b
    line25geometry = new THREE.Geometry(), line25geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 25)), (100 - (crosstrigY * 25)), (-72.5 + (crosstrigZ * 25))),
      new THREE.Vector3(( 10 + (crosstrigX * 25)), (100 - (crosstrigY * 25)), (-72.5 + (crosstrigZ * 25))));
    line25points = new MeshLine(), line25points.setGeometry( line25geometry ); //b
    line26geometry = new THREE.Geometry(), line26geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 26)), (100 - (crosstrigY * 26)), (-72.5 + (crosstrigZ * 26))),
      new THREE.Vector3(( 10 + (crosstrigX * 26)), (100 - (crosstrigY * 26)), (-72.5 + (crosstrigZ * 26))));
    line26points = new MeshLine(), line26points.setGeometry( line26geometry ); //b
    line27geometry = new THREE.Geometry(), line27geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 27)), (100 - (crosstrigY * 27)), (-72.5 + (crosstrigZ * 27))),
      new THREE.Vector3(( 10 + (crosstrigX * 27)), (100 - (crosstrigY * 27)), (-72.5 + (crosstrigZ * 27))));
    line27points = new MeshLine(), line27points.setGeometry( line27geometry ); //b
    line28geometry = new THREE.Geometry(), line28geometry.vertices.push(
      new THREE.Vector3((-52 - (crosssidetrigX * 1)), (100 - (crosstrigY * 28)), (-72.5 + (crosstrigZ * 28))),
      new THREE.Vector3(( 52 + (crosssidetrigX * 1)), (100 - (crosstrigY * 28)), (-72.5 + (crosstrigZ * 28))));
    line28points = new MeshLine(), line28points.setGeometry( line28geometry ); //b
    line29geometry = new THREE.Geometry(), line29geometry.vertices.push(
      new THREE.Vector3((-52 - (crosssidetrigX * 2)), (100 - (crosstrigY * 29)), (-72.5 + (crosstrigZ * 29))),
      new THREE.Vector3(( 52 + (crosssidetrigX * 2)), (100 - (crosstrigY * 29)), (-72.5 + (crosstrigZ * 29))));
    line29points = new MeshLine(), line29points.setGeometry( line29geometry ); //b
    line30geometry = new THREE.Geometry(), line30geometry.vertices.push(
      new THREE.Vector3((-52 - (crosssidetrigX * 3)), (100 - (crosstrigY * 30)), (-72.5 + (crosstrigZ * 30))),
      new THREE.Vector3(( 52 + (crosssidetrigX * 3)), (100 - (crosstrigY * 30)), (-72.5 + (crosstrigZ * 30))));
    line30points = new MeshLine(), line30points.setGeometry( line30geometry ); //b
    /////////////////////////////////
    line31geometry = new THREE.Geometry(), line31geometry.vertices.push(
      new THREE.Vector3((-52 - (crosssidetrigX * 4)), (100 - (crosstrigY * 31)), (-72.5 + (crosstrigZ * 31))),
      new THREE.Vector3(( 52 + (crosssidetrigX * 4)), (100 - (crosstrigY * 31)), (-72.5 + (crosstrigZ * 31))));
    line31points = new MeshLine(), line31points.setGeometry( line31geometry ); //b
    line32geometry = new THREE.Geometry(), line32geometry.vertices.push(
      new THREE.Vector3((-52 - (crosssidetrigX * 5)), (100 - (crosstrigY * 32)), (-72.5 + (crosstrigZ * 32))),
      new THREE.Vector3(( 52 + (crosssidetrigX * 5)), (100 - (crosstrigY * 32)), (-72.5 + (crosstrigZ * 32))));
    line32points = new MeshLine(), line32points.setGeometry( line32geometry ); //b
    line33geometry = new THREE.Geometry(), line33geometry.vertices.push(
      new THREE.Vector3((-52 - (crosssidetrigX * 6)), (100 - (crosstrigY * 33)), (-72.5 + (crosstrigZ * 33))),
      new THREE.Vector3(( 52 + (crosssidetrigX * 6)), (100 - (crosstrigY * 33)), (-72.5 + (crosstrigZ * 33))));
    line33points = new MeshLine(), line33points.setGeometry( line33geometry ); //b
    line34geometry = new THREE.Geometry(), line34geometry.vertices.push(
      new THREE.Vector3((-52 - (crosssidetrigX * 7)), (100 - (crosstrigY * 34)), (-72.5 + (crosstrigZ * 34))),
      new THREE.Vector3(( 52 + (crosssidetrigX * 7)), (100 - (crosstrigY * 34)), (-72.5 + (crosstrigZ * 34))));
    line34points = new MeshLine(), line34points.setGeometry( line34geometry ); //b
    line35geometry = new THREE.Geometry(), line35geometry.vertices.push(
      new THREE.Vector3((-52 - (crosssidetrigX * 8)), (100 - (crosstrigY * 35)), (-72.5 + (crosstrigZ * 35))),
      new THREE.Vector3(( 52 + (crosssidetrigX * 8)), (100 - (crosstrigY * 35)), (-72.5 + (crosstrigZ * 35))));
    line35points = new MeshLine(), line35points.setGeometry( line35geometry ); //b
    line36geometry = new THREE.Geometry(), line36geometry.vertices.push(
      new THREE.Vector3((-52 - (crosssidetrigX * 9)), (100 - (crosstrigY * 36)), (-72.5 + (crosstrigZ * 36))),
      new THREE.Vector3(( 52 + (crosssidetrigX * 9)), (100 - (crosstrigY * 36)), (-72.5 + (crosstrigZ * 36))));
    line36points = new MeshLine(), line36points.setGeometry( line36geometry ); //b
    line37geometry = new THREE.Geometry(), line37geometry.vertices.push(
      new THREE.Vector3((-52 - (crosssidetrigX * 10)), (100 - (crosstrigY * 37)), (-72.5 + (crosstrigZ * 37))),
      new THREE.Vector3(( 52 + (crosssidetrigX * 10)), (100 - (crosstrigY * 37)), (-72.5 + (crosstrigZ * 37))));
    line37points = new MeshLine(), line37points.setGeometry( line37geometry ); //b
    line38geometry = new THREE.Geometry(), line38geometry.vertices.push(
      new THREE.Vector3((-52 - (crosssidetrigX * 11)), (100 - (crosstrigY * 38)), (-72.5 + (crosstrigZ * 38))),
      new THREE.Vector3(( 52 + (crosssidetrigX * 11)), (100 - (crosstrigY * 38)), (-72.5 + (crosstrigZ * 38))));
    line38points = new MeshLine(), line38points.setGeometry( line38geometry ); //b
    line39geometry = new THREE.Geometry(), line39geometry.vertices.push(
      new THREE.Vector3((-52 - (crosssidetrigX * 12)), (100 - (crosstrigY * 39)), (-72.5 + (crosstrigZ * 39))),
      new THREE.Vector3(( 52 + (crosssidetrigX * 12)), (100 - (crosstrigY * 39)), (-72.5 + (crosstrigZ * 39))));
    line39points = new MeshLine(), line39points.setGeometry( line39geometry ); //b
    line40geometry = new THREE.Geometry(), line40geometry.vertices.push(
      new THREE.Vector3((-52 - (crosssidetrigX * 13)), (100 - (crosstrigY * 40)), (-72.5 + (crosstrigZ * 40))),
      new THREE.Vector3(( 52 + (crosssidetrigX * 13)), (100 - (crosstrigY * 40)), (-72.5 + (crosstrigZ * 40))));
    line40points = new MeshLine(), line40points.setGeometry( line40geometry ); //b
    /////////////////////////////////
    line41geometry = new THREE.Geometry(), line41geometry.vertices.push(
      new THREE.Vector3((-52 - (crosssidetrigX * 14)), (100 - (crosstrigY * 41)), (-72.5 + (crosstrigZ * 41))),
      new THREE.Vector3(( 52 + (crosssidetrigX * 14)), (100 - (crosstrigY * 41)), (-72.5 + (crosstrigZ * 41))));
    line41points = new MeshLine(), line41points.setGeometry( line41geometry ); //b
    line42geometry = new THREE.Geometry(), line42geometry.vertices.push(
      new THREE.Vector3((-52 - (crosssidetrigX * 14)), (100 - (crosstrigY * 42)), (-72.5 + (crosstrigZ * 42))),
      new THREE.Vector3(( 52 + (crosssidetrigX * 14)), (100 - (crosstrigY * 42)), (-72.5 + (crosstrigZ * 42))));
    line42points = new MeshLine(), line42points.setGeometry( line42geometry ); //b
    line43geometry = new THREE.Geometry(), line43geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 43)), (100 - (crosstrigY * 43)), (-72.5 + (crosstrigZ * 43))),
      new THREE.Vector3(( 10 + (crosstrigX * 43)), (100 - (crosstrigY * 43)), (-72.5 + (crosstrigZ * 43))));
    line43points = new MeshLine(), line43points.setGeometry( line43geometry ); //b
    line44geometry = new THREE.Geometry(), line44geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 44)), (100 - (crosstrigY * 44)), (-72.5 + (crosstrigZ * 44))),
      new THREE.Vector3(( 10 + (crosstrigX * 44)), (100 - (crosstrigY * 44)), (-72.5 + (crosstrigZ * 44))));
    line44points = new MeshLine(), line44points.setGeometry( line44geometry ); //b
    line45geometry = new THREE.Geometry(), line45geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 45)), (100 - (crosstrigY * 45)), (-72.5 + (crosstrigZ * 45))),
      new THREE.Vector3(( 10 + (crosstrigX * 45)), (100 - (crosstrigY * 45)), (-72.5 + (crosstrigZ * 45))));
    line45points = new MeshLine(), line45points.setGeometry( line45geometry ); //b
    line46geometry = new THREE.Geometry(), line46geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 46)), (100 - (crosstrigY * 46)), (-72.5 + (crosstrigZ * 46))),
      new THREE.Vector3(( 10 + (crosstrigX * 46)), (100 - (crosstrigY * 46)), (-72.5 + (crosstrigZ * 46))));
    line46points = new MeshLine(), line46points.setGeometry( line46geometry ); //b
    line47geometry = new THREE.Geometry(), line47geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 47)), (100 - (crosstrigY * 47)), (-72.5 + (crosstrigZ * 47))),
      new THREE.Vector3(( 10 + (crosstrigX * 47)), (100 - (crosstrigY * 47)), (-72.5 + (crosstrigZ * 47))));
    line47points = new MeshLine(), line47points.setGeometry( line47geometry ); //b
    line48geometry = new THREE.Geometry(), line48geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 48)), (100 - (crosstrigY * 48)), (-72.5 + (crosstrigZ * 48))),
      new THREE.Vector3(( 10 + (crosstrigX * 48)), (100 - (crosstrigY * 48)), (-72.5 + (crosstrigZ * 48))));
    line48points = new MeshLine(), line48points.setGeometry( line48geometry ); //b
    line49geometry = new THREE.Geometry(), line49geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 49)), (100 - (crosstrigY * 49)), (-72.5 + (crosstrigZ * 49))),
      new THREE.Vector3(( 10 + (crosstrigX * 49)), (100 - (crosstrigY * 49)), (-72.5 + (crosstrigZ * 49))));
    line49points = new MeshLine(), line49points.setGeometry( line49geometry ); //b
    line50geometry = new THREE.Geometry(), line50geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 50)), (100 - (crosstrigY * 50)), (-72.5 + (crosstrigZ * 50))),
      new THREE.Vector3(( 10 + (crosstrigX * 50)), (100 - (crosstrigY * 50)), (-72.5 + (crosstrigZ * 50))));
    line50points = new MeshLine(), line50points.setGeometry( line50geometry ); //b
    /////////////////////////////////
    line51geometry = new THREE.Geometry(), line51geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 51)), (100 - (crosstrigY * 51)), (-72.5 + (crosstrigZ * 51))),
      new THREE.Vector3(( 10 + (crosstrigX * 51)), (100 - (crosstrigY * 51)), (-72.5 + (crosstrigZ * 51))));
    line51points = new MeshLine(), line51points.setGeometry( line51geometry ); //b
    line52geometry = new THREE.Geometry(), line52geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 52)), (100 - (crosstrigY * 52)), (-72.5 + (crosstrigZ * 52))),
      new THREE.Vector3(( 10 + (crosstrigX * 52)), (100 - (crosstrigY * 52)), (-72.5 + (crosstrigZ * 52))));
    line52points = new MeshLine(), line52points.setGeometry( line52geometry ); //b
    line53geometry = new THREE.Geometry(), line53geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 53)), (100 - (crosstrigY * 53)), (-72.5 + (crosstrigZ * 53))),
      new THREE.Vector3(( 10 + (crosstrigX * 53)), (100 - (crosstrigY * 53)), (-72.5 + (crosstrigZ * 53))));
    line53points = new MeshLine(), line53points.setGeometry( line53geometry ); //b
    line54geometry = new THREE.Geometry(), line54geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 54)), (100 - (crosstrigY * 54)), (-72.5 + (crosstrigZ * 54))),
      new THREE.Vector3(( 10 + (crosstrigX * 54)), (100 - (crosstrigY * 54)), (-72.5 + (crosstrigZ * 54))));
    line54points = new MeshLine(), line54points.setGeometry( line54geometry ); //b
    line55geometry = new THREE.Geometry(), line55geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 55)), (100 - (crosstrigY * 55)), (-72.5 + (crosstrigZ * 55))),
      new THREE.Vector3(( 10 + (crosstrigX * 55)), (100 - (crosstrigY * 55)), (-72.5 + (crosstrigZ * 55))));
    line55points = new MeshLine(), line55points.setGeometry( line55geometry ); //b
    line56geometry = new THREE.Geometry(), line56geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 56)), (100 - (crosstrigY * 56)), (-72.5 + (crosstrigZ * 56))),
      new THREE.Vector3(( 10 + (crosstrigX * 56)), (100 - (crosstrigY * 56)), (-72.5 + (crosstrigZ * 56))));
    line56points = new MeshLine(), line56points.setGeometry( line56geometry ); //b
    line57geometry = new THREE.Geometry(), line57geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 57)), (100 - (crosstrigY * 57)), (-72.5 + (crosstrigZ * 57))),
      new THREE.Vector3(( 10 + (crosstrigX * 57)), (100 - (crosstrigY * 57)), (-72.5 + (crosstrigZ * 57))));
    line57points = new MeshLine(), line57points.setGeometry( line57geometry ); //b
    line58geometry = new THREE.Geometry(), line58geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 58)), (100 - (crosstrigY * 58)), (-72.5 + (crosstrigZ * 58))),
      new THREE.Vector3(( 10 + (crosstrigX * 58)), (100 - (crosstrigY * 58)), (-72.5 + (crosstrigZ * 58))));
    line58points = new MeshLine(), line58points.setGeometry( line58geometry ); //b
    line59geometry = new THREE.Geometry(), line59geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 59)), (100 - (crosstrigY * 59)), (-72.5 + (crosstrigZ * 59))),
      new THREE.Vector3(( 10 + (crosstrigX * 59)), (100 - (crosstrigY * 59)), (-72.5 + (crosstrigZ * 59))));
    line59points = new MeshLine(), line59points.setGeometry( line59geometry ); //b
    line60geometry = new THREE.Geometry(), line60geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 60)), (100 - (crosstrigY * 60)), (-72.5 + (crosstrigZ * 60))),
      new THREE.Vector3(( 10 + (crosstrigX * 60)), (100 - (crosstrigY * 60)), (-72.5 + (crosstrigZ * 60))));
    line60points = new MeshLine(), line60points.setGeometry( line60geometry ); //b
    /////////////////////////////////
    line61geometry = new THREE.Geometry(), line61geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 61)), (100 - (crosstrigY * 61)), (-72.5 + (crosstrigZ * 61))),
      new THREE.Vector3(( 10 + (crosstrigX * 61)), (100 - (crosstrigY * 61)), (-72.5 + (crosstrigZ * 61))));
    line61points = new MeshLine(), line61points.setGeometry( line61geometry ); //b
    line62geometry = new THREE.Geometry(), line62geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 62)), (100 - (crosstrigY * 62)), (-72.5 + (crosstrigZ * 62))),
      new THREE.Vector3(( 10 + (crosstrigX * 62)), (100 - (crosstrigY * 62)), (-72.5 + (crosstrigZ * 62))));
    line62points = new MeshLine(), line62points.setGeometry( line62geometry ); //b
    line63geometry = new THREE.Geometry(), line63geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 63)), (100 - (crosstrigY * 63)), (-72.5 + (crosstrigZ * 63))),
      new THREE.Vector3(( 10 + (crosstrigX * 63)), (100 - (crosstrigY * 63)), (-72.5 + (crosstrigZ * 63))));
    line63points = new MeshLine(), line63points.setGeometry( line63geometry ); //b
    line64geometry = new THREE.Geometry(), line64geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 64)), (100 - (crosstrigY * 64)), (-72.5 + (crosstrigZ * 64))),
      new THREE.Vector3(( 10 + (crosstrigX * 64)), (100 - (crosstrigY * 64)), (-72.5 + (crosstrigZ * 64))));
    line64points = new MeshLine(), line64points.setGeometry( line64geometry ); //b
    line65geometry = new THREE.Geometry(), line65geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 65)), (100 - (crosstrigY * 65)), (-72.5 + (crosstrigZ * 65))),
      new THREE.Vector3(( 10 + (crosstrigX * 65)), (100 - (crosstrigY * 65)), (-72.5 + (crosstrigZ * 65))));
    line65points = new MeshLine(), line65points.setGeometry( line65geometry ); //b
    line66geometry = new THREE.Geometry(), line66geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 66)), (100 - (crosstrigY * 66)), (-72.5 + (crosstrigZ * 66))),
      new THREE.Vector3(( 10 + (crosstrigX * 66)), (100 - (crosstrigY * 66)), (-72.5 + (crosstrigZ * 66))));
    line66points = new MeshLine(), line66points.setGeometry( line66geometry ); //b
    line67geometry = new THREE.Geometry(), line67geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 67)), (100 - (crosstrigY * 67)), (-72.5 + (crosstrigZ * 67))),
      new THREE.Vector3(( 10 + (crosstrigX * 67)), (100 - (crosstrigY * 67)), (-72.5 + (crosstrigZ * 67))));
    line67points = new MeshLine(), line67points.setGeometry( line67geometry ); //b
    line68geometry = new THREE.Geometry(), line68geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 68)), (100 - (crosstrigY * 68)), (-72.5 + (crosstrigZ * 68))),
      new THREE.Vector3(( 10 + (crosstrigX * 68)), (100 - (crosstrigY * 68)), (-72.5 + (crosstrigZ * 68))));
    line68points = new MeshLine(), line68points.setGeometry( line68geometry ); //b
    line69geometry = new THREE.Geometry(), line69geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 69)), (100 - (crosstrigY * 69)), (-72.5 + (crosstrigZ * 69))),
      new THREE.Vector3(( 10 + (crosstrigX * 69)), (100 - (crosstrigY * 69)), (-72.5 + (crosstrigZ * 69))));
    line69points = new MeshLine(), line69points.setGeometry( line69geometry ); //b
    line70geometry = new THREE.Geometry(), line70geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 70)), (100 - (crosstrigY * 70)), (-72.5 + (crosstrigZ * 70))),
      new THREE.Vector3(( 10 + (crosstrigX * 70)), (100 - (crosstrigY * 70)), (-72.5 + (crosstrigZ * 70))));
    line70points = new MeshLine(), line70points.setGeometry( line70geometry ); //b
    /////////////////////////////////
    line71geometry = new THREE.Geometry(), line71geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 71)), (100 - (crosstrigY * 71)), (-72.5 + (crosstrigZ * 71))),
      new THREE.Vector3(( 10 + (crosstrigX * 71)), (100 - (crosstrigY * 71)), (-72.5 + (crosstrigZ * 71))));
    line71points = new MeshLine(), line71points.setGeometry( line71geometry ); //b
    line72geometry = new THREE.Geometry(), line72geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 72)), (100 - (crosstrigY * 72)), (-72.5 + (crosstrigZ * 72))),
      new THREE.Vector3(( 10 + (crosstrigX * 72)), (100 - (crosstrigY * 72)), (-72.5 + (crosstrigZ * 72))));
    line72points = new MeshLine(), line72points.setGeometry( line72geometry ); //b
    line73geometry = new THREE.Geometry(), line73geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 73)), (100 - (crosstrigY * 73)), (-72.5 + (crosstrigZ * 73))),
      new THREE.Vector3(( 10 + (crosstrigX * 73)), (100 - (crosstrigY * 73)), (-72.5 + (crosstrigZ * 73))));
    line73points = new MeshLine(), line73points.setGeometry( line73geometry ); //b
    line74geometry = new THREE.Geometry(), line74geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 74)), (100 - (crosstrigY * 74)), (-72.5 + (crosstrigZ * 74))),
      new THREE.Vector3(( 10 + (crosstrigX * 74)), (100 - (crosstrigY * 74)), (-72.5 + (crosstrigZ * 74))));
    line74points = new MeshLine(), line74points.setGeometry( line74geometry ); //b
    line75geometry = new THREE.Geometry(), line75geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 75)), (100 - (crosstrigY * 75)), (-72.5 + (crosstrigZ * 75))),
      new THREE.Vector3(( 10 + (crosstrigX * 75)), (100 - (crosstrigY * 75)), (-72.5 + (crosstrigZ * 75))));
    line75points = new MeshLine(), line75points.setGeometry( line75geometry ); //b
    line76geometry = new THREE.Geometry(), line76geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 76)), (100 - (crosstrigY * 76)), (-72.5 + (crosstrigZ * 76))),
      new THREE.Vector3(( 10 + (crosstrigX * 76)), (100 - (crosstrigY * 76)), (-72.5 + (crosstrigZ * 76))));
    line76points = new MeshLine(), line76points.setGeometry( line76geometry ); //b
    line77geometry = new THREE.Geometry(), line77geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 77)), (100 - (crosstrigY * 77)), (-72.5 + (crosstrigZ * 77))),
      new THREE.Vector3(( 10 + (crosstrigX * 77)), (100 - (crosstrigY * 77)), (-72.5 + (crosstrigZ * 77))));
    line77points = new MeshLine(), line77points.setGeometry( line77geometry ); //b
    line78geometry = new THREE.Geometry(), line78geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 78)), (100 - (crosstrigY * 78)), (-72.5 + (crosstrigZ * 78))),
      new THREE.Vector3(( 10 + (crosstrigX * 78)), (100 - (crosstrigY * 78)), (-72.5 + (crosstrigZ * 78))));
    line78points = new MeshLine(), line78points.setGeometry( line78geometry ); //b
    line79geometry = new THREE.Geometry(), line79geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 79)), (100 - (crosstrigY * 79)), (-72.5 + (crosstrigZ * 79))),
      new THREE.Vector3(( 10 + (crosstrigX * 79)), (100 - (crosstrigY * 79)), (-72.5 + (crosstrigZ * 79))));
    line79points = new MeshLine(), line79points.setGeometry( line79geometry ); //b
    line80geometry = new THREE.Geometry(), line80geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 80)), (100 - (crosstrigY * 80)), (-72.5 + (crosstrigZ * 80))),
      new THREE.Vector3(( 10 + (crosstrigX * 80)), (100 - (crosstrigY * 80)), (-72.5 + (crosstrigZ * 80))));
    line80points = new MeshLine(), line80points.setGeometry( line80geometry ); //b
    /////////////////////////////////
    line81geometry = new THREE.Geometry(), line81geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 81)), (100 - (crosstrigY * 81)), (-72.5 + (crosstrigZ * 81))),
      new THREE.Vector3(( 10 + (crosstrigX * 81)), (100 - (crosstrigY * 81)), (-72.5 + (crosstrigZ * 81))));
    line81points = new MeshLine(), line81points.setGeometry( line81geometry ); //b
    line82geometry = new THREE.Geometry(), line82geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 82)), (100 - (crosstrigY * 82)), (-72.5 + (crosstrigZ * 82))),
      new THREE.Vector3(( 10 + (crosstrigX * 82)), (100 - (crosstrigY * 82)), (-72.5 + (crosstrigZ * 82))));
    line82points = new MeshLine(), line82points.setGeometry( line82geometry ); //b
    line83geometry = new THREE.Geometry(), line83geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 83)), (100 - (crosstrigY * 83)), (-72.5 + (crosstrigZ * 83))),
      new THREE.Vector3(( 10 + (crosstrigX * 83)), (100 - (crosstrigY * 83)), (-72.5 + (crosstrigZ * 83))));
    line83points = new MeshLine(), line83points.setGeometry( line83geometry ); //b
    line84geometry = new THREE.Geometry(), line84geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 84)), (100 - (crosstrigY * 84)), (-72.5 + (crosstrigZ * 84))),
      new THREE.Vector3(( 10 + (crosstrigX * 84)), (100 - (crosstrigY * 84)), (-72.5 + (crosstrigZ * 84))));
    line84points = new MeshLine(), line84points.setGeometry( line84geometry ); //b
    line85geometry = new THREE.Geometry(), line85geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 85)), (100 - (crosstrigY * 85)), (-72.5 + (crosstrigZ * 85))),
      new THREE.Vector3(( 10 + (crosstrigX * 85)), (100 - (crosstrigY * 85)), (-72.5 + (crosstrigZ * 85))));
    line85points = new MeshLine(), line85points.setGeometry( line85geometry ); //b
    line86geometry = new THREE.Geometry(), line86geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 86)), (100 - (crosstrigY * 86)), (-72.5 + (crosstrigZ * 86))),
      new THREE.Vector3(( 10 + (crosstrigX * 86)), (100 - (crosstrigY * 86)), (-72.5 + (crosstrigZ * 86))));
    line86points = new MeshLine(), line86points.setGeometry( line86geometry ); //b
    line87geometry = new THREE.Geometry(), line87geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 87)), (100 - (crosstrigY * 87)), (-72.5 + (crosstrigZ * 87))),
      new THREE.Vector3(( 10 + (crosstrigX * 87)), (100 - (crosstrigY * 87)), (-72.5 + (crosstrigZ * 87))));
    line87points = new MeshLine(), line87points.setGeometry( line87geometry ); //b
    line88geometry = new THREE.Geometry(), line88geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 88)), (100 - (crosstrigY * 88)), (-72.5 + (crosstrigZ * 88))),
      new THREE.Vector3(( 10 + (crosstrigX * 88)), (100 - (crosstrigY * 88)), (-72.5 + (crosstrigZ * 88))));
    line88points = new MeshLine(), line88points.setGeometry( line88geometry ); //b
    line89geometry = new THREE.Geometry(), line89geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 89)), (100 - (crosstrigY * 89)), (-72.5 + (crosstrigZ * 89))),
      new THREE.Vector3(( 10 + (crosstrigX * 89)), (100 - (crosstrigY * 89)), (-72.5 + (crosstrigZ * 89))));
    line89points = new MeshLine(), line89points.setGeometry( line89geometry ); //b
    line90geometry = new THREE.Geometry(), line90geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 90)), (100 - (crosstrigY * 90)), (-72.5 + (crosstrigZ * 90))),
      new THREE.Vector3(( 10 + (crosstrigX * 90)), (100 - (crosstrigY * 90)), (-72.5 + (crosstrigZ * 90))));
    line90points = new MeshLine(), line90points.setGeometry( line90geometry ); //b
    /////////////////////////////////
    line91geometry = new THREE.Geometry(), line91geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 91)), (100 - (crosstrigY * 91)), (-72.5 + (crosstrigZ * 91))),
      new THREE.Vector3(( 10 + (crosstrigX * 91)), (100 - (crosstrigY * 91)), (-72.5 + (crosstrigZ * 91))));
    line91points = new MeshLine(), line91points.setGeometry( line91geometry ); //b
    line92geometry = new THREE.Geometry(), line92geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 92)), (100 - (crosstrigY * 92)), (-72.5 + (crosstrigZ * 92))),
      new THREE.Vector3(( 10 + (crosstrigX * 92)), (100 - (crosstrigY * 92)), (-72.5 + (crosstrigZ * 92))));
    line92points = new MeshLine(), line92points.setGeometry( line92geometry ); //b
    line93geometry = new THREE.Geometry(), line93geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 93)), (100 - (crosstrigY * 93)), (-72.5 + (crosstrigZ * 93))),
      new THREE.Vector3(( 10 + (crosstrigX * 93)), (100 - (crosstrigY * 93)), (-72.5 + (crosstrigZ * 93))));
    line93points = new MeshLine(), line93points.setGeometry( line93geometry ); //b
    line94geometry = new THREE.Geometry(), line94geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 94)), (100 - (crosstrigY * 94)), (-72.5 + (crosstrigZ * 94))),
      new THREE.Vector3(( 10 + (crosstrigX * 94)), (100 - (crosstrigY * 94)), (-72.5 + (crosstrigZ * 94))));
    line94points = new MeshLine(), line94points.setGeometry( line94geometry ); //b
    line95geometry = new THREE.Geometry(), line95geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 95)), (100 - (crosstrigY * 95)), (-72.5 + (crosstrigZ * 95))),
      new THREE.Vector3(( 10 + (crosstrigX * 95)), (100 - (crosstrigY * 95)), (-72.5 + (crosstrigZ * 95))));
    line95points = new MeshLine(), line95points.setGeometry( line95geometry ); //b
    line96geometry = new THREE.Geometry(), line96geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 96)), (100 - (crosstrigY * 96)), (-72.5 + (crosstrigZ * 96))),
      new THREE.Vector3(( 10 + (crosstrigX * 96)), (100 - (crosstrigY * 96)), (-72.5 + (crosstrigZ * 96))));
    line96points = new MeshLine(), line96points.setGeometry( line96geometry ); //b
    line97geometry = new THREE.Geometry(), line97geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 97)), (100 - (crosstrigY * 97)), (-72.5 + (crosstrigZ * 97))),
      new THREE.Vector3(( 10 + (crosstrigX * 97)), (100 - (crosstrigY * 97)), (-72.5 + (crosstrigZ * 97))));
    line97points = new MeshLine(), line97points.setGeometry( line97geometry ); //b
    line98geometry = new THREE.Geometry(), line98geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 98)), (100 - (crosstrigY * 98)), (-72.5 + (crosstrigZ * 98))),
      new THREE.Vector3(( 10 + (crosstrigX * 98)), (100 - (crosstrigY * 98)), (-72.5 + (crosstrigZ * 98))));
    line98points = new MeshLine(), line98points.setGeometry( line98geometry ); //b
    line99geometry = new THREE.Geometry(), line99geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 99)), (100 - (crosstrigY * 99)), (-72.5 + (crosstrigZ * 99))),
      new THREE.Vector3(( 10 + (crosstrigX * 99)), (100 - (crosstrigY * 99)), (-72.5 + (crosstrigZ * 99))));
    line99points = new MeshLine(), line99points.setGeometry( line99geometry ); //b
    line100geometry = new THREE.Geometry(), line100geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 100)), (100 - (crosstrigY * 100)), (-72.5 + (crosstrigZ * 100))),
      new THREE.Vector3(( 10 + (crosstrigX * 100)), (100 - (crosstrigY * 100)), (-72.5 + (crosstrigZ * 100))));
    line100points = new MeshLine(), line100points.setGeometry( line100geometry ); //b
    /////////////////////////////////
    line101geometry = new THREE.Geometry(), line101geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 101)), (100 - (crosstrigY * 101)), (-72.5 + (crosstrigZ * 101))),
      new THREE.Vector3(( 10 + (crosstrigX * 101)), (100 - (crosstrigY * 101)), (-72.5 + (crosstrigZ * 101))));
    line101points = new MeshLine(), line101points.setGeometry( line101geometry ); //b
    line102geometry = new THREE.Geometry(), line102geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 102)), (100 - (crosstrigY * 102)), (-72.5 + (crosstrigZ * 102))),
      new THREE.Vector3(( 10 + (crosstrigX * 102)), (100 - (crosstrigY * 102)), (-72.5 + (crosstrigZ * 102))));
    line102points = new MeshLine(), line102points.setGeometry( line102geometry ); //b
    line103geometry = new THREE.Geometry(), line103geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 103)), (100 - (crosstrigY * 103)), (-72.5 + (crosstrigZ * 103))),
      new THREE.Vector3(( 10 + (crosstrigX * 103)), (100 - (crosstrigY * 103)), (-72.5 + (crosstrigZ * 103))));
    line103points = new MeshLine(), line103points.setGeometry( line103geometry ); //b
    line104geometry = new THREE.Geometry(), line104geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 104)), (100 - (crosstrigY * 104)), (-72.5 + (crosstrigZ * 104))),
      new THREE.Vector3(( 10 + (crosstrigX * 104)), (100 - (crosstrigY * 104)), (-72.5 + (crosstrigZ * 104))));
    line104points = new MeshLine(), line104points.setGeometry( line104geometry ); //b
    line105geometry = new THREE.Geometry(), line105geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 105)), (100 - (crosstrigY * 105)), (-72.5 + (crosstrigZ * 105))),
      new THREE.Vector3(( 10 + (crosstrigX * 105)), (100 - (crosstrigY * 105)), (-72.5 + (crosstrigZ * 105))));
    line105points = new MeshLine(), line105points.setGeometry( line105geometry ); //b
    line106geometry = new THREE.Geometry(), line106geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 106)), (100 - (crosstrigY * 106)), (-72.5 + (crosstrigZ * 106))),
      new THREE.Vector3(( 10 + (crosstrigX * 106)), (100 - (crosstrigY * 106)), (-72.5 + (crosstrigZ * 106))));
    line106points = new MeshLine(), line106points.setGeometry( line106geometry ); //b
    line107geometry = new THREE.Geometry(), line107geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 107)), (100 - (crosstrigY * 107)), (-72.5 + (crosstrigZ * 107))),
      new THREE.Vector3(( 10 + (crosstrigX * 107)), (100 - (crosstrigY * 107)), (-72.5 + (crosstrigZ * 107))));
    line107points = new MeshLine(), line107points.setGeometry( line107geometry ); //b
    line108geometry = new THREE.Geometry(), line108geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 108)), (100 - (crosstrigY * 108)), (-72.5 + (crosstrigZ * 108))),
      new THREE.Vector3(( 10 + (crosstrigX * 108)), (100 - (crosstrigY * 108)), (-72.5 + (crosstrigZ * 108))));
    line108points = new MeshLine(), line108points.setGeometry( line108geometry ); //b
    line109geometry = new THREE.Geometry(), line109geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 109)), (100 - (crosstrigY * 109)), (-72.5 + (crosstrigZ * 109))),
      new THREE.Vector3(( 10 + (crosstrigX * 109)), (100 - (crosstrigY * 109)), (-72.5 + (crosstrigZ * 109))));
    line109points = new MeshLine(), line109points.setGeometry( line109geometry ); //b
    line110geometry = new THREE.Geometry(), line110geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 110)), (100 - (crosstrigY * 110)), (-72.5 + (crosstrigZ * 110))),
      new THREE.Vector3(( 10 + (crosstrigX * 110)), (100 - (crosstrigY * 110)), (-72.5 + (crosstrigZ * 110))));
    line110points = new MeshLine(), line110points.setGeometry( line110geometry ); //b
    /////////////////////////////////
    line111geometry = new THREE.Geometry(), line111geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 111)), (100 - (crosstrigY * 111)), (-72.5 + (crosstrigZ * 111))),
      new THREE.Vector3(( 10 + (crosstrigX * 111)), (100 - (crosstrigY * 111)), (-72.5 + (crosstrigZ * 111))));
    line111points = new MeshLine(), line111points.setGeometry( line111geometry ); //b
    line112geometry = new THREE.Geometry(), line112geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 112)), (100 - (crosstrigY * 112)), (-72.5 + (crosstrigZ * 112))),
      new THREE.Vector3(( 10 + (crosstrigX * 112)), (100 - (crosstrigY * 112)), (-72.5 + (crosstrigZ * 112))));
    line112points = new MeshLine(), line112points.setGeometry( line112geometry ); //b
    line113geometry = new THREE.Geometry(), line113geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 113)), (100 - (crosstrigY * 113)), (-72.5 + (crosstrigZ * 113))),
      new THREE.Vector3(( 10 + (crosstrigX * 113)), (100 - (crosstrigY * 113)), (-72.5 + (crosstrigZ * 113))));
    line113points = new MeshLine(), line113points.setGeometry( line113geometry ); //b
    line114geometry = new THREE.Geometry(), line114geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 114)), (100 - (crosstrigY * 114)), (-72.5 + (crosstrigZ * 114))),
      new THREE.Vector3(( 10 + (crosstrigX * 114)), (100 - (crosstrigY * 114)), (-72.5 + (crosstrigZ * 114))));
    line114points = new MeshLine(), line114points.setGeometry( line114geometry ); //b
    line115geometry = new THREE.Geometry(), line115geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 115)), (100 - (crosstrigY * 115)), (-72.5 + (crosstrigZ * 115))),
      new THREE.Vector3(( 10 + (crosstrigX * 115)), (100 - (crosstrigY * 115)), (-72.5 + (crosstrigZ * 115))));
    line115points = new MeshLine(), line115points.setGeometry( line115geometry ); //b
    line116geometry = new THREE.Geometry(), line116geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 116)), (100 - (crosstrigY * 116)), (-72.5 + (crosstrigZ * 116))),
      new THREE.Vector3(( 10 + (crosstrigX * 116)), (100 - (crosstrigY * 116)), (-72.5 + (crosstrigZ * 116))));
    line116points = new MeshLine(), line116points.setGeometry( line116geometry ); //b
    line117geometry = new THREE.Geometry(), line117geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 117)), (100 - (crosstrigY * 117)), (-72.5 + (crosstrigZ * 117))),
      new THREE.Vector3(( 10 + (crosstrigX * 117)), (100 - (crosstrigY * 117)), (-72.5 + (crosstrigZ * 117))));
    line117points = new MeshLine(), line117points.setGeometry( line117geometry ); //b
    line118geometry = new THREE.Geometry(), line118geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 118)), (100 - (crosstrigY * 118)), (-72.5 + (crosstrigZ * 118))),
      new THREE.Vector3(( 10 + (crosstrigX * 118)), (100 - (crosstrigY * 118)), (-72.5 + (crosstrigZ * 118))));
    line118points = new MeshLine(), line118points.setGeometry( line118geometry ); //b
    line119geometry = new THREE.Geometry(), line119geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 119)), (100 - (crosstrigY * 119)), (-72.5 + (crosstrigZ * 119))),
      new THREE.Vector3(( 10 + (crosstrigX * 119)), (100 - (crosstrigY * 119)), (-72.5 + (crosstrigZ * 119))));
    line119points = new MeshLine(), line119points.setGeometry( line119geometry ); //b
    line120geometry = new THREE.Geometry(), line120geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 120)), (100 - (crosstrigY * 120)), (-72.5 + (crosstrigZ * 120))),
      new THREE.Vector3(( 10 + (crosstrigX * 120)), (100 - (crosstrigY * 120)), (-72.5 + (crosstrigZ * 120))));
    line120points = new MeshLine(), line120points.setGeometry( line120geometry ); //b
    /////////////////////////////////
    line121geometry = new THREE.Geometry(), line121geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 121)), (100 - (crosstrigY * 121)), (-72.5 + (crosstrigZ * 121))),
      new THREE.Vector3(( 10 + (crosstrigX * 121)), (100 - (crosstrigY * 121)), (-72.5 + (crosstrigZ * 121))));
    line121points = new MeshLine(), line121points.setGeometry( line121geometry ); //b
    line122geometry = new THREE.Geometry(), line122geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 122)), (100 - (crosstrigY * 122)), (-72.5 + (crosstrigZ * 122))),
      new THREE.Vector3(( 10 + (crosstrigX * 122)), (100 - (crosstrigY * 122)), (-72.5 + (crosstrigZ * 122))));
    line122points = new MeshLine(), line122points.setGeometry( line122geometry ); //b
    line123geometry = new THREE.Geometry(), line123geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 123)), (100 - (crosstrigY * 123)), (-72.5 + (crosstrigZ * 123))),
      new THREE.Vector3(( 10 + (crosstrigX * 123)), (100 - (crosstrigY * 123)), (-72.5 + (crosstrigZ * 123))));
    line123points = new MeshLine(), line123points.setGeometry( line123geometry ); //b
    line124geometry = new THREE.Geometry(), line124geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 124)), (100 - (crosstrigY * 124)), (-72.5 + (crosstrigZ * 124))),
      new THREE.Vector3(( 10 + (crosstrigX * 124)), (100 - (crosstrigY * 124)), (-72.5 + (crosstrigZ * 124))));
    line124points = new MeshLine(), line124points.setGeometry( line124geometry ); //b
    line125geometry = new THREE.Geometry(), line125geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 125)), (100 - (crosstrigY * 125)), (-72.5 + (crosstrigZ * 125))),
      new THREE.Vector3(( 10 + (crosstrigX * 125)), (100 - (crosstrigY * 125)), (-72.5 + (crosstrigZ * 125))));
    line125points = new MeshLine(), line125points.setGeometry( line125geometry ); //b
    line126geometry = new THREE.Geometry(), line126geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 126)), (100 - (crosstrigY * 126)), (-72.5 + (crosstrigZ * 126))),
      new THREE.Vector3(( 10 + (crosstrigX * 126)), (100 - (crosstrigY * 126)), (-72.5 + (crosstrigZ * 126))));
    line126points = new MeshLine(), line126points.setGeometry( line126geometry ); //b
    line127geometry = new THREE.Geometry(), line127geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 127)), (100 - (crosstrigY * 127)), (-72.5 + (crosstrigZ * 127))),
      new THREE.Vector3(( 10 + (crosstrigX * 127)), (100 - (crosstrigY * 127)), (-72.5 + (crosstrigZ * 127))));
    line127points = new MeshLine(), line127points.setGeometry( line127geometry ); //b
    line128geometry = new THREE.Geometry(), line128geometry.vertices.push(
      new THREE.Vector3((-10 - (crosstrigX * 128)), (100 - (crosstrigY * 128)), (-72.5 + (crosstrigZ * 128))),
      new THREE.Vector3(( 10 + (crosstrigX * 128)), (100 - (crosstrigY * 128)), (-72.5 + (crosstrigZ * 128))));
    line128points = new MeshLine(), line128points.setGeometry( line128geometry ); //b}
} // assigns the scanlines to positional values on bpm1
function scanlineclean() {
  scene.remove(line01mesh), scene.remove(line02mesh), scene.remove(line03mesh), scene.remove(line04mesh), scene.remove(line05mesh);
  scene.remove(line06mesh), scene.remove(line07mesh), scene.remove(line08mesh), scene.remove(line09mesh), scene.remove(line10mesh);
  scene.remove(line11mesh), scene.remove(line12mesh), scene.remove(line13mesh), scene.remove(line14mesh), scene.remove(line15mesh);
  scene.remove(line16mesh), scene.remove(line17mesh), scene.remove(line18mesh), scene.remove(line19mesh), scene.remove(line20mesh);
  scene.remove(line21mesh), scene.remove(line22mesh), scene.remove(line23mesh), scene.remove(line24mesh), scene.remove(line25mesh);
  scene.remove(line26mesh), scene.remove(line27mesh), scene.remove(line28mesh), scene.remove(line29mesh), scene.remove(line30mesh);
  scene.remove(line31mesh), scene.remove(line32mesh), scene.remove(line33mesh), scene.remove(line34mesh), scene.remove(line35mesh);
  scene.remove(line36mesh), scene.remove(line37mesh), scene.remove(line38mesh), scene.remove(line39mesh), scene.remove(line40mesh);
  scene.remove(line41mesh), scene.remove(line42mesh), scene.remove(line43mesh), scene.remove(line44mesh), scene.remove(line45mesh);
  scene.remove(line46mesh), scene.remove(line47mesh), scene.remove(line48mesh), scene.remove(line49mesh), scene.remove(line50mesh);
  scene.remove(line51mesh), scene.remove(line52mesh), scene.remove(line53mesh), scene.remove(line54mesh), scene.remove(line55mesh);
  scene.remove(line56mesh), scene.remove(line57mesh), scene.remove(line58mesh), scene.remove(line59mesh), scene.remove(line60mesh);
  scene.remove(line61mesh), scene.remove(line62mesh), scene.remove(line63mesh), scene.remove(line64mesh), scene.remove(line65mesh);
  scene.remove(line66mesh), scene.remove(line67mesh), scene.remove(line68mesh), scene.remove(line69mesh), scene.remove(line70mesh);
  scene.remove(line71mesh), scene.remove(line72mesh), scene.remove(line73mesh), scene.remove(line74mesh), scene.remove(line75mesh);
  scene.remove(line76mesh), scene.remove(line77mesh), scene.remove(line78mesh), scene.remove(line79mesh), scene.remove(line80mesh);
  scene.remove(line81mesh), scene.remove(line82mesh), scene.remove(line83mesh), scene.remove(line84mesh), scene.remove(line85mesh);
  scene.remove(line86mesh), scene.remove(line87mesh), scene.remove(line88mesh), scene.remove(line89mesh), scene.remove(line90mesh);
  scene.remove(line91mesh), scene.remove(line92mesh), scene.remove(line93mesh), scene.remove(line94mesh), scene.remove(line95mesh);
  scene.remove(line96mesh), scene.remove(line97mesh), scene.remove(line98mesh), scene.remove(line99mesh), scene.remove(line100mesh);
  scene.remove(line101mesh), scene.remove(line102mesh), scene.remove(line103mesh), scene.remove(line104mesh), scene.remove(line105mesh);
  scene.remove(line106mesh), scene.remove(line107mesh), scene.remove(line108mesh), scene.remove(line109mesh), scene.remove(line110mesh);
  scene.remove(line111mesh), scene.remove(line112mesh), scene.remove(line113mesh), scene.remove(line114mesh), scene.remove(line115mesh);
  scene.remove(line116mesh), scene.remove(line117mesh), scene.remove(line118mesh), scene.remove(line119mesh), scene.remove(line120mesh);
  scene.remove(line121mesh), scene.remove(line122mesh), scene.remove(line123mesh), scene.remove(line124mesh), scene.remove(line125mesh);
  scene.remove(line126mesh), scene.remove(line127mesh), scene.remove(line128mesh);
} // unrenders all scanlines at the same time
function scanlineani() {
  scanlineclean();
  if( linetrigtog[1] == 1 ){ line01mesh = new THREE.Mesh( line01points.geometry, linematerial ), scene.add( line01mesh )};
  if( linetrigtog[2] == 1 ){ line02mesh = new THREE.Mesh( line02points.geometry, linematerial ), scene.add( line02mesh )};
  if( linetrigtog[3] == 1 ){ line03mesh = new THREE.Mesh( line03points.geometry, linematerial ), scene.add( line03mesh )};
  if( linetrigtog[4] == 1 ){ line04mesh = new THREE.Mesh( line04points.geometry, linematerial ), scene.add( line04mesh )};
  if( linetrigtog[5] == 1 ){ line05mesh = new THREE.Mesh( line05points.geometry, linematerial ), scene.add( line05mesh )};
  if( linetrigtog[6] == 1 ){ line06mesh = new THREE.Mesh( line06points.geometry, linematerial ), scene.add( line06mesh )};
  if( linetrigtog[7] == 1 ){ line07mesh = new THREE.Mesh( line07points.geometry, linematerial ), scene.add( line07mesh )};
  if( linetrigtog[8] == 1 ){ line08mesh = new THREE.Mesh( line08points.geometry, linematerial ), scene.add( line08mesh )};
  if( linetrigtog[9] == 1 ){ line09mesh = new THREE.Mesh( line09points.geometry, linematerial ), scene.add( line09mesh )};
  if( linetrigtog[10] == 1 ){ line10mesh = new THREE.Mesh( line10points.geometry, linematerial ), scene.add( line10mesh )};
  if( linetrigtog[11] == 1 ){ line11mesh = new THREE.Mesh( line11points.geometry, linematerial ), scene.add( line11mesh )};
  if( linetrigtog[12] == 1 ){ line12mesh = new THREE.Mesh( line12points.geometry, linematerial ), scene.add( line12mesh )};
  if( linetrigtog[13] == 1 ){ line13mesh = new THREE.Mesh( line13points.geometry, linematerial ), scene.add( line13mesh )};
  if( linetrigtog[14] == 1 ){ line14mesh = new THREE.Mesh( line14points.geometry, linematerial ), scene.add( line14mesh )};
  if( linetrigtog[15] == 1 ){ line15mesh = new THREE.Mesh( line15points.geometry, linematerial ), scene.add( line15mesh )};
  if( linetrigtog[16] == 1 ){ line16mesh = new THREE.Mesh( line16points.geometry, linematerial ), scene.add( line16mesh )};
  if( linetrigtog[17] == 1 ){ line17mesh = new THREE.Mesh( line17points.geometry, linematerial ), scene.add( line17mesh )};
  if( linetrigtog[18] == 1 ){ line18mesh = new THREE.Mesh( line18points.geometry, linematerial ), scene.add( line18mesh )};
  if( linetrigtog[19] == 1 ){ line19mesh = new THREE.Mesh( line19points.geometry, linematerial ), scene.add( line19mesh )};
  if( linetrigtog[20] == 1 ){ line20mesh = new THREE.Mesh( line20points.geometry, linematerial ), scene.add( line20mesh )};
  if( linetrigtog[21] == 1 ){ line21mesh = new THREE.Mesh( line21points.geometry, linematerial ), scene.add( line21mesh )};
  if( linetrigtog[22] == 1 ){ line22mesh = new THREE.Mesh( line22points.geometry, linematerial ), scene.add( line22mesh )};
  if( linetrigtog[23] == 1 ){ line23mesh = new THREE.Mesh( line23points.geometry, linematerial ), scene.add( line23mesh )};
  if( linetrigtog[24] == 1 ){ line24mesh = new THREE.Mesh( line24points.geometry, linematerial ), scene.add( line24mesh )};
  if( linetrigtog[25] == 1 ){ line25mesh = new THREE.Mesh( line25points.geometry, linematerial ), scene.add( line25mesh )};
  if( linetrigtog[26] == 1 ){ line26mesh = new THREE.Mesh( line26points.geometry, linematerial ), scene.add( line26mesh )};
  if( linetrigtog[27] == 1 ){ line27mesh = new THREE.Mesh( line27points.geometry, linematerial ), scene.add( line27mesh )};
  if( linetrigtog[28] == 1 ){ line28mesh = new THREE.Mesh( line28points.geometry, linematerial ), scene.add( line28mesh )};
  if( linetrigtog[29] == 1 ){ line29mesh = new THREE.Mesh( line29points.geometry, linematerial ), scene.add( line29mesh )};
  if( linetrigtog[30] == 1 ){ line30mesh = new THREE.Mesh( line30points.geometry, linematerial ), scene.add( line30mesh )};
  if( linetrigtog[31] == 1 ){ line31mesh = new THREE.Mesh( line31points.geometry, linematerial ), scene.add( line31mesh )};
  if( linetrigtog[32] == 1 ){ line32mesh = new THREE.Mesh( line32points.geometry, linematerial ), scene.add( line32mesh )};
  if( linetrigtog[33] == 1 ){ line33mesh = new THREE.Mesh( line33points.geometry, linematerial ), scene.add( line33mesh )};
  if( linetrigtog[34] == 1 ){ line34mesh = new THREE.Mesh( line34points.geometry, linematerial ), scene.add( line34mesh )};
  if( linetrigtog[35] == 1 ){ line35mesh = new THREE.Mesh( line35points.geometry, linematerial ), scene.add( line35mesh )};
  if( linetrigtog[36] == 1 ){ line36mesh = new THREE.Mesh( line36points.geometry, linematerial ), scene.add( line36mesh )};
  if( linetrigtog[37] == 1 ){ line37mesh = new THREE.Mesh( line37points.geometry, linematerial ), scene.add( line37mesh )};
  if( linetrigtog[38] == 1 ){ line38mesh = new THREE.Mesh( line38points.geometry, linematerial ), scene.add( line38mesh )};
  if( linetrigtog[39] == 1 ){ line39mesh = new THREE.Mesh( line39points.geometry, linematerial ), scene.add( line39mesh )};
  if( linetrigtog[40] == 1 ){ line40mesh = new THREE.Mesh( line40points.geometry, linematerial ), scene.add( line40mesh )};
  if( linetrigtog[41] == 1 ){ line41mesh = new THREE.Mesh( line41points.geometry, linematerial ), scene.add( line41mesh )};
  if( linetrigtog[42] == 1 ){ line42mesh = new THREE.Mesh( line42points.geometry, linematerial ), scene.add( line42mesh )};
  if( linetrigtog[43] == 1 ){ line43mesh = new THREE.Mesh( line43points.geometry, linematerial ), scene.add( line43mesh )};
  if( linetrigtog[44] == 1 ){ line44mesh = new THREE.Mesh( line44points.geometry, linematerial ), scene.add( line44mesh )};
  if( linetrigtog[45] == 1 ){ line45mesh = new THREE.Mesh( line45points.geometry, linematerial ), scene.add( line45mesh )};
  if( linetrigtog[46] == 1 ){ line46mesh = new THREE.Mesh( line46points.geometry, linematerial ), scene.add( line46mesh )};
  if( linetrigtog[47] == 1 ){ line47mesh = new THREE.Mesh( line47points.geometry, linematerial ), scene.add( line47mesh )};
  if( linetrigtog[48] == 1 ){ line48mesh = new THREE.Mesh( line48points.geometry, linematerial ), scene.add( line48mesh )};
  if( linetrigtog[49] == 1 ){ line49mesh = new THREE.Mesh( line49points.geometry, linematerial ), scene.add( line49mesh )};
  if( linetrigtog[50] == 1 ){ line50mesh = new THREE.Mesh( line50points.geometry, linematerial ), scene.add( line50mesh )};
  if( linetrigtog[51] == 1 ){ line51mesh = new THREE.Mesh( line51points.geometry, linematerial ), scene.add( line51mesh )};
  if( linetrigtog[52] == 1 ){ line52mesh = new THREE.Mesh( line52points.geometry, linematerial ), scene.add( line52mesh )};
  if( linetrigtog[53] == 1 ){ line53mesh = new THREE.Mesh( line53points.geometry, linematerial ), scene.add( line53mesh )};
  if( linetrigtog[54] == 1 ){ line54mesh = new THREE.Mesh( line54points.geometry, linematerial ), scene.add( line54mesh )};
  if( linetrigtog[55] == 1 ){ line55mesh = new THREE.Mesh( line55points.geometry, linematerial ), scene.add( line55mesh )};
  if( linetrigtog[56] == 1 ){ line56mesh = new THREE.Mesh( line56points.geometry, linematerial ), scene.add( line56mesh )};
  if( linetrigtog[57] == 1 ){ line57mesh = new THREE.Mesh( line57points.geometry, linematerial ), scene.add( line57mesh )};
  if( linetrigtog[58] == 1 ){ line58mesh = new THREE.Mesh( line58points.geometry, linematerial ), scene.add( line58mesh )};
  if( linetrigtog[59] == 1 ){ line59mesh = new THREE.Mesh( line59points.geometry, linematerial ), scene.add( line59mesh )};
  if( linetrigtog[60] == 1 ){ line60mesh = new THREE.Mesh( line60points.geometry, linematerial ), scene.add( line60mesh )};
  if( linetrigtog[61] == 1 ){ line61mesh = new THREE.Mesh( line61points.geometry, linematerial ), scene.add( line61mesh )};
  if( linetrigtog[62] == 1 ){ line62mesh = new THREE.Mesh( line62points.geometry, linematerial ), scene.add( line62mesh )};
  if( linetrigtog[63] == 1 ){ line63mesh = new THREE.Mesh( line63points.geometry, linematerial ), scene.add( line63mesh )};
  if( linetrigtog[64] == 1 ){ line64mesh = new THREE.Mesh( line64points.geometry, linematerial ), scene.add( line64mesh )};
  if( linetrigtog[65] == 1 ){ line65mesh = new THREE.Mesh( line65points.geometry, linematerial ), scene.add( line65mesh )};
  if( linetrigtog[66] == 1 ){ line66mesh = new THREE.Mesh( line66points.geometry, linematerial ), scene.add( line66mesh )};
  if( linetrigtog[67] == 1 ){ line67mesh = new THREE.Mesh( line67points.geometry, linematerial ), scene.add( line67mesh )};
  if( linetrigtog[68] == 1 ){ line68mesh = new THREE.Mesh( line68points.geometry, linematerial ), scene.add( line68mesh )};
  if( linetrigtog[69] == 1 ){ line69mesh = new THREE.Mesh( line69points.geometry, linematerial ), scene.add( line69mesh )};
  if( linetrigtog[70] == 1 ){ line70mesh = new THREE.Mesh( line70points.geometry, linematerial ), scene.add( line70mesh )};
  if( linetrigtog[71] == 1 ){ line71mesh = new THREE.Mesh( line71points.geometry, linematerial ), scene.add( line71mesh )};
  if( linetrigtog[72] == 1 ){ line72mesh = new THREE.Mesh( line72points.geometry, linematerial ), scene.add( line72mesh )};
  if( linetrigtog[73] == 1 ){ line73mesh = new THREE.Mesh( line73points.geometry, linematerial ), scene.add( line73mesh )};
  if( linetrigtog[74] == 1 ){ line74mesh = new THREE.Mesh( line74points.geometry, linematerial ), scene.add( line74mesh )};
  if( linetrigtog[75] == 1 ){ line75mesh = new THREE.Mesh( line75points.geometry, linematerial ), scene.add( line75mesh )};
  if( linetrigtog[76] == 1 ){ line76mesh = new THREE.Mesh( line76points.geometry, linematerial ), scene.add( line76mesh )};
  if( linetrigtog[77] == 1 ){ line77mesh = new THREE.Mesh( line77points.geometry, linematerial ), scene.add( line77mesh )};
  if( linetrigtog[78] == 1 ){ line78mesh = new THREE.Mesh( line78points.geometry, linematerial ), scene.add( line78mesh )};
  if( linetrigtog[79] == 1 ){ line79mesh = new THREE.Mesh( line79points.geometry, linematerial ), scene.add( line79mesh )};
  if( linetrigtog[80] == 1 ){ line80mesh = new THREE.Mesh( line80points.geometry, linematerial ), scene.add( line80mesh )};
  if( linetrigtog[81] == 1 ){ line81mesh = new THREE.Mesh( line81points.geometry, linematerial ), scene.add( line81mesh )};
  if( linetrigtog[82] == 1 ){ line82mesh = new THREE.Mesh( line82points.geometry, linematerial ), scene.add( line82mesh )};
  if( linetrigtog[83] == 1 ){ line83mesh = new THREE.Mesh( line83points.geometry, linematerial ), scene.add( line83mesh )};
  if( linetrigtog[84] == 1 ){ line84mesh = new THREE.Mesh( line84points.geometry, linematerial ), scene.add( line84mesh )};
  if( linetrigtog[85] == 1 ){ line85mesh = new THREE.Mesh( line85points.geometry, linematerial ), scene.add( line85mesh )};
  if( linetrigtog[86] == 1 ){ line86mesh = new THREE.Mesh( line86points.geometry, linematerial ), scene.add( line86mesh )};
  if( linetrigtog[87] == 1 ){ line87mesh = new THREE.Mesh( line87points.geometry, linematerial ), scene.add( line87mesh )};
  if( linetrigtog[88] == 1 ){ line88mesh = new THREE.Mesh( line88points.geometry, linematerial ), scene.add( line88mesh )};
  if( linetrigtog[89] == 1 ){ line89mesh = new THREE.Mesh( line89points.geometry, linematerial ), scene.add( line89mesh )};
  if( linetrigtog[90] == 1 ){ line90mesh = new THREE.Mesh( line90points.geometry, linematerial ), scene.add( line90mesh )};
  if( linetrigtog[91] == 1 ){ line91mesh = new THREE.Mesh( line91points.geometry, linematerial ), scene.add( line91mesh )};
  if( linetrigtog[92] == 1 ){ line92mesh = new THREE.Mesh( line92points.geometry, linematerial ), scene.add( line92mesh )};
  if( linetrigtog[93] == 1 ){ line93mesh = new THREE.Mesh( line93points.geometry, linematerial ), scene.add( line93mesh )};
  if( linetrigtog[94] == 1 ){ line94mesh = new THREE.Mesh( line94points.geometry, linematerial ), scene.add( line94mesh )};
  if( linetrigtog[95] == 1 ){ line95mesh = new THREE.Mesh( line95points.geometry, linematerial ), scene.add( line95mesh )};
  if( linetrigtog[96] == 1 ){ line96mesh = new THREE.Mesh( line96points.geometry, linematerial ), scene.add( line96mesh )};
  if( linetrigtog[97] == 1 ){ line97mesh = new THREE.Mesh( line97points.geometry, linematerial ), scene.add( line97mesh )};
  if( linetrigtog[98] == 1 ){ line98mesh = new THREE.Mesh( line98points.geometry, linematerial ), scene.add( line98mesh )};
  if( linetrigtog[99] == 1 ){ line99mesh = new THREE.Mesh( line99points.geometry, linematerial ), scene.add( line99mesh )};
  if( linetrigtog[100] == 1 ){ line100mesh = new THREE.Mesh( line100points.geometry, linematerial ), scene.add( line100mesh )};
  if( linetrigtog[101] == 1 ){ line101mesh = new THREE.Mesh( line101points.geometry, linematerial ), scene.add( line101mesh )};
  if( linetrigtog[102] == 1 ){ line102mesh = new THREE.Mesh( line102points.geometry, linematerial ), scene.add( line102mesh )};
  if( linetrigtog[103] == 1 ){ line103mesh = new THREE.Mesh( line103points.geometry, linematerial ), scene.add( line103mesh )};
  if( linetrigtog[104] == 1 ){ line104mesh = new THREE.Mesh( line104points.geometry, linematerial ), scene.add( line104mesh )};
  if( linetrigtog[105] == 1 ){ line105mesh = new THREE.Mesh( line105points.geometry, linematerial ), scene.add( line105mesh )};
  if( linetrigtog[106] == 1 ){ line106mesh = new THREE.Mesh( line106points.geometry, linematerial ), scene.add( line106mesh )};
  if( linetrigtog[107] == 1 ){ line107mesh = new THREE.Mesh( line107points.geometry, linematerial ), scene.add( line107mesh )};
  if( linetrigtog[108] == 1 ){ line108mesh = new THREE.Mesh( line108points.geometry, linematerial ), scene.add( line108mesh )};
  if( linetrigtog[109] == 1 ){ line109mesh = new THREE.Mesh( line109points.geometry, linematerial ), scene.add( line109mesh )};
  if( linetrigtog[110] == 1 ){ line110mesh = new THREE.Mesh( line110points.geometry, linematerial ), scene.add( line110mesh )};
  if( linetrigtog[111] == 1 ){ line111mesh = new THREE.Mesh( line111points.geometry, linematerial ), scene.add( line111mesh )};
  if( linetrigtog[112] == 1 ){ line112mesh = new THREE.Mesh( line112points.geometry, linematerial ), scene.add( line112mesh )};
  if( linetrigtog[113] == 1 ){ line113mesh = new THREE.Mesh( line113points.geometry, linematerial ), scene.add( line113mesh )};
  if( linetrigtog[114] == 1 ){ line114mesh = new THREE.Mesh( line114points.geometry, linematerial ), scene.add( line114mesh )};
  if( linetrigtog[115] == 1 ){ line115mesh = new THREE.Mesh( line115points.geometry, linematerial ), scene.add( line115mesh )};
  if( linetrigtog[116] == 1 ){ line116mesh = new THREE.Mesh( line116points.geometry, linematerial ), scene.add( line116mesh )};
  if( linetrigtog[117] == 1 ){ line117mesh = new THREE.Mesh( line117points.geometry, linematerial ), scene.add( line117mesh )};
  if( linetrigtog[118] == 1 ){ line118mesh = new THREE.Mesh( line118points.geometry, linematerial ), scene.add( line118mesh )};
  if( linetrigtog[119] == 1 ){ line119mesh = new THREE.Mesh( line119points.geometry, linematerial ), scene.add( line119mesh )};
  if( linetrigtog[120] == 1 ){ line120mesh = new THREE.Mesh( line120points.geometry, linematerial ), scene.add( line120mesh )};
  if( linetrigtog[121] == 1 ){ line121mesh = new THREE.Mesh( line121points.geometry, linematerial ), scene.add( line121mesh )};
  if( linetrigtog[122] == 1 ){ line122mesh = new THREE.Mesh( line122points.geometry, linematerial ), scene.add( line122mesh )};
  if( linetrigtog[123] == 1 ){ line123mesh = new THREE.Mesh( line123points.geometry, linematerial ), scene.add( line123mesh )};
  if( linetrigtog[124] == 1 ){ line124mesh = new THREE.Mesh( line124points.geometry, linematerial ), scene.add( line124mesh )};
  if( linetrigtog[125] == 1 ){ line125mesh = new THREE.Mesh( line125points.geometry, linematerial ), scene.add( line125mesh )};
  if( linetrigtog[126] == 1 ){ line126mesh = new THREE.Mesh( line126points.geometry, linematerial ), scene.add( line126mesh )};
  if( linetrigtog[127] == 1 ){ line127mesh = new THREE.Mesh( line127points.geometry, linematerial ), scene.add( line127mesh )};
  if( linetrigtog[128] == 1 ){ line128mesh = new THREE.Mesh( line128points.geometry, linematerial ), scene.add( line128mesh )};
} //calls scanline geometry and spawns it based on linetrigtog[#]
// static bold glow around the default cross ////////////////////////////
function glowstatic() {
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
  scene.remove(glowingmesh);
  glowingmesh = new THREE.Mesh( glowingpoints.geometry, glowingmaterial );
  glowingmesh.geometry.verticesNeedUpdate = true;
  scene.add(glowingmesh) }; // assigns positional values based apon currently rendered cross
function glowstaticclean() {
  scene.remove(glowingmesh);
}; // simple remove() command call
//glow animation clockwise based on 24bpm gap ////////////////////////////
function glowringani() {
  outerglowinggeometry = new THREE.Geometry(); // CROSS GEOMETRY STORAGE
  outerglowinggeometry.vertices.push(
    new THREE.Vector3( line1x, line1y, line1z ), new THREE.Vector3( line2x, line2y, line2z ),
    new THREE.Vector3( line3x, line3y, line3z ), new THREE.Vector3( line4x, line4y, line4z ),
    new THREE.Vector3( line5x, line5y, line5z ), new THREE.Vector3( line6x, line6y, line6z ),
    new THREE.Vector3( line7x, line7y, line7z ), new THREE.Vector3( line8x, line8y, line8z ));
  //=================================================
  // Glow Animation loop ////////////////////////////
  //=================================================
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
  scene.add( outerglowingmesh ), outerglowingmesh.geometry.verticesNeedUpdate = true }; //renders the regular cross outlines based on thicker values
function glowringaniclean() {
  scene.remove(outerglowingmesh);
}; // simple remove() command call
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
    } else { tock = tock + 1 }}; //, console.log ("Current Beat:", tock)}};
  clock.getDelta()};
  //=================================================
  // FINAL FINAL rendering //////////////////////////
  //=================================================
function render(){ // start
} // FUNCTION Render END
