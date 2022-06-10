import * as THREE from 'three';
import * as CANNON from 'cannon';
import { Vector3 } from 'three';    
import { Cube } from "../components/objects/cube";
import { Plane } from "../components/objects/plane";
import { PerspCamera } from "../components/camera/perspectiveCamera";
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
        linearDamping: 0.3,
        type: "player",
        textures: textures.brick
    }, scene, world),
    cube2: new Cube({
        position: { x: 5, y: 0.5, z: 0 },
        color: 0x00ff0,
        dimension: { x: 1, y: 2, z: 2 },
        speed: 1,
        mass: 0,
        linearDamping: 0.3,
        type: "static"
    }, scene, world),
    plane: new Plane({
        scene: scene,
        position: { x: 0, y: -0.5, z: 0 },
        color: 0xffffff,
        dimension: { x: 50, y: 50 },
        rotation: {
            x: -Math.PI / 2,
            y: 0,
            z: 0
        },
        mass: 0,
        linearDamping: 0.3,
    }, scene, world)
};

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

// const with all collision behaviors
const collisions = {
    cubePlane: new CANNON.ContactMaterial(
        sceneObjects['cube'].material,
        sceneObjects['plane'].material,
        {
            // friction: 0,
            // restitution: 0.9
        }
    )
}

// adding collision behaviors to world
for (let key in collisions) {
    world.addContactMaterial(collisions[key]);
}

// camera
const camera = new PerspCamera({
    position: { x: 0, y: 4, z: 5 },
    lookAt: new Vector3(0, 0, 0),
    up: { x: 0, y: 1, z: 0 },
    aspect: window.innerWidth / window.innerHeight,
    near: 0.1,
    far: 1000,
    fov: 75
}, scene);

export { sceneObjects, lighting, camera, scene, world };