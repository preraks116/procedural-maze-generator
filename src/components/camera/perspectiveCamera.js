import * as THREE from 'three';

// perspective camera class 
// orbit controls dont work with this camera
// window resize stops working as well - fixed: change camera to camera.camera
class PerspCamera {
    constructor(props, scene) {
      this.position = props.position;
      this.lookAt = props.lookAt;
      this.up = props.up;
      this.aspect = props.aspect;
      this.near = props.near;
      this.far = props.far;
      this.fov = props.fov;
      this.camera = new THREE.PerspectiveCamera(this.fov, this.aspect, this.near, this.far);
      this.scene = scene;
    }
    render() {
      // this.camera.position.x = this.position.x;
      // this.camera.position.y = this.position.y;
      // this.camera.position.z = this.position.z;
      this.camera.position.set(this.position.x, this.position.y, this.position.z);
      this.camera.lookAt(this.lookAt);
      this.camera.up = this.up;
      this.scene.add(this.camera);
    }
}

export { PerspCamera };