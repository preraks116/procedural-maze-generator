import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import CannonDebugger from 'cannon-es-debugger'
import { Vector3 } from 'three';
import { Player } from "../components/objects/player";
import { Plane } from "../components/objects/plane";
import { Box } from '../components/objects/box';
import { GLTFModel } from '../components/objects/models/gltfModel';
import { FBXModel } from '../components/objects/models/fbxModel';
import { OBJModel } from '../components/objects/models/objModel';
import { Sprite } from '../components/objects/sprite';
import { gridHelper } from '../components/objects/grid';
import { OrthoCamera } from '../components/camera/orthographicCamera';
import { ambientLight } from '../components/lights/ambientLight';
import { directionalLight } from '../components/lights/directionalLight';
import { textures } from '../utils/textures';
import { ShapeType } from 'three-to-cannon';

const scene = new THREE.Scene();

const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);
world.broadphase = new CANNON.NaiveBroadphase();

const cannonDebugger = new CannonDebugger(scene, world, {
  onInit(body, mesh) {
    // Toggle visibiliy on "d" press
    document.addEventListener('keydown', (event) => {
      if (event.key === 'i') {
        mesh.visible = !mesh.visible
      }
    })
  },
})
let numcubes = 1;

function addCube(sceneObjects) {
  numcubes++;
  // append numcubes to string
  const id = `player${numcubes}`;
  const player = new Player({
    position: { x: numcubes, y: 0, z: 0 },
    color: 0x00ff00,
    // dimension: { x: 0.3, y: 0.3, z: 0.3 },
    outlineSize: 0.05,
    dimension: {
      radius: 0.25,
      height: 0.1,
      radialSegments: 32
    },
    speed: 1,
    mass: 1,
    linearDamping: 0.9,
    type: "player",
    textures: textures.brick
  }, scene, world);
  // console.log(player.body.position);
  sceneObjects[id] = player;
}



// dictionary of all objects
const sceneObjects = {
  player: new Player({
    position: { x: 0, y: 0, z: 0 },
    color: 0x00ff00,
    // dimension: { x: 0.3, y: 0.3, z: 0.3 },
    outlineSize: 0.05,
    dimension: {
      radius: 0.25,
      height: 0.1,
      radialSegments: 32
    },
    speed: 1,
    mass: 1,
    linearDamping: 0.9,
    type: "player",
    textures: textures.brick,
    // isHoverable: true,
  }, scene, world),
  plane: new Plane({
    scene: scene,
    position: { x: 0, y: -0.5, z: 0 },
    color: 0xffffff,
    dimension: { x: 25, y: 25 },
    rotation: { x: -Math.PI / 2, y: 0, z: 0 },
    mass: 0,
    linearDamping: 0.3
  }, scene, world),
  // grid: new gridHelper({
  //   position: { x: 0, y: -0.5, z: 0 },
  //   dimension: { x: 20, y: 20 },
  //   rotation: { x: 0, y: 0, z: 0 }
  // }, scene),
  box: new Box({
    position: { x: 1, y: 0, z: 0 },
    dimension: { x: 0.3, y: 0.3, z: 0.3 },
    mass: 1,
    linearDamping: 0.9,
    angularDamping: 0.1,
    type: "player",
    textures: textures.brick,
  }, scene, world),
  box2: new Box({
    position: { x: 2, y: 0, z: 0 },
    dimension: { x: 0.3, y: 0.3, z: 0.3 },
    mass: 1,
    hoverColor: 0x00fff0,
    linearDamping: 0.9,
    angularDamping: 0.1,
    type: "player",
    isHoverable: true,
  }, scene, world),
  box3: new Box({
    position: { x: 3, y: 0, z: 0 },
    dimension: { x: 0.3, y: 0.3, z: 0.3 },
    mass: 1,
    linearDamping: 0.9,
    angularDamping: 0.1,
    type: "player",
    isClickable: true
  }, scene, world),
  box4: new Box({
    position: { x: 3, y: 0, z: 1 },
    dimension: { x: 0.3, y: 0.3, z: 0.3 },
    mass: 1,
    linearDamping: 0.9,
    angularDamping: 0.1,
    type: "player",
    isHoverable: true,
    isClickable: true
  }, scene, world),
  // boat: new GLTFModel({
  //   position: { x: -5, y: 1, z: 1 },
  //   scale: { x: 1, y: 1, z: 1 },
  //   mass: 0,
  //   rotation: { x: 0, y: 0, z: 0 },
  //   linearDamping: 0.5,
  //   resourceURL: 'src/assets/models/gltf/boat/scene2.gltf'
  // }, scene, world),
  // fbxScene: new FBXModel({
  //   position: { x: 0, y: -0.5, z: -5 },
  //   scale: { x: 0.01, y: 0.01, z: 0.01 },
  //   mass: 0,
  //   rotation: { x: 0, y: 0, z: 0 },
  //   linearDamping: 0.5,
  //   resourceURL: 'src/assets/models/fbx/testScene/test-scene.fbx',
  //   colliders: {
  //     cubicleWall1: {
  //       type: "box",
  //       position: { x: 1.4, y: 0.65, z: 7.45 },
  //       dimension: { x: 0.1, y: 1.2, z: 1.95 },
  //     },
  //     cubicleWall2: {
  //       type: "box",
  //       position: { x: 2.8, y: 0.65, z: 6.5 },
  //       dimension: { x: 2.7, y: 1.2, z: 0.1 },
  //     },
  //     cubicleWall3: {
  //       type: "box",
  //       position: { x: 2.8, y: 0.65, z: 9.4 },
  //       dimension: { x: 2.7, y: 1.2, z: 0.1 },
  //     },
  //     smallWall: {
  //       type: "box",
  //       position: { x: 3.25, y: 0.65, z: 4.4 },
  //       dimension: { x: 1.9, y: 1.2, z: 0.1 },
  //     },
  //     wall: {
  //       type: "box",
  //       position: { x: 4.2, y: 0.65, z: 6.3 },
  //       dimension: { x: 0.1, y: 1.2, z: 8.4 },
  //     },
  //     wall2: {
  //       type: "box",
  //       position: { x: 3.65, y: 0.65, z: 2.1 },
  //       dimension: { x: 1.15, y: 1.2, z: 0.1 },
  //     },
  //     wall3: {
  //       type: "box",
  //       position: { x: 3.13, y: 0.65, z: 1 },
  //       dimension: { x: 0.1, y: 1.2, z: 2.325 },
  //     },
  //     lattice: {
  //       type: "box",
  //       position: { x: 0.05, y: 0.65, z: 0.95 },
  //       dimension: { x: 0.1, y: 1.35, z: 2.1 },
  //     }
  //   }
  // }, scene, world),
  // objScene: new OBJModel({
  //   position: { x: 7, y: -0.5, z: -5 },
  //   scale: { x: 0.01, y: 0.01, z: 0.01 },
  //   mass: 0,
  //   rotation: { x: 0, y: 0, z: 0 },
  //   linearDamping: 0.5,
  //   resourceURL: 'src/assets/models/obj/scene.obj'
  // }, scene, world),
  // sprite: new Sprite({
  //   position: { x: -2, y: 0, z: -2 },
  //   // dimension: { x: 1, y: 1, z: 1 },
  //   rotation: { x: 0, y: 0, z: 0 },
  //   mass: 0,
  //   map: './src/assets/sprites/cityTiles_075.png',
  // }, scene, world),
  sprite: new Sprite({
    position: { x: -2, y: 0, z: -2 },
    // dimension: { x: 1, y: 1, z: 1 },
    rotation: { x: 0, y: 0, z: 0 },
    mass: 0,
    map: './src/assets/sprites/furniture/sofa.png',
    alphaMap: './src/assets/sprites/furniture/sofa_alpha_channel.png',
    colliders: {
      sofa1: {
        type: "box",
        position: { x: -0.2, y: 0, z: -0.2 },
        dimension: { x: 2.4, y: 1, z: 1.15 },
      },
      // sofa1: {
      //   type: "box",
      //   position: { x: -0.9, y: -0.2, z: -0.15 },
      //   dimension: { x: 0.8, y: 0.2, z: 0.45 },
      // },
      // sofa2: {
      //   type: "box",
      //   position: { x: -0.3, y: -0.1, z: -0.4 },
      //   dimension: { x: 0.5 , y: 0.4, z: 0.2 },
      // },
    }
  }, scene, world),
  // sprite2: new Sprite({
  //   position: { x: 2, y: 0, z: -2 },
  //   // dimension: { x: 1, y: 1, z: 1 },
  //   rotation: { x: 0, y: 0, z: 0 },
  //   mass: 0,
  //   map: './src/assets/sprites/furniture/sofa_2.png',
  //   alphaMap: './src/assets/sprites/furniture/sofa_2_alpha_channel.png',
  //   colliders: {
  //     cubicleWall1: {
  //       type: "box",
  //       position: { x: -0.15, y: 0, z: 0.2 },
  //       dimension: { x: 0.95, y: 1, z: 1.2 },
  //     }}
  // }, scene, world),
  // monkey: new OBJModel({
  //   position: { x: 0, y: 1, z: 0 },
  //   // scale: { x: 0.5, y: 0.5, z: 0.5 },
  //   scale: { x: 1, y: 1, z: 1 },
  //   mass: 0,
  //   rotation: { x: 0, y: 0, z: 0 },
  //   linearDamping: 0.5,
  //   resourceURL: 'src/assets/models/obj/monkey.obj'
  // }, scene, world),
  // scene2: new OBJModel({
  //   position: { x: 10, y: -0.5, z: 0 },
  //   // scale: { x: 0.5, y: 0.5, z: 0.5 },
  //   scale: { x: 0.01, y: 0.01, z: 0.01 },
  //   mass: 0,
  //   rotation: { x: 0, y: 0, z: 0 },
  //   linearDamping: 0.5,
  //   resourceURL: 'src/assets/models/obj/scene2.obj',
  //   colliders: {
  //     stairs: {
  //       type: "box",
  //       position: { x: -3.9, y: 0.5, z: -0.6 },
  //       dimension: { x: 7.2, y: 1.1, z: 0.1 },
  //       rotation: { x: -Math.PI/2, y: Math.PI/6, z: 0 }
  //     },
  //     platform: {
  //       type: "box",
  //       position: { x: -8.95, y: 2.25, z: 0.3 },
  //       dimension: { x: 3.6, y: 0.15, z: 5.8 },
  //     },
  //     tombstone: {
  //       type: "box",
  //       position: { x: -1.2, y: 1, z: 2.05 },
  //       dimension: { x: 2.3, y: 2, z: 0.35 },
  //     },
  //     lattice: {
  //       type: "box",
  //       position: { x: 0, y: 0.65, z: 0.95 },
  //       dimension: { x: 0.15, y: 1.35, z: 2 },
  //     },
  //     latticeWall: {
  //       type: "box",
  //       position: { x: 3.15, y: 0.65, z: 0.9 },
  //       dimension: { x: 0.2, y: 1.35, z: 2.3 },
  //     },
  //     wall: {
  //       type: "box",
  //       position: { x: 4.15, y: 0.65, z: 8.1 },
  //       dimension: { x: 0.15, y: 1.2, z: 12 },
  //     },
  //     wall2: {
  //       type: "box",
  //       position: { x: 3.25, y: 0.65, z: 4.4 },
  //       dimension: { x: 1.9, y: 1.2, z: 0.1 },
  //     },
  //     wall3: {
  //       type: "box",
  //       position: { x: 2.8, y: 0.65, z: 7.7 },
  //       dimension: { x: 2.7, y: 1.2, z: 0.1 },
  //     },
  //     wall4: {
  //       type: "box",
  //       position: { x: 1.35, y: 0.65, z: 8.6 },
  //       dimension: { x: 0.15, y: 1.2, z: 2 },
  //     },
  //     wall5: {
  //       type: "box",
  //       position: { x: 3.5, y: 0.65, z: 2.1 },
  //       dimension: { x: 1, y: 1.2, z: 0.1 },
  //     },
  //     wall6: {
  //       type: "box",
  //       position: { x: 2.8, y: 0.65, z: 11.3 },
  //       dimension: { x: 2.7, y: 1.2, z: 0.1 },
  //     },
  //     arch1: {
  //       type: "box",
  //       position: { x: -2.3, y: 0.5, z: 9.1 },
  //       dimension: { x: 0.4, y: 1, z: 3.4 },
  //     },
  //     arch2: {
  //       type: "box",
  //       position: { x: -10.4, y: 0.65, z: 9.1 },
  //       dimension: { x: 0.4, y: 1, z: 3.7 },
  //     },
  //     archTombstone: {
  //       type: "box",
  //       position: { x: -8.2, y: 0.65, z: 8.55 },
  //       dimension: { x: 2.3, y: 2, z: 0.35 },
  //     }
  //   }
  // }, scene, world),
};


// const with all collision behaviors
const collisions = {
  cubePlane: new CANNON.ContactMaterial(
    // sceneObjects['cube'].material,
    sceneObjects['player'].material,
    // sceneObjects['coin'].material,
    sceneObjects['plane'].material,
    {
      friction: 0
    }
  )
}
// addCube(sceneObjects);


for (let key in collisions) {
  world.addContactMaterial(collisions[key]);
}

// lighting
const lighting = {
  ambientLight: new ambientLight({
    color: 0xffffff,
    intensity: 0.5
  }, scene),
  directionalLight: new directionalLight({
    color: 0xffffff,
    intensity: 0.5,
    position: { x: -1, y: 3, z: 4 },
    shadow: true
  }, scene)
}

// camera
const camera = new OrthoCamera({
  position: { x: 20, y: 20, z: 20 },
  rotation: {
    order: 'YXZ',
    x: Math.atan(- 1 / Math.sqrt(2)),
    y: - Math.PI / 4,
    z: 0
  },
  lookAt: new Vector3(0, 0, 0),
  up: { x: 0, y: 1, z: 0 },
  width: window.innerWidth / 100,
  height: window.innerHeight / 100,
  near: 1,
  far: 1000
}, scene)

export { sceneObjects, lighting, camera, scene, world, cannonDebugger, numcubes, addCube };