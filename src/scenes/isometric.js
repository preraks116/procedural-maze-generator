import * as THREE from 'three';
import { Vector3 } from 'three';    
import { Cube } from "../components/objects/cube";
import { Plane } from "../components/objects/plane";
import { OrthoCamera } from '../components/camera/orthographicCamera';

const scene = new THREE.Scene();
// dictionary of all objects
const sceneObjects = {
    cube: new Cube({
        position: { x: 0, y: 0, z: 0 },
        color: 0x00ff00,
        dimension: { x: 1, y: 1, z: 1 }
    }, scene),
    plane: new Plane({
        scene: scene,
        position: { x: 0, y: -0.5, z: 0 },
        color: 0xffff00,
        dimension: { x: 10, y: 10 },
        rotation: -Math.PI / 2
    }, scene)
};

const camera = new OrthoCamera({
  position: { x: 20, y: 20, z: 20 },
  rotation: { 
    order: 'YXZ', 
    x: Math.atan( - 1 / Math.sqrt( 2 ) ), 
    y: - Math.PI / 4, 
    z: 0},
  lookAt: new Vector3(0, 0, 0),
  up: { x: 0, y: 1, z: 0 },
  width: window.innerWidth/100,
  height: window.innerHeight/100,
  near: 1,
  far: 1000 
}, scene)

export { sceneObjects, camera, scene };