import Experience from "./Experience";
import * as THREE from 'three';


export default class Camera {

  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.scrollEvent= this.experience.scrollEvent;

    this.setInstance()
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
    this.instance.position.z = 6;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.instance.position.y = -this.scrollEvent.scrollY / this.sizes.height * 4; // TODO Change to object distance
  }

  destroy(){

  }

}
