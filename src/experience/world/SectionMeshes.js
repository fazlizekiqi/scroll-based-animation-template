import * as THREE from "three";
import Experience from "../Experience";
import { meshRotationSpeed, objectDistance } from "../utils/Constants";
import gsap from "gsap";


export default class SectionMeshes {

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.time = this.experience.time;
    this.scrollEvent = this.experience.scrollEvent;

    this.setMaterial();
    this.setMeshes();
    this.setStartPosition()
    this.setAnimation()
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      color: '#335791',
      roughness: 0.5,
      metalness: 0.8,
      // wireframe: true,
    });
    // this.material = new THREE.ShaderMaterial({
    //   vertexShader: vertexShader,
    //   fragmentShader: fragmentShader,
    //   uniforms: {
    //     uTime: { type: 'f', value: 0.0 },
    //     uColor: { type: 'c', value: new THREE.Color(0xffffff) }
    //   }
    // });
  }

  setMeshes() {

    this.mesh1 = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.4, 16, 60),
      this.material,
    );

    this.mesh2 = new THREE.Mesh(
      new THREE.ConeGeometry(1, 2, 32),
      this.material,
    );

    this.mesh3 = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
      this.material,
    );

    this.mesh1.position.y = -objectDistance * 0;
    this.mesh2.position.y = -objectDistance * 1;
    this.mesh3.position.y = -objectDistance * 2;

    this.mesh1.position.x = this.sizes.isMobile ? 0 :2;
    this.mesh2.position.x = this.sizes.isMobile ? 0 : -2;
    this.mesh3.position.x = this.sizes.isMobile ? 0 :2;
    this.items = [this.mesh1, this.mesh2, this.mesh3]
    this.scene.add(this.mesh1, this.mesh2, this.mesh3);

  }

  setStartPosition() {
    this.startPositions = [];
    for (let i = 0; i < this.items.length; i++) {
      this.startPositions[i] = this.items[i].position.x;
      i % 2 === 0 ? this.items[i].position.x += 5 : this.items[i].position.x -= 5;

    }
  }

  setAnimation() {
    this.scrollEvent.trigger('scroll')

    this.currentSection = -1;
    this.prevSection = -1;

    this.scrollEvent.on('scroll', () => {
      const newSection = Math.round(this.scrollEvent.scrollY / this.sizes.height);

      if(newSection !== this.currentSection) {
        this.prevSection = this.currentSection;
        this.currentSection = newSection;

        gsap.to(
          this.items[this.currentSection].position,
          {
            duration: 1.0,
            ease: 'slow(0.7, 0.7, false)',
            x: this.startPositions[this.currentSection],
          }
        );

        gsap.to(
          this.items[this.currentSection].rotation,
          {
            delay: 0.5,
            duration: 1.5,
            ease: 'slow(0.7, 0.7, false)',
            x: '+=6',
            y: '+=3',
            z: '+=1.5',
          }
        );

      } else {

        if(this.prevSection != -1) {
          gsap.to(
            this.items[this.prevSection].position,
            {
              duration: 0.5,
              ease: 'slow(0.7, 0.7, false)',
              x: this.currentSection % 2 === 0 ? `-=5` : '+=5',
            }
          );
        }
      }
    })
  }

  update() {
    // this.material.uniforms.uTime.value = this.time.delta * 0.3* 0.01

    for (const mesh of this.items) {
      mesh.rotation.x += this.time.delta * meshRotationSpeed;
      mesh.rotation.y += this.time.delta * meshRotationSpeed;
    }

  }
}
