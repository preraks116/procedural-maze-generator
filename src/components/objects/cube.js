import * as THREE from 'three';
import * as CANNON from 'cannon';
import { keyDict } from '../../utils/keyControls';

// Cube class
class Cube {
    constructor(props, scene, world) {
        this.position = props.position;
        this.color = props.color;
        this.scene = scene;
        this.dimension = props.dimension;
        this.speed = props.speed
        this.world = world;
        this.mass = props.mass
        this.linearDamping = props.linearDamping
        this.material = new CANNON.Material();
        this.type = props.type;
    }
    render() {
        // three js rendering
        const geometry = new THREE.BoxGeometry(this.dimension.x, this.dimension.y, this.dimension.z);
        const material = new THREE.MeshPhongMaterial({ color: this.color });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.receiveShadow = true;
        this.mesh.castShadow = true;
        this.scene.add(this.mesh);
        // rotation and position are not set in the threejs part but in cannon part
        // and the threejs part copies cannon part in update

        // this.mesh.position.set(this.position.x, this.position.y, this.position.z);
        // this.scene.add(this.mesh);
        
        // cannon js rendering
        this.body = new CANNON.Body({
            mass: this.mass,
            position: new CANNON.Vec3(this.position.x, this.position.y, this.position.z),
            shape: new CANNON.Box(new CANNON.Vec3(this.dimension.x / 2, this.dimension.y / 2, this.dimension.z / 2)),
            linearDamping: this.linearDamping,
            material: this.material
        });
        this.world.addBody(this.body);
    }
    update() {
        if(this.type === 'player') {
            for(let key in keyDict) {
                if(keyDict[key].pressed) {
                    this.body.velocity.x = -1*this.speed*keyDict[key].x;
                    this.body.velocity.z = -1*this.speed*keyDict[key].z;
                }
            }
        }
        // threejs part copying cannon part
        this.mesh.position.copy(this.body.position);
        this.mesh.quaternion.copy(this.body.quaternion);
    }
}

export { Cube };