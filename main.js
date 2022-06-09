import './style.css'

import * as THREE from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { setKey } from './src/utils/keyControls';

// import { sceneObjects, camera, scene } from './src/scenes/perspective';
import { sceneObjects, camera, scene } from './src/scenes/isometric'; 

const renderer = new THREE.WebGLRenderer();
let controls;
const player = sceneObjects['cube'];


async function init() {
  camera.render();

  // normal way of adding perspective camera

  // camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  // normal way of defining orthographic camera

  // let width = 10;
  // let height = 10;
  // camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 1, 1000);
  // scene.add(camera);
  // camera.position.z = 5;
  // camera.position.y = 2;

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // controls = new OrbitControls(camera, renderer.domElement);
  // controls.listenToKeyEvents(window); // optional

  // add ambient light
  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
  scene.add(ambientLight);

  // adding directional light
  const color = 0xFFFFFF;
  const intensity = 0.5;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);

  // render objects
  // cube.render();
  // plane.render();

  // renders all objects in scene
  for (let key in sceneObjects) {
    sceneObjects[key].render();
  }

  // event listeners
  window.addEventListener('keydown', (e) => setKey(e, true));
  window.addEventListener('resize', onWindowResize);
  window.addEventListener( 'keyup', (e) => setKey(e, false));
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera.camera);
  // renderer.render(scene, camera);
  // controls.update();
  player.update();
  camera.update(player.cube);
}

function onWindowResize() {
  camera.camera.aspect = window.innerWidth / window.innerHeight;
  camera.camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
animate();