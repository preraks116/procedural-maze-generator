import * as THREE from 'three';

// Cube class
class Cube {
    constructor(props, scene) {
        this.position = props.position;
        this.color = props.color;
        this.scene = scene;
        this.dimension = props.dimension;
    }
    render() {
        const geometry = new THREE.BoxGeometry(this.dimension.x, this.dimension.y, this.dimension.z);
        const material = new THREE.MeshPhongMaterial({ color: this.color });
        this.cube = new THREE.Mesh(geometry, material);
        this.cube.position.set(this.position.x, this.position.y, this.position.z);
        // this.scene.add(this.cube);
        this.scene.add(this.cube);
    }
    rotate() {
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
    }
}

export { Cube };