import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

const fbxLoader = new FBXLoader();

class FBXModel {
    constructor(props, scene, world) {
        this.position = props.position;
        this.scale = props.scale;
        this.scene = scene;
        this.world = world;
        this.mass = props.mass;
        this.linearDamping = props.linearDamping;
        this.rotation = props.rotation;
        this.material = new CANNON.Material();
        this.isLoaded = false;
        this.resourceURL = props.resourceURL;
    }
    render() {
        // wait for the fbxLoader to load the model
        // following function is called when the model is loaded
        fbxLoader.load(this.resourceURL, (fbx) => {
            // threejs rendering
            this.isLoaded = true;
            // the loaded model
            this.model = fbx;
            // set the position and scale
            this.model.position.set(this.position.x, this.position.y, this.position.z);
            this.model.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
            this.model.scale.set(this.scale.x, this.scale.y, this.scale.z);
            // add the model to the scene
            this.model.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            this.scene.add(this.model);
            // preprocessing to get the model's bounding box
            const box = new THREE.Box3().setFromObject(this.model);
            // subtract max and min vectors
            this.dimension = new THREE.Vector3().subVectors(box.max, box.min);
            // cannon js rendering
            this.body = new CANNON.Body({
                mass: this.mass,
                
                position: new CANNON.Vec3(this.position.x, this.position.y, this.position.z),
                shape: new CANNON.Box(new CANNON.Vec3(this.dimension.x / 2, this.dimension.y / 2, this.dimension.z / 2)),
                linearDamping: this.linearDamping,
                material: this.material
            });
            // this.world.addBody(this.body);
        });
    }
    update() {
        if (this.isLoaded) {
            // this.model.position.copy(this.body.position);
            // this.model.quaternion.copy(this.body.quaternion);
        }
    }
}
export { FBXModel };