import './style.css'
import *  as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#background'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);

// const geometry = new THREE.SphereGeometry(8, 24, 24);
// const material = new THREE.MeshStandardMaterial( {color: 0x62FA8E} );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

const earthTexture = new THREE.TextureLoader().load('earth.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshBasicMaterial({
    map: earthTexture,
    normalMap: normalTexture
  })
);

scene.add(earth);

const controls = new OrbitControls(camera, renderer.domElement);

function addFlash(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffff });
  const flash = new THREE.Mesh( geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));

  flash.position.set(x, y, z);
  scene.add(flash)
};

Array(200).fill().forEach(addFlash);

// const oceanTexture = new THREE.TextureLoader().load('oceanWave.jpg');
// scene.background = oceanTexture;



const pointLight = new THREE.PointLight(0xffff)
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xfffff);
scene.add(pointLight, ambientLight)

function animate(){
  requestAnimationFrame(animate);
  earth.rotation.x += 0.00;
  earth.rotation.y += 0.005;
  earth.rotation.z += 0.00;
  controls.update();
  renderer.render(scene, camera);
}

animate()



