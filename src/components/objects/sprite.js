import * as THREE from 'three';
import * as CANNON from 'cannon-es';

class Sprite {
    constructor(props, scene, world) {
        this.position = props.position;
        this.scene = scene;
        this.dimension = props.dimension;
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
        this.sprite.scale.set(this.dimension.x, this.dimension.y, 1);
        this.scene.add(this.sprite);

        // rotation and position are not set in the threejs part but in cannon part
        // and the threejs part copies cannon part in update

        // add offset to the position to center the sprite
        this.spriteOffset = new CANNON.Vec3(0.2,0,0.2);

        // cannon js rendering
        this.body = new CANNON.Body({
            mass: this.mass,
            position: new CANNON.Vec3(this.position.x - 0.2, this.position.y, this.position.z - 0.2),
            shape: new CANNON.Box(new CANNON.Vec3(this.dimension.x / 2, this.dimension.y / 2, this.dimension.z / 2)),
            linearDamping: this.linearDamping,
            material: this.material
        });
        this.body.quaternion.setFromEuler(this.rotation.x, this.rotation.y, this.rotation.z);
        // this.world.addBody(this.body);
    }
    update() {
        // threejs part copying cannon part
        this.sprite.position.copy(this.body.position.vadd(this.spriteOffset));
        this.sprite.quaternion.copy(this.body.quaternion);
    }
}

export { Sprite };


