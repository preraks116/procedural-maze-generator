import * as THREE from 'three';
import { keyDict } from '../../utils/keyControls';

// Cube class
class Cube {
    constructor(props, scene) {
        this.position = props.position;
        this.color = props.color;
        this.scene = scene;
        this.dimension = props.dimension;
        this.speed = props.speed
    }
    render() {
        const geometry = new THREE.BoxGeometry(this.dimension.x, this.dimension.y, this.dimension.z);
        const material = new THREE.MeshPhongMaterial({ color: this.color });
        this.cube = new THREE.Mesh(geometry, material);
        this.cube.position.set(this.position.x, this.position.y, this.position.z);
        // this.scene.add(this.cube);
        this.scene.add(this.cube);
    }
    update() {
        // this.cube.translateZ(-0.05);
        for(let key in keyDict)
        {
            if(keyDict[key].pressed)
            {
                this.cube.translateX(-1*this.speed*keyDict[key].x);
                this.cube.translateZ(-1*this.speed*keyDict[key].z);
            }
        }
        
    }
}

export { Cube };