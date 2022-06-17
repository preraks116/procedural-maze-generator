import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { CannonUtils } from '../../../utils/cannonUtils';
import { threeToCannon, ShapeType } from 'three-to-cannon';

const objLoader = new OBJLoader();

// recursive function that traverses through this.model and enables shadows for all meshes, and for groups, it calls itself
function enableShadows(object) {
    let child = object.children[0];
    child.castShadow = true;
    child.receiveShadow = true;
}

// recursive function to add shapes to the body 
function addShapes(object, body) {
    let child = object.children[0];
    let shape = CannonUtils.CreateTrimesh(child.geometry);
    // shape.setScale(0.5, 0.5, 0.5);
    // shape.scale = new CANNON.Vec3(0.71, 0.71, 0.71);
    body.addShape(shape); 
}

class OBJModel {
    constructor(props, scene, world) {
        this.position = props.position;
        this.scale = props.scale;
        this.scene = scene;
        this.world = world;
        this.rotation = props.rotation;
        this.mass = props.mass;
        this.linearDamping = props.linearDamping;
        this.material = new CANNON.Material();
        this.isLoaded = false;
        this.resourceURL = props.resourceURL;
    }
    render() {
        // wait for the gltfLoader to load the model
        // following function is called when the model is loaded
        objLoader.load(this.resourceURL, (obj) => {
            // threejs rendering
            this.isLoaded = true;
            // the loaded model
            this.model = obj;
            // set the position and scale
            this.model.position.set(this.position.x, this.position.y, this.position.z);
            this.model.scale.set(this.scale.x, this.scale.y, this.scale.z);
            // add the model to the scene

            this.model.castShadow = true;
            this.model.receiveShadow = true;

            this.body = new CANNON.Body({
                mass: this.mass,
                position: new CANNON.Vec3(this.position.x, this.position.y, this.position.z),
                linearDamping: this.linearDamping,
                material: this.material
            });
            
            enableShadows(this.model);
            // addShapes(this.model, this.body);
            const result = threeToCannon(this.model, {type: ShapeType.HULL});
            const { shape, offset, quaterniion } = result;
            this.body.addShape(shape, offset, quaterniion);


            this.scene.add(this.model);
            this.body.quaternion.setFromEuler(this.rotation.x, this.rotation.y, this.rotation.z);
            this.world.addBody(this.body);
        }
        );
    }
    update() {
        if (this.isLoaded) {
          this.model.position.copy(this.body.position);
          this.model.quaternion.copy(this.body.quaternion);
        }
    }
}

export { OBJModel };