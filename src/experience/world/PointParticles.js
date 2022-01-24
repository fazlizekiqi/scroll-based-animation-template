import * as THREE from "three";
import Experience from "../Experience";
import pointVertex from "../shaders/particles.vert";
import pointFragment from "../shaders/particles.frag";

export default class PointParticles {

  constructor() {
    window.dispatchEvent(new Event('scroll'))
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.time = this.experience.time;
    this.resources = this.experience.resources;

    this.setInstance();
  }

  setInstance() {

    this.particleGeometry = new THREE.BufferGeometry();
    this.totalPoints = this.sizes.isMobile ? 400 : 1000;
    this.radius = 9;

    const positions = new Float32Array(this.totalPoints * 3);
    const colors = new Float32Array(this.totalPoints * 3);
    const sizes = new Float32Array(this.totalPoints);

    const vertex = new THREE.Vector3();
    const color = new THREE.Color(0xffffff);

    for (let i = 0; i < this.totalPoints; i++) {

      vertex.x = (Math.random() * 2 - 1) * this.radius / 0.75;
      vertex.y = (Math.random() * 2 - 1.5) * (this.radius * 2);
      vertex.z = (Math.random() * 2 - 2.5) * this.radius;
      vertex.toArray(positions, i * 3);

      vertex.x < 0
        ? color.setHSL(0.5 + 0.1 * (i / this.totalPoints), 0.7, 0.5)
        : color.setHSL(0.1 * (i / this.totalPoints), 0.9, 0.5);

      color.toArray(colors, i * 3);
      sizes[i] = 1;
    }

    this.particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    this.particleGeometry.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));
    this.particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    this.particlesMaterial = new THREE.ShaderMaterial({
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      transparent: true,

      vertexShader: pointVertex,
      fragmentShader: pointFragment,

      uniforms: {
        uColor: {value: new THREE.Color(0xffffff)},
        uBigWavesFrequency: {value: new THREE.Vector2(4, 1.5)},
        uPointTexture: {value: this.resources.items.spark},
        uTime: {value: 0}
      },

    });

    this.particles = new THREE.Points(this.particleGeometry, this.particlesMaterial)
    this.scene.add(this.particles)

  }

  update() {
    let geometrySize = this.particles.geometry.attributes.size;
    for (let i = 0; i < geometrySize.array.length; i++) {
      geometrySize.array[i] = 20.0 * Math.sin(0.1 * i);
    }
    this.particlesMaterial.uniforms.uTime.value = this.time.elapsed * 0.01;
    geometrySize.needsUpdate = true;


  }
}
