import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import CannonDebugger from 'cannon-es-debugger'
import { Vector3 } from 'three';    
import { Box } from "../components/objects/box";
import { Ball } from "../components/objects/ball";
import { Plane } from "../components/objects/plane";
import { GLTFModel } from '../components/objects/models/gltfModel';
import { FBXModel } from '../components/objects/models/fbxModel';
import { PerspCamera } from "../components/camera/perspectiveCamera";
import { ambientLight } from '../components/lights/ambientLight';
import { directionalLight } from '../components/lights/directionalLight';
import { textures } from '../utils/textures';

const scene = new THREE.Scene();

const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);
world.broadphase = new CANNON.NaiveBroadphase();

const cannonDebugger = new CannonDebugger(scene, world, {
    onInit(body, mesh) {
      // Toggle visibiliy on "d" press
      mesh.visible = false;
      document.addEventListener('keydown', (event) => {
        if (event.key === 'i') {
          mesh.visible = !mesh.visible
        }
      })
    },
  })

// dictionary of all objects
const sceneObjects = {
    ball: new Ball({
        // position: { x: -40, y: 1, z: -40 },
        position: { x: -40, y: 1, z: -45 },
        color: 0xff0000,
        radius: 0.5,
        mass: 1,
        speed: new Vector3(0, 0, 0),
        isHoverable: true,
        isClickable: true,
        linearDamping: 0.9,
        angularDamping: 0.9,
        textures: textures.ball,
        type: "player",
        speed: 5
    }, scene, world),
    plane: new Plane({
        scene: scene,
        position: { x: 0, y: -0.5, z: 0 },
        color: 0xffffff,
        dimension: { x: 100, y: 100 },
        rotation: {
            x: -Math.PI / 2,
            y: 0,
            z: 0
        },
        mass: 0,
        linearDamping: 0.3,
    }, scene, world),
};

// add 10 horizontal walls from (-40,1,-40) to (40,1,-40)
// for (let i = -40; i <= 40; i += 5) {
//     sceneObjects[`wall${i}`] = new Box({
//         position: { x: i, y: 1, z: -40 },
//         color: 0xff0000,
//         dimension: { x: 5, y: 5, z: 0.5 },
//         speed: 1,
//         mass: 0,
//         linearDamping: 0.3,
//         type: "wall",
//         textures: textures.brick
//     }, scene, world);
// }

const lighting = {
    ambientLight: new ambientLight({
        color: 0xffffff,
        intensity: 0.5
    }, scene),
    directionalLight: new directionalLight({
        color: 0xffffff,
        intensity: 0.5,
        position: { x: 4.83, y: -20.36, z: 4 },
        shadow: true
    }, scene)
}

// // const with all collision behaviors
// const collisions = {
//     // cubePlane: new CANNON.ContactMaterial(
//     //     sceneObjects['cube'].material,
//     //     sceneObjects['plane'].material,
//     //     {
//     //         // friction: 0,
//     //         // restitution: 0.9
//     //     }
//     // )
// }

// // adding collision behaviors to world
// for (let key in collisions) {
//     world.addContactMaterial(collisions[key]);
// }

// camera
const camera = new PerspCamera({
    position: { x: 0, y: 70, z: 0 },
    lookAt: new Vector3(0, 0, 0),
    up: { x: 0, y: 1, z: 0 },
    aspect: window.innerWidth / window.innerHeight,
    near: 0.1,
    far: 1000,
    fov: 75
}, scene);

export { sceneObjects, lighting, camera, scene, world, cannonDebugger };