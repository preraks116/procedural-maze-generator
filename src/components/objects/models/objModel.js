import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { CannonUtils } from '../../../utils/cannonUtils';
import { threeToCannon, ShapeType } from 'three-to-cannon';

const objLoader = new OBJLoader();

// recursive function that traverses through this.model and enables shadows for all meshes, and for groups, it calls itself
function enableShadows(object) {
    for( let i = 0; i < object.children.length; i++ ) {
        let child = object.children[i];
        if(child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
        else {
            enableShadows(child);
        }
    }
}

// recursive function to add shapes to the body 
function addShapes(object, body) {
    for (let i = 0; i < object.children.length; i++) {
        let child = object.children[i];
        if (child.isMesh) {
            // console.log(child);
            let result = threeToCannon(child, { type: ShapeType.HULL });
            let { shape, offset, quaterniion } = result;
            shape.scale = new CANNON.Vec3(0.05, 0.05, 0.05);   
            // console.log(result);
            // console.log(offset)
            // console.log(shape);
            // offset.y = 5;
            // body.addShape(shape, offset, quaterniion);
        }
        else {
            addShapes(child, body);
        }
    }
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
            console.log(this.model);
            addShapes(this.model, this.body);
            // const result = threeToCannon(this.model, {type: ShapeType.HULL});
            // const result = threeToCannon(this.model, {type: ShapeType.HULL});
            // console.log(result);
            // const { shape, offset, quaterniion } = result;
            // this.body.addShape(shape, offset, quaterniion); 


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