import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { keyDict } from '../../utils/keyControls';


class Box {
    constructor(props, scene, world) {
        this.position = props.position;
        this.color = props.color ? props.color : 0xffffff;
        this.hoverColor = props.hoverColor ? props.hoverColor : 0xffff00;
        this.scene = scene;
        this.dimension = props.dimension;
        this.speed = props.speed
        this.world = world;
        this.mass = props.mass
        this.isHoverable = props.isHoverable ? props.isHoverable : false;
        this.isClickable = props.isClickable ? props.isClickable : false;
        this.linearDamping = props.linearDamping
        this.angularDamping = props.angularDamping
        this.material = new CANNON.Material();
        this.textures = props.textures;
    }
    render() {
        // three js rendering
        const geometry = new THREE.BoxGeometry(this.dimension.x, this.dimension.y, this.dimension.z);
        const material = this.textures ? new THREE.MeshStandardMaterial(this.textures): new THREE.MeshPhongMaterial({ color: this.color });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.receiveShadow = true;
        this.mesh.castShadow = true;
        this.mesh.transparent = true;
        // Hover userData
        this.mesh.userData.isHoverable = this.isHoverable;
        this.mesh.userData.onHover = this.onHover.bind(this);
        this.mesh.userData.resetHover = this.resetHover.bind(this);
        // Click userData
        this.mesh.userData.isClickable = this.isClickable;
        this.mesh.userData.onClick = this.onClick.bind(this);
        this.mesh.userData.resetClick = this.resetClick.bind(this);
        this.scene.add(this.mesh);
        console.log(this.mesh.userData);
        
        // cannon js rendering
        this.body = new CANNON.Body({
            mass: this.mass,
            position: new CANNON.Vec3(this.position.x, this.position.y, this.position.z),
            linearDamping: this.linearDamping,
            angularDamping: this.angularDamping,
            material: this.material
        });
        // get dimensions of mesh
        const box = new THREE.Box3().setFromObject(this.mesh);
        // console.log(box);
        this.body.addShape(new CANNON.Box(new CANNON.Vec3(
            (box.max.x - box.min.x)/2, 
            (box.max.y - box.min.y)/2, 
            (box.max.z - box.min.z)/2
        )));
        // this.body.addShape(new CANNON.Sphere(this.dimension.x), new CANNON.Vec3(0, 1, 0));
        this.world.addBody(this.body);
    }
    update() {
        // threejs part copying cannon part
        this.mesh.position.copy(this.body.position);
        this.mesh.quaternion.copy(this.body.quaternion);
    }
    onHover() {
        this.mesh.material.color.setHex(this.hoverColor);
    }
    resetHover() {
        this.mesh.material.color.setHex(this.color);
    }
    onClick() {

    }
    resetClick() {

    }
}

export { Box };