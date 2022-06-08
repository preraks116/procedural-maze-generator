import * as THREE from 'three';
import { Vector3 } from 'three';    
import { Cube } from "../components/objects/cube";
import { Plane } from "../components/objects/plane";
import { PerspCamera } from "../components/camera/perspectiveCamera";

const scene = new THREE.Scene();
// dictionary of all objects
const sceneObjects = {
    cube: new Cube({
        position: { x: 0, y: 0, z: 0 },
        color: 0x00ff00,
        dimension: { x: 1, y: 1, z: 1 },
        speed: 0.05
    }, scene),
    plane: new Plane({
        scene: scene,
        position: { x: 0, y: -0.5, z: 0 },
        color: 0xffff00,
        dimension: { x: 50, y: 50 },
        rotation: -Math.PI / 2
    }, scene)
};

const camera = new PerspCamera({
    position: { x: 0, y: 4, z: 5 },
    lookAt: new Vector3(0, 0, 0),
    up: { x: 0, y: 1, z: 0 },
    aspect: window.innerWidth / window.innerHeight,
    near: 0.1,
    far: 1000,
    fov: 75
}, scene);

export { sceneObjects, camera, scene };