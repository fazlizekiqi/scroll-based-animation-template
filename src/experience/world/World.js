import Experience from "../Experience";
import Environment from "./Environment";
import SectionMeshes from "./SectionMeshes";
import PointParticles from "./PointParticles";

export default class World {

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.resources.on('progress', (event) => {
      console.log(event)
      // Add a progress component
    })

    this.resources.on('ready', () => {
      // Loaded resources
      this.pointParticles = new PointParticles();
    })

    this.environment = new Environment();
    this.sectionMeshes = new SectionMeshes();


  }

  update() {
    this.sectionMeshes.update();
    if(this.pointParticles){
      this.pointParticles.update();

    }
  }

  destroy() {

  }
}
