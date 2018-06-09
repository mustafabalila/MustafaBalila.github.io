var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 900);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x00)


var sphereGeometry = new THREE.SphereGeometry(25, 30, 30);
var earth = new THREE.Mesh(sphereGeometry, createEarthMaterial())
earth.name = 'earth';
scene.add(earth);
camera.position.x = 35;
camera.position.y = 36;
camera.position.z = 33;
camera.lookAt(scene.position);
// bg
var cameraBG = new THREE.OrthographicCamera(
    -window.innerWidth,
    window.innerWidth,
    window.innerHeight,
    -window.innerHeight,
    -1000,1000)
cameraBG.position.z = 50;

var BgGeometry = new THREE.PlaneGeometry(1, 1);
var bg = new THREE.Mesh(BgGeometry, createBgMaterial())
bg.position.z = -100;
bg.scale.set(window.innerWidth * 2, window.innerHeight * 2, 1);
var sceneBG = new THREE.Scene();
sceneBG.add(bg)
var bgrenderer = new THREE.WebGLRenderer();
bgrenderer.setSize(window.innerWidth, window.innerHeight);
var backgroundMesh = new THREE.Mesh(
new THREE.PlaneGeometry(2, 2, 0),createBgMaterial())
backgroundMesh .material.depthTest = false;
backgroundMesh .material.depthWrite = false;
var backgroundScene = new THREE.Scene();
var backgroundCamera = new THREE.Camera();
backgroundScene .add(backgroundCamera );
backgroundScene .add(backgroundMesh );
// Position the camera and point it at the center of the scene
// var bgPass = new THREE.RenderPass(sceneBG, cameraBG);
// var renderPass = new THREE.RenderPass(scene, camera);
// renderPass.clear = false;
// var effectCopy = new THREE.ShaderPass(THREE.CopyShader);
// effectCopy.renderToScreen = true;
// composer = new THREE.EffectComposer(renderer);
// composer.addPass(bgPass);
// composer.addPass(renderPass);
// composer.addPass(effectCopy);

document.body.appendChild(renderer.domElement);
document.body.appendChild(bgrenderer.domElement);

var cameraControl = new THREE.OrbitControls(camera);

function animate() {
    
    cameraControl.update();
    renderer.autoClear = false;
    renderer.clear();
    renderer.render(backgroundScene , backgroundCamera );
    renderer.render(scene, camera);
    earth.rotation.x += 0.001;
    earth.rotation.y += 0.001;
    requestAnimationFrame(animate);

}
animate();

function createEarthMaterial() {
    var earthTexture = new THREE.TextureLoader().load("earth.jpg");
    var earthMaterial = new THREE.MeshBasicMaterial();
    earthMaterial.map = earthTexture;
    return earthMaterial;
}

function createBgMaterial() {
    var earthTexture = new THREE.TextureLoader().load("bg.jpg");
    var earthMaterial = new THREE.MeshBasicMaterial();
    earthMaterial.map = earthTexture;
    return earthMaterial;
}