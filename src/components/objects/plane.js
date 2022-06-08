import * as THREE from 'three';

// Plane class
class Plane {
    constructor(props, scene) {
      this.position = props.position;
      this.color = props.color;
      this.scene = scene;
      this.dimension = props.dimension;
      this.rotation = props.rotation;
    }
    render() {
      const geometry = new THREE.PlaneGeometry(this.dimension.x, this.dimension.y);
      const material = new THREE.MeshPhongMaterial({ color: this.color, side: THREE.DoubleSide });
      this.plane = new THREE.Mesh(geometry, material);
      this.plane.position.x = this.position.x;
      this.plane.position.y = this.position.y;
      this.plane.position.z = this.position.z;
      this.plane.rotation.x = this.rotation;
      this.scene.add(this.plane);
    }
}

export { Plane };