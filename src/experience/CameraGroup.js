import Experience from "./Experience";
import * as THREE from 'three';

export default class CameraGroup {

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.time = this.experience.time;
    this.mouseMovement = this.experience.mouseMovement;



    this.setInstance();
  }

  setInstance(){
    this.instance = new THREE.Group();
    this.scene.add(this.instance)
    this.instance.add(this.camera.instance)
  }

  update(){
    this.instance.position.x += (this.mouseMovement.parallaxX - this.instance.position.x) * 0.01 * this.time.delta;
    this.instance.position.y += (this.mouseMovement.parallaxY - this.instance.position.y) * 0.01 * this.time.delta;
  }

  destroy() {

  }
}
