import EventEmitter from "./EventEmitter";
import Experience from "../Experience";

export default class ScrollEvent extends EventEmitter {

  constructor() {
    super();
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scrollY = window.scrollY;

    this.listener = () => {
      this.scrollY = window.scrollY;
      this.trigger('scroll');
    };

    window.addEventListener('scroll', this.listener)
  }

  destroy() {
    this.off('scroll');
    window.removeEventListener('scroll', this.listener);
  }
}
