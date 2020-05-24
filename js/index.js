
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
var crosspointsgeometry, crosspoints,
    crosspointsmaterial, crosspointsmesh;
/////////////////////////////////
var outerglowinggeometry, outerglowingpoints,
    outerglowingmaterial, outerglowingmesh;
/////////////////////////////////
var corrector;
var trackerX, trackerY, trackerZ;
/////////////////////////////////
var topXlineR =  17,  topXlineL = -17,
    topYlineR =  55,  topYlineL =  55,
    topZlineR = -17,  topZlineL = -17;
/////////////////////////////////
var botXlineR =  30,  botXlineL = 30,
    botYlineR = -35,  botYlineL = -35,
    botZlineR =  95,  botZlineL =  95;
/////////////////////////////////
var sideRXlineR =  52,   sideRYlineR = 30,  sideRZlineR = -37,
    sideRXlineL =  24.2, sideRYlineL = 30,  sideRZlineL = -37,
    sideLXlineL = -24.2, sideLYlineL = 30,  sideLZlineL = -37,
    sideLXlineR = -52,   sideLYlineR = 30,  sideLZlineR = -37;
/////////////////////////////////
var botbotXlineR =  22,  botbotYlineR = -63, botbotZlineR = 75,
    botbotXlineL = -22,  botbotYlineL = -63, botbotZlineL = 75;
/////////////////////////////////
var toptopXlineR =  10, toptopYlineR = 100, toptopZlineR = -72.5,
    toptopXlineL = -10, toptopYlineL = 100, toptopZlineL = -72.5;
var topbottomXlineR =  10, topbottomYlineR = 100, topbottomZlineR = -72.5,
    topbottomXlineL = -10, topbottomYlineL = 100, topbottomZlineL = -72.5;
/////////////////////////////////
var midtopXlineR = 52, midtopYlineR = 71, midtopZlineR = -37,
    midtopXlineL = -52, midtopYlineL = 71, midtopZlineL = -37,
    midbottomXlineR = 52, midbottomYlineR = 71, midbottomZlineR = -37,
    midbottomXlineL = -52, midbottomYlineL = 71, midbottomZlineL = -37;
/////////////////////////////////
var rightcorrector = 0, leftcorrector = 0, i = 0, crossstatus = 0;
var crossloop = [], crossobj;
/////////////////////////////////
var line1x = 0, line1y = 0, line1z = 0,
    line2x = 0, line2y = 0, line2z = 0,
    line3x = 0, line3y = 0, line3z = 0;
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
var glowloop = 0;
/////////////////////////////////
init(), animate(), update();
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
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 400);                                                 // camera assignment
  camera.up = new THREE.Vector3(0,500,0);
  //controls setup
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
  document.body.appendChild(renderer.domElement)};
//=================================================
// SCENE rendering ////////////////////////////////
//=================================================
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
    if(camera.position.x > 110  && camera.position.x < 170 ) { leftcorrector = 1 };
    if(camera.position.x < -110  && camera.position.x > -170 ) { rightcorrector = 1 };
    //=================================================
    // Geometry Drawing ///////////////////////////////
    //=================================================
    crosspointsgeometry = new THREE.Geometry(); // CROSS GEOMETRY STORAGE
    crosspointsgeometry.vertices.push(
      new THREE.Vector3( -30, -35, 95 ),         //                               <<LEFT>>
      new THREE.Vector3( -17, 55, -17 ),         //bottom left corner .  A
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
    /////////////////////////////////
    crosspoints = new MeshLine(), crosspoints.setGeometry( crosspointsgeometry );
    crosspointsmaterial = new MeshLineMaterial({ lineWidth: 0.7, color: 0xff0000 });
    scene.remove(crosspointsmesh);
    crosspointsmesh = new THREE.Mesh( crosspoints.geometry, crosspointsmaterial );
    scene.add( crosspointsmesh ), crosspointsmesh.geometry.verticesNeedUpdate = true;
    /////////////////////////////////
    //crossloop.forEach(function(crossobj) { crossobj.position.y -= 20, crossobj.position.z -= 10 });
    //crossobj = new THREE.Mesh( crosspoints.geometry, crosspointsmaterial);
    //crossloop.push( crossobj );
    //scene.add( crossobj );
    //=================================================
    // Glow Animation Drawing /////////////////////////
    //=================================================
    //variable loop based on main correction
    point2x = sideLXlineL,      point2y = sideLYlineL,      point2z = sideLZlineL,
    point3x = sideLXlineR,      point3y = sideLYlineR,      point3z = sideLZlineR,
    point6x = topbottomXlineL,  point6y = topbottomYlineL,  point6z = topbottomZlineL,
    point7x = toptopXlineL,     point7y = toptopYlineL,     point7z = toptopZlineL,
    point10x = toptopXlineR,    point10y = toptopYlineR,    point10z = toptopZlineR,
    point11x = topbottomXlineR, point11y = topbottomYlineR, point11z = topbottomZlineR,
    point14x = sideRXlineR,     point14y = sideRYlineR,     point14z = sideRZlineR;
    point15x = sideRXlineL,     point15y = sideRYlineL,     point15z = sideRZlineL,
    point17x = botbotXlineR,    point17y = botbotYlineR,   point17z = botbotZlineR,
    point18x = botbotXlineL,    point18y = botbotYlineL,    point18z = botbotZlineL;
    /////////////////////////////////
    if(camera.position.x < 65 && camera.position.x > -65) {
      point16x = 30,  point16y = -35, point16z = 95, point1x = -30,  point1y = -35,  point1z = 95};
    //left side correctional fixes
    if(camera.position.x < -65){ point1x = point18x, point1y = point18y, point1z = point18z };
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
    outerglowinggeometry = new THREE.Geometry(); // CROSS GEOMETRY STORAGE
    //outerglowinggeometry.vertices.push(
    //  new THREE.Vector3( line1x, line1y, line1z ),
    //  new THREE.Vector3( line2x, line2y, line2z ),
    //  new THREE.Vector3( line3x, line3y, line3z ));
    /////////////////////////////////
    //line test rendering;
    outerglowinggeometry.vertices.push(
      new THREE.Vector3( point1x, point1y, point1z ),
      new THREE.Vector3( point2x, point2y, point2z ),
      new THREE.Vector3( point3x, point3y, point3z ),
      new THREE.Vector3( point4x, point4y, point4z ),
      new THREE.Vector3( point5x, point5y, point5z ),
      new THREE.Vector3( point6x, point6y, point6z ),
      new THREE.Vector3( point7x, point7y, point7z ),
      new THREE.Vector3( point8x, point8y, point8z ),
      new THREE.Vector3( point9x, point9y, point9z ),
      new THREE.Vector3( point10x, point10y, point10z ),
      new THREE.Vector3( point11x, point11y, point11z ),
      new THREE.Vector3( point12x, point12y, point12z ),
      new THREE.Vector3( point13x, point13y, point13z ),
      new THREE.Vector3( point14x, point14y, point14z ),
      new THREE.Vector3( point15x, point15y, point15z ),
      new THREE.Vector3( point16x, point16y, point16z ),
      new THREE.Vector3( point17x, point17y, point17z ),
      new THREE.Vector3( point18x, point18y, point18z ),
      new THREE.Vector3( point1x, point1y, point1z ));
    /////////////////////////////////
    outerglowingpoints = new MeshLine(), outerglowingpoints.setGeometry( outerglowinggeometry );
    outerglowingmaterial = new MeshLineMaterial({ lineWidth: 3, color: 0xff0000 });
    scene.remove(outerglowingmesh);
    outerglowingmesh = new THREE.Mesh( outerglowingpoints.geometry, outerglowingmaterial );
    scene.add( outerglowingmesh ), outerglowingmesh.geometry.verticesNeedUpdate = true;
    /////////////////////////////////
    if(glowloop == 0 ){ // start draw setup
      line1x = point16x, line1y = point16y, line1z = point16z
      line2x = point1x, line2y = point1y, line2z = point1z
      line3x = point1x, line3y = point1y, line3z = point1z };
    if(glowloop > 0 && glowloop <= 10 ){
      line1x = point16x, line1y = point16y, line1z = point16z
      line2x = point1x, line2y = point1y, line2z = point1z };
    //=================================================
    // Rendering Crap /////////////////////////////////
    //=================================================
    trackerX = camera.position.x;
    trackerY = camera.position.y;
    trackerZ = camera.position.Z;
    //console.log(camera.position.x, camera.position.z);
    renderer.render(scene, camera);
    camera.lookAt( scene.position ), camera.updateMatrixWorld();
    controls.update();
    update(), render(); }
  //=================================================
  // Background Math ////////////////////////////////
  //=================================================
function update() { // start
  if(clock.elapsedTime < 240){ if(currentbeat == tock){
      ticker = clock.elapsedTime * (beatspersecond / 60); // bpm calculation
      currentbeat = Math.round(ticker); // rounds off the current beat based on time
    } else { tock = tock + 1, console.log("Current Beat:", tock), glowloop = tock}};
  clock.getDelta()};
  //=================================================
  // FINAL FINAL rendering //////////////////////////
  //=================================================
function render(){ // start
} // FUNCTION Render END
