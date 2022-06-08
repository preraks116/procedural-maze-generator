import './style.css'

import * as THREE from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Cube } from './src/components/objects/cube';
import { PerspCamera } from './src/components/camera/perspectiveCamera';
import { OrthoCamera } from './src/components/camera/orthographicCamera';
import { Plane } from './src/components/objects/plane';
import { Vector3 } from 'three';

let camera;
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
let controls;

const cube = new Cube({
  position: { x: 0, y: 0, z: 0 },
  color: 0x00ff00,
  dimension: { x: 1, y: 1, z: 1 }
}, scene)

const plane = new Plane({
  scene: scene,
  position: { x: 0, y: -0.5, z: 0 },
  color: 0xffff00,
  dimension: { x: 10, y: 10 },
  rotation: -Math.PI / 2
}, scene)

function onWindowResize() {
  camera.camera.aspect = window.innerWidth / window.innerHeight;
  camera.camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

camera = new PerspCamera({
  position: { x: 0, y: 2, z: 5 },
  lookAt: new Vector3(0, 0, 0),
  up: { x: 0, y: 1, z: 0 },
  aspect: window.innerWidth / window.innerHeight,
  near: 0.1,
  far: 1000,
  fov: 75
}, scene);

// camera = new OrthoCamera({
//   position: { x: 20, y: 20, z: 20 },
//   rotation: { 
//     order: 'YXZ', 
//     x: Math.atan( - 1 / Math.sqrt( 2 ) ), 
//     y: - Math.PI / 4, 
//     z: 0},
//   lookAt: new Vector3(0, 0, 0),
//   up: { x: 0, y: 1, z: 0 },
//   width: window.innerWidth/100,
//   height: window.innerHeight/100,
//   near: 1,
//   far: 1000 
// }, scene)


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
  cube.render();
  plane.render();

  window.addEventListener('resize', onWindowResize, false);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera.camera);
  // renderer.render(scene, camera);
  // controls.update();
  // cube.rotate();
}

init();
animate();