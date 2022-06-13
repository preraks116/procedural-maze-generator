import * as THREE from 'three';
import * as CANNON from 'cannon';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const loader = new GLTFLoader();

class Model {
  constructor(props, scene, world) {
    this.position = props.position;
    this.dimension = props.dimension;
    this.scene = scene;
    this.world = world;
    this.mass = props.mass;
    this.linearDamping = props.linearDamping;
  }
  render() {
    loader.load("src/assets/models/scene2.gltf", (gltf) => {
        this.model = gltf.scene
        this.scene.add(this.model)
        // this.model.scale.set(0.5,0.5,0.5);
        this.model.scale.set(this.dimension.x, this.dimension.y, this.dimension.z);
        this.model.position.set(this.position.x, this.position.y, this.position.z);
    })
  }
  update(){
    // does nothing
  }
}

export { Model };