import "./style.css";

import * as THREE from "three";
import * as CANNON from "cannon-es";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import { textures } from "./src/utils/textures";
import { setKey } from "./src/utils/keyControls";
import { setZoom } from "./src/components/camera/orthographicCamera";
import { Box } from "./src/components/objects/box";
import * as GSAP from "gsap";
// import CannonDebugger from 'cannon-es-debugger'

import {
  sceneObjects,
  lighting,
  camera,
  scene,
  world,
  cannonDebugger,
} from "./src/scenes/perspective";
// import { sceneObjects, lighting, camera, scene, world, cannonDebugger } from './src/scenes/isometric';

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
const m = display(maze(17, 17));
let controls, stats;
let intersects = [];
const player = sceneObjects["player"];
var mouse, raycaster;



// const maze = display(maze(10,10));
// console.log(maze)



function onMouseMove(event) {
  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  getIntersects();
}

// function onClick() {
//   // console.log(intersects);
//   if (intersects.length > 0 && intersects[1].object.name === "plane") {
//     // console.log('plane clicked');
//     let coordinate = intersects[1].point;
//     console.log(coordinate);
//     // tween the players position to this coordinate
//     var tween = GSAP.gsap.to(player.body.position, {
//       duration: 1,
//       x: coordinate.x,
//       z: coordinate.z,
//       ease: "power3.out",
//     });
//   }
//   if (intersects.length > 0 && intersects[0].object.userData.isClickable) {
//     intersects[0].object.userData.onClick();
//   }
// }

// sceneObjects[`wall${i}`] = new Box({
//   position: { x: i, y: 1, z: -40 },
//   color: 0xff0000,
//   dimension: { x: 5, y: 5, z: 0.5 },
//   speed: 1,
//   mass: 0,
//   linearDamping: 0.3,
//   type: "wall",
//   textures: textures.brick
// }, scene, world);

function renderMaze(m) {
  const maze = m.text;
  // console.log(maze);
  const mSize = maze.length;
  const lineSize = maze[0].length;
  //convert msize and linesize to binary
  const mSizeBinary = m.x.toString(2);
  const lineSizeBinary = m.y.toString(2);
  // if size of string is less than 7, add 0s to the front
  const paddedX = mSizeBinary.padStart(5, "0");
  const paddedY = lineSizeBinary.padStart(5, "0");
  let seed = ''
  seed += paddedX;
  seed += paddedY;
  // console.log(seed);
  console.log("x:", m.x, paddedX);
  console.log("y:", m.y, paddedY);
  let wallSeed = '';
  // console.log(mSize, lineSize);
  let z = -40;
  let x;
  for (let i = 0; i < mSize; i++) {
    if(i % 2 == 0) {
      x = -40;
      for(let j = 0; j < lineSize-1; j+=4) {
        if(maze[i][j+1] === '-') {
          // seed += '1'
          wallSeed += '1'
          sceneObjects[`wall${i}${j}`] = new Box({
            position: { x: x, y: 1, z: z -2.5 },
            color: 0xff0000,
            dimension: { x: 5, y: 5, z: 0.5 },
            speed: 1,
            mass: 0,
            linearDamping: 0.3,
            type: "wall",
            textures: textures.brick
          }, scene, world);
        }
        else {
          // seed += '0'
          wallSeed += '0'
        }
        x += 5;
      }
    }
    else {
      x = -45;
      // for(let j = 0; j < 1; j+=4) {
      for(let j = 0; j < lineSize; j+=4) {
        if(maze[i][j] === '|') {
          // seed += '1'
          wallSeed += '1'
          sceneObjects[`wall${i}${j}`] = new Box({
            position: { x: x + 2.5, y: 1, z: z },
            color: 0xff0000,
            dimension: { x: 0.5, y: 5, z: 5 },
            speed: 1,
            mass: 0,
            linearDamping: 0.3,
            type: "wall",
            textures: textures.brick
          }, scene, world);
        }
        else {
          // seed += '0'
          wallSeed += '0'
        }
        x += 5;
      }
      z +=5;
    }
  }
  // console.log(wallSeed)
  // convert wallSeed to base 36
  // convert seed to base 36
  const seedBase36 = parseInt(seed, 2).toString(36);
  console.log("seed in base 36:", seedBase36);

  const wallSeedBase36 = parseInt(wallSeed, 2).toString(36);
  console.log( "wallseed in base 36:", wallSeedBase36);
  // const hexSeed = parseInt(seed, 2).toString(36);
  // console.log(hexSeed);

  const zeroCount = (wallSeedBase36.match(/0+$/)||[])[0].length;
  console.log("number of zeros at the end:",zeroCount)

  const trimmedSeed = wallSeedBase36.slice(0, -zeroCount);
  console.log("after removing zeros:",trimmedSeed);

  const finalSeed = seedBase36 + ":" + trimmedSeed + ":" + zeroCount;
  console.log(finalSeed);
}

async function init() {
  // initialization
  renderer.shadowMap.enabled = true;
  renderer.setPixelRatio(window.devicePixelRatio);
  // renderer.toneMapping = THREE.ACESFilmicToneMapping;
  // renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  // console.log(renderer.shadowMap)
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // mouse pointer
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  // load camera
  camera.render();

  // orbit controls
  // controls = new OrbitControls(camera.camera, renderer.domElement);
  // controls.listenToKeyEvents(window); // optional

  // lighting
  for (let key in lighting) {
    lighting[key].render();
  }

  renderMaze(m);

  // renders all objects in scene
  for (let key in sceneObjects) {
    sceneObjects[key].render();
  }

  stats = new Stats();
  // add custom panel
  // add memory panel
  // stats.addPanel(new Stats.Panel('Memory', '#ff8', '#221'));
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3: mem, 4: calls, 5: raf, 6: all
  document.body.appendChild(stats.dom);

  // lighting.ambientLight.intensity = 1;
  // add gui
  const gui = new GUI();
  const lightingFolder = gui.addFolder("Lighting");
  const directionalLightFolder = lightingFolder.addFolder("Directional Light");
  const directionalLightPositionFolder =
    directionalLightFolder.addFolder("Position");
  const ambientLightFolder = lightingFolder.addFolder("Ambient Light");
  const propsAmbientLight = {
    get Intensity() {
      return lighting.ambientLight.light.intensity;
    },
    set Intensity(value) {
      lighting.ambientLight.light.intensity = value;
    },
    get Color() {
      return lighting.ambientLight.light.color.getHex();
    },
    set Color(value) {
      lighting.ambientLight.light.color.setHex(value);
    },
  };
  const propsDirectionalLight = {
    get Intensity() {
      return lighting.directionalLight.light.intensity;
    },
    set Intensity(value) {
      lighting.directionalLight.light.intensity = value;
    },
    get Color() {
      return lighting.directionalLight.light.color.getHex();
    },
    set Color(value) {
      lighting.directionalLight.light.color.setHex(value);
    },
  };
  const propsDirectionalLightPosition = {
    get X() {
      return lighting.directionalLight.light.position.x;
    },
    set X(value) {
      lighting.directionalLight.light.position.x = value;
    },
    get Y() {
      return lighting.directionalLight.light.position.y;
    },
    set Y(value) {
      lighting.directionalLight.light.position.y = value;
    },
    get Z() {
      return lighting.directionalLight.light.position.z;
    },
    set Z(value) {
      lighting.directionalLight.light.position.z = value;
    },
  };
  ambientLightFolder.add(propsAmbientLight, "Intensity", 0, 1).step(0.01);
  ambientLightFolder
    .addColor(propsAmbientLight, "Color")
    .onChange(function (value) {
      lighting.ambientLight.light.color.setHex(value);
    });
  directionalLightFolder
    .add(propsDirectionalLight, "Intensity", 0, 1)
    .step(0.01);
  directionalLightFolder
    .addColor(propsDirectionalLight, "Color")
    .onChange(function (value) {
      lighting.directionalLight.light.color.setHex(value);
    });
  directionalLightPositionFolder
    .add(propsDirectionalLightPosition, "X", -100, 100)
    .step(0.01);
  directionalLightPositionFolder
    .add(propsDirectionalLightPosition, "Y", -100, 100)
    .step(0.01);
  directionalLightPositionFolder
    .add(propsDirectionalLightPosition, "Z", -100, 100)
    .step(0.01);
  

  // event listeners
  // window.addEventListener("click", onClick);
  window.addEventListener("mousemove", onMouseMove, false);
  window.addEventListener("wheel", (e) => setZoom(e, camera));
  window.addEventListener("keydown", (e) => {
    if(e.key === 'o') {
      // remove all walls from scene
      // for(let key in sceneObjects) {
      //   if(sceneObjects[key].type === 'wall') {
      //     delete sceneObjects[key];
      //   }
      // }
    }
    else {
      setKey(e, true);
    }
  });
  window.addEventListener("resize", onWindowResize);
  window.addEventListener("keyup", (e) => setKey(e, false));
}

function resetFromHover() {
  for (let i = 0; i < intersects.length; i++) {
    let object = intersects[i].object;
    if (object.userData.isHoverable) {
      object.userData.resetHover();
    }
  }
}

function getIntersects() {
  raycaster.setFromCamera(mouse, camera.camera);
  intersects = raycaster.intersectObjects(scene.children);
}

function onHover() {
  for (let i = 0; i < intersects.length; i++) {
    let object = intersects[i].object;
    if (object.userData.isHoverable) {
      object.userData.onHover();
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  onHover();
  stats.begin();
  renderer.render(scene, camera.camera);
  stats.end();
  resetFromHover();
  // controls.update();
  if (player) {
    camera.update(player.body);
  }
  world.step(1 / 60);

  for (let key in sceneObjects) {
    sceneObjects[key].update();
  }
  cannonDebugger.update();
}

function onWindowResize() {
  camera.camera.aspect = window.innerWidth / window.innerHeight;
  camera.camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
animate();
