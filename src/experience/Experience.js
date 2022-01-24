import * as THREE from 'three';
import Sizes from './utils/Sizes';
import Time from './utils/Time';
import Camera from './Camera';
import Renderer from './Renderer';
import World from './world/World';
import Resources from './utils/Resources';
import sources from './sources';
import Debug from "./utils/Debug";
import MouseMovement from "./utils/MouseMovement";
import CameraGroup from "./CameraGroup";
import ScrollEvent from "./utils/ScrollEvent";

let singletonExperience = null;

export default class Experience {


    constructor(canvas) {
        if(singletonExperience) {
            return singletonExperience;
        }

        singletonExperience = this;

        // Handy when debugging.
        window.experience = this;

        this.canvas = canvas;

        this.debug = new Debug();
        this.time = new Time();
        this.sizes = new Sizes();
        this.scrollEvent = new ScrollEvent();
        this.scene = new THREE.Scene();
        this.mouseMovement = new MouseMovement();
        this.resources = new Resources(sources);
        this.camera = new Camera();
        this.cameraGroup = new CameraGroup();
        this.renderer = new Renderer();
        this.world = new World();

        this.sizes.on('resize', () => this.resize())
        this.time.on('tick', () => this.update())
        // this.mouseMovement.on('mouse-move', () => this.update())
    }

    resize() {
        this.camera.resize();
        this.renderer.resize();
    }

    update() {
        this.camera.update();
        this.cameraGroup.update()
        this.world.update();
        this.renderer.update();
    }

    /*
       If we are using post-processing, we will need to dispose of the "EffectComposer"
       its WebGLRenderTarget and any potential passes we are using.
    */
    destroy() {
        this.sizes.destroy();
        this.time.destroy();

        // Traverse the whole scene
        this.scene.traverse((child) => {
            if(child instanceof THREE.Mesh) {
                child.geometry.dispose();
                for (const materialKey in child.material) {
                    const value = child.material[materialKey];
                    if(value && value.dispose === 'function') {
                        value.dispose();
                    }
                }
            }
        })

        this.world.destroy();
        this.camera.destroy();
        this.cameraGroup.destroy();
        this.renderer.destroy()
        this.debug.destroy();

    }
}
