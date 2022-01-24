import EventEmitter from "./EventEmitter";
import Experience from "../Experience";


export default class MouseMovement {

  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;

    this.cursorY = 0;
    this.cursorX = 0;
    this.parallaxX = 0;
    this.parallaxY = 0;

    this.listener = (event) => {
      this.cursorX = event.clientX / this.sizes.width - 0.5;
      this.cursorY = event.clientY / this.sizes.height - 0.5;

      this.parallaxX = this.cursorX * 0.5;
      this.parallaxY = -this.cursorY * 0.5;
    };

    window.addEventListener('mousemove', this.listener)
  }

  destroy() {
    window.removeEventListener('mousemove', this.listener);
  }
}
