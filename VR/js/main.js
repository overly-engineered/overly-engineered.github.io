// Setup three.js WebGL renderer
var renderer = new THREE.WebGLRenderer( { antialias: true } );
// renderer.shadowMap.enabled = true;
// renderer.shadowMapSoft = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// renderer.shadowCameraNear = 3;
// renderer.shadowCameraFar = camera.far;
// renderer.shadowCameraFov = 50;
// renderer.shadowMapBias = 0.0039;
// renderer.shadowMapDarkness = 0.5;
// renderer.shadowMapWidth = 1024;
// renderer.shadowMapHeight = 1024;


// Append the canvas element created by the renderer to document body element.
document.body.appendChild( renderer.domElement );

//Create a three.js scene
var scene = new THREE.Scene();

//Create a three.js camera
var camera = new THREE.PerspectiveCamera( 110, window.innerWidth / window.innerHeight, 2, 10000 );
scene.add(camera);

//Apply VR headset positional data to camera.
var controls = new THREE.VRControls( camera );

//Apply VR stereo rendering to renderer
var effect = new THREE.VREffect( renderer );
effect.setSize( window.innerWidth, window.innerHeight );


/************* TODO: Generate Your VR Scene Below *********************/


/*
TODO: Create, position, and add 3d objects here
*/

var tableGroup = new THREE.Group();
var chairGroup = [];
var roomGroup = new THREE.Group();
var createTable = function(){
    var texture = new THREE.TextureLoader().load( "wood2.png" );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10,10);
    texture.minFilter = THREE.LinearFilter
    //Top
    var geometry = new THREE.BoxGeometry(1, 0.1, 1);
    var material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        shading: THREE.SmoothShading,
        map: texture
    });
    var cube = new THREE.Mesh(geometry, material);
    cube.position.setY(-0.05);
    cube.castShadow = true;
    cube.receiveShadow = true;
    tableGroup.add(cube);
    //Legs
    var legPosition = [{x:0.40,y:-0.35,z:0.40},{x:-0.40,y:-0.35,z:0.40},{x:-0.40,y:-0.35,z:-0.40},{x:0.40,y:-0.35,z:-0.40}];
    for(var i = 0; i < 4; i++){

        var geometry = new THREE.CylinderGeometry( .08, .05, .5, 32 );
        var material = new THREE.MeshLambertMaterial({
            color: legPosition[i].color,
            shading: THREE.SmoothShading
        });
        var leg = new THREE.Mesh(geometry, material);
        leg.position.setX(legPosition[i].x);
        leg.position.setY(legPosition[i].y);
        leg.position.setZ(legPosition[i].z);
        leg.castShadow = true;
        leg.receiveShadow = true;
        tableGroup.add(leg);
    }
    scene.add(tableGroup);
}

var createChair = function(posY, posX, posZ, rotation, index){

    chairGroup[index] = new THREE.Group();
    chairGroup[index].add(tableGroup.clone())
    //back
    var geometry = new THREE.BoxGeometry(.1, 1, 1);
    var material = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        shading: THREE.SmoothShading
    });
    var back = new THREE.Mesh(geometry, material);
    //back.position.setY(.31);
    //back.position.setZ(.25);
    back.position.setY(.5);
    back.position.setX(.45)
    back.castShadow = true;
    back.receiveShadow = true;
    chairGroup[index].add(back);
    chairGroup[index].position.setY(posY);
    chairGroup[index].position.setX(posX);
    chairGroup[index].position.setZ(posZ);
    chairGroup[index].rotation.set(0, rotation, 0);
    chairGroup[index].scale.set(.5,.5,.5);
    //add to scene
    scene.add(chairGroup[index]);
}

var createMultipleChairs = function(){
    var chairPositions = [{y:-.28,x:.55,z:0, rotation: 0}, {y:-.28,x:-.55,z:.1, rotation: Math.PI}, {y:-.28,x:.1,z:-.6, rotation: Math.PI/2}, {y:-.28,x:-.2,z:.7, rotation: -2}];
    chairPositions.forEach(function(e,i,arr){
        createChair(e.y, e.x, e.z, e.rotation, i);
    })
}

//Floor
var createPlane = function(){
    var geometry = new THREE.PlaneGeometry( 5, 5, 1 );
    var material = new THREE.MeshLambertMaterial( {color: 0xFFFFCC} );
    var plane = new THREE.Mesh( geometry, material );
    plane.rotation.x = -(Math.PI / 2);
    plane.position.setY(-0.55);
    plane.receiveShadow = true;
    roomGroup.add(plane);
    scene.add( plane );
}

var createWalls = function(){
    var wallPositions = [{y:.95,x:-2.5,z:0, rotation: Math.PI/2}, {y:.95,x:-0,z:2.5, rotation: Math.PI}, {y:.95,x:2.5,z:0, rotation: (Math.PI + (Math.PI/2))}, {y:.95,x:0,z:-2.5, rotation: 2*Math.PI}];
    for(var i = 0; i < 4; i++){
        var geometry = new THREE.PlaneGeometry( 5, 3, 1 );
        var material = new THREE.MeshLambertMaterial( {color: 0xFFFFF0} );
        var wall = new THREE.Mesh( geometry, material );
        wall.rotation.y = wallPositions[i].rotation;
        wall.position.setX(wallPositions[i].x);
        wall.position.setY(wallPositions[i].y);
        wall.position.setZ(wallPositions[i].z);
        // wall.rotation.set(0, Math.PI/2, 0)
        wall.receiveShadow = true;
        roomGroup.add(wall);
        scene.add( wall );
    }
}
var createRoom = function(){
    createPlane();
    createWalls();
}

var createClock = function(){
    //Face
    var geometry = new THREE.CircleBufferGeometry( .3, 32 );
    var material = new THREE.MeshLambertMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
    var clockFace = new THREE.Mesh( geometry, material );
    clock.add(clockFace);
    //Hands
    var geometry = new THREE.CylinderGeometry( .005, .01, .27, 32 );
    var material = new THREE.MeshLambertMaterial({
        color: 0x000000,
        shading: THREE.SmoothShading
    });
    var bigHand = new THREE.Mesh(geometry, material);
    bigHand.position.setY(.17);
    var geometry = new THREE.CylinderGeometry( .005, .01, .15, 32 );
    var material = new THREE.MeshLambertMaterial({
        color: 0x000000,
        shading: THREE.SmoothShading
    });
    var smallHand = new THREE.Mesh(geometry, material);
    smallHand.rotation.z = Math.PI/2;
    scene.add( clock, bigHand, smallHand );
}

//Lights
var createLights = function(){
    scene.add( new THREE.AmbientLight( 0x212223) );
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.bias = .000001;
    scene.add(directionalLight);
}


createRoom();
createTable();
createMultipleChairs();
//createClock();
createLights();

/*
Request animation frame loop function
*/
function animate() {
  // TODO: Apply any desired changes for the next frame here.


  //Update VR headset position and apply to camera.
  controls.update();

  // Render the scene through the VREffect.
  effect.render( scene, camera );
  requestAnimationFrame( animate );
}

animate();	// Kick off animation loop



/***************** TODO: Generate Your VR Scene Above *****************/



/*
Listen for click event to enter full-screen mode.
We listen for single click because that works best for mobile for now
*/
document.body.addEventListener( 'click', function(){
  effect.setFullScreen( true );
})

/*
Listen for keyboard events
*/
function onkey(event) {
  event.preventDefault();

  if (event.keyCode == 90) { // z
    controls.resetSensor(); //zero rotation
  } else if (event.keyCode == 70 || event.keyCode == 13) { //f or enter
    effect.setFullScreen(true) //fullscreen
  }
};
window.addEventListener("keydown", onkey, true);

/*
Handle window resizes
*/
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  effect.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener( 'resize', onWindowResize, false );
