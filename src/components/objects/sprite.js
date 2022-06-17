import * as THREE from 'three';
import * as CANNON from 'cannon-es';

class Sprite {
    constructor(props, scene, world) {
        this.position = props.position;
        this.scene = scene;
        // this.dimension = props.dimension;
        this.world = world;
        this.rotation = props.rotation;
        this.mass = props.mass;
        this.material = new CANNON.Material();
        this.resourceURL = props.resourceURL;
    }
    render() {
        // three js rendering
        const map = new THREE.TextureLoader().load(this.resourceURL);
        const material = new THREE.SpriteMaterial({ map: map });
        this.sprite = new THREE.Sprite(material);
        // this.sprite.scale.set(this.dimension.x, this.dimension.y, 1);
        this.scene.add(this.sprite);

        // rotation and position are not set in the threejs part but in cannon part
        // and the threejs part copies cannon part in update

        // add offset to the position to center the sprite
        this.spriteOffset = new CANNON.Vec3(0.1,0,0.1);
        this.box = new THREE.Box3().setFromObject(this.sprite);
        // subtract the max and min of the box to get the half dimensions
        this.dimension = new CANNON.Vec3(
            0.45,
            0.45,
            0.45
        );

        // cannon js rendering
        this.body = new CANNON.Body({
            mass: this.mass,
            position: new CANNON.Vec3(this.position.x - this.spriteOffset.x, this.position.y - this.spriteOffset.y, this.position.z - this.spriteOffset.z),
            shape: new CANNON.Box(new CANNON.Vec3(this.dimension.x, this.dimension.y, this.dimension.z)),
            linearDamping: this.linearDamping,
            material: this.material
        });
        this.body.quaternion.setFromEuler(this.rotation.x, this.rotation.y, this.rotation.z);
        this.world.addBody(this.body);
    }
    update() {
        // threejs part copying cannon part
        this.sprite.position.copy(this.body.position.clone().vadd(this.spriteOffset));
        this.sprite.quaternion.copy(this.body.quaternion);
    }
}

export { Sprite };


