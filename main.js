import './style.css'

import * as THREE from 'three';
import * as CANNON from 'cannon';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { setKey } from './src/utils/keyControls';

// import { sceneObjects, camera, scene, world } from './src/scenes/perspective';
import { sceneObjects, camera, scene, world } from './src/scenes/isometric'; 

const renderer = new THREE.WebGLRenderer();
let controls;
// let world;
const player = sceneObjects['cube'];

async function init() {
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  camera.render();

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
  camera.update(player.body);
  world.step(1 / 60);

  for (let key in sceneObjects) {
    sceneObjects[key].update();
  }
}

function onWindowResize() {
  camera.camera.aspect = window.innerWidth / window.innerHeight;
  camera.camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
animate();