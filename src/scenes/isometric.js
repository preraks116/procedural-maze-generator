import * as THREE from 'three';
import * as CANNON from 'cannon';
import { Vector3 } from 'three';
import { Cube } from "../components/objects/cube";
import { Plane } from "../components/objects/plane";
import { GLTFModel } from '../components/objects/models/gltfModel';
import { FBXModel } from '../components/objects/models/fbxModel';
import { gridHelper } from '../components/objects/grid';
import { OrthoCamera } from '../components/camera/orthographicCamera';
import { ambientLight } from '../components/lights/ambientLight';
import { directionalLight } from '../components/lights/directionalLight';
import { textures } from '../utils/textures';

const scene = new THREE.Scene();

const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);
world.broadphase = new CANNON.NaiveBroadphase();

// dictionary of all objects
const sceneObjects = {
  cube: new Cube({
    position: { x: 0, y: -0.4, z: 0 },
    color: 0x00ff00,
    dimension: { x: 1, y: 1, z: 1 },
    speed: 1,
    mass: 1,
    linearDamping: 0.5,
    type: "player",
    textures: textures.brick
  }, scene, world),
  plane: new Plane({
    scene: scene,
    position: { x: 0, y: -0.5, z: 0 },
    color: 0xffff00,
    dimension: { x: 10, y: 10 },
    rotation: { x: -Math.PI / 2, y: 0, z: 0 },
    mass: 0,
    linearDamping: 0.3
  }, scene, world),
  grid: new gridHelper({
    position: { x: 0, y: -0.5, z: 0 },
    dimension: { x: 10, y: 10 },
    rotation: { x: 0, y: 0, z: 0 }
  }, scene),
  boat: new GLTFModel({
    position: { x: -3, y: 1, z: 1 },
    scale: { x: 0.3, y: 0.3, z: 0.3 },
    mass: 1,
    linearDamping: 0.5,
    resourceURL: 'src/assets/models/gltf/boat/scene2.gltf'
  }, scene, world),
  fbxScene: new FBXModel({
    position: { x: 1, y: -0.5, z: -1 },
    scale: { x: 0.005, y: 0.005, z: 0.005 },
    mass: 0,
    linearDamping: 0.5,
    resourceURL: 'src/assets/models/fbx/testScene/test-scene.fbx'
  }, scene, world),
};

// const with all collision behaviors
const collisions = {
  cubePlane: new CANNON.ContactMaterial(
    sceneObjects['cube'].material,
    sceneObjects['plane'].material,
    {
      friction: 0
    }
  )
}

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
    position: { x: -1, y: 2, z: 4 },
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

export { sceneObjects, lighting, camera, scene, world };