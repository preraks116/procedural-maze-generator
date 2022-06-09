import * as THREE from 'three';
import { Vector3 } from 'three';

// perspective camera class 
// orbit controls dont work with this camera
class OrthoCamera {
    constructor(props, scene) {
        this.cameraOffset = new Vector3(props.position.x, props.position.y , props.position.z);
        this.position = props.position;
        this.lookAt = props.lookAt;
        this.up = props.up;
        this.rotation = props.rotation;
        this.width = props.width;
        this.height = props.height;
        this.near = props.near;
        this.far = props.far;
        this.camera = new THREE.OrthographicCamera(this.width / - 2, this.width / 2, this.height / 2, this.height / - 2, this.near, this.far);
        // this.camera = new THREE.OrthographicCamera(this.left, this.right, this.top, this.bottom, this.near, this.far);
        this.scene = scene;
    }
    render() {
        this.camera.rotation.order = this.rotation.order;
        this.camera.position.set(this.position.x, this.position.y, this.position.z);
        this.camera.rotation.y = this.rotation.y;
        this.camera.rotation.x = this.rotation.x;
        this.camera.lookAt(this.lookAt);
        this.camera.up = this.up;
        this.scene.add(this.camera);
    }
    update(target) {
        this.camera.position.copy(target.position).add(this.cameraOffset);
    }
}

export { OrthoCamera };