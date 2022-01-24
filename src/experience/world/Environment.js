import * as THREE from 'three';
import Experience from "../Experience";

export default class Environment {

    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.debug = this.experience.debug;

        if(this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('environment');
        }

        this.setSunlight();
        this.setEnvironmentMap();
    }

    setSunlight() {
        this.directionalLight = new THREE.DirectionalLight('#ffffff', 4)
        this.directionalLight.position.set(1, 1, 5);
        this.scene.add(this.directionalLight);

        if(this.debug.active){
            this.debugFolder
              .add(this.directionalLight,'intensity')
              .name('sunLightIntensity')
              .min(0)
              .max(10)
              .step(0.001);

            this.debugFolder
              .add(this.directionalLight.position,'x')
              .name('sunLightX')
              .min(-5)
              .max(5)
              .step(0.001);

            this.debugFolder
              .add(this.directionalLight.position,'y')
              .name('sunLightY')
              .min(-5)
              .max(5)
              .step(0.001);

            this.debugFolder
              .add(this.directionalLight.position,'z')
              .name('sunLightZ')
              .min(-5)
              .max(5)
              .step(0.001);
        }

    }

    setEnvironmentMap() {

    }
}
