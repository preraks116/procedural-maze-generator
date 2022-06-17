  import './style.css'

  import * as THREE from 'three';
  import * as CANNON from 'cannon-es';
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
  import { setKey } from './src/utils/keyControls';
  // import CannonDebugger from 'cannon-es-debugger'


  // import { sceneObjects, lighting, camera, scene, world, cannonDebugger } from './src/scenes/perspective';
  import { sceneObjects, lighting, camera, scene, world, cannonDebugger } from './src/scenes/isometric'; 

  const renderer = new THREE.WebGLRenderer();
  let controls;
  const player = sceneObjects['cube'];

  async function init() {
    // initialization
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // load camera
    camera.render();

    // orbit controls
    // controls = new OrbitControls(camera.camera, renderer.domElement);
    // controls.listenToKeyEvents(window); // optional

    // lighting
    for(let key in lighting) {
      lighting[key].render();
    }

    // renders all objects in scene
    for (let key in sceneObjects) {
      sceneObjects[key].render();
    }

    // for debugging
    // const cube = new THREE.Mesh(
    //   new THREE.BoxGeometry(3, 3, 3), 
    //   new THREE.MeshStandardMaterial(textures.brick)
    // );
    // cube.position.set(3, 1.5, -3);
    // scene.add(  cube );

    // event listeners
    window.addEventListener('keydown', (e) => setKey(e, true));
    window.addEventListener('resize', onWindowResize);
    window.addEventListener( 'keyup', (e) => setKey(e, false));
  }

  function animate() {
    requestAnimationFrame(animate);
    // setTimeout( function() {

    //   requestAnimationFrame( animate );

    // }, 1000 / 30 );
    renderer.render(scene, camera.camera);
    // controls.update();
    if(player){camera.update(player.body)};
    world.step(1 / 60);

    for (let key in sceneObjects) {
      sceneObjects[key].update();
    }
    cannonDebugger.update()
  }

  function onWindowResize() {
    camera.camera.aspect = window.innerWidth / window.innerHeight;
    camera.camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

  }

  init();
  animate();