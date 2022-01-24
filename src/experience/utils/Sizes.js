import EventEmitter from "./EventEmitter";

export default class Sizes extends EventEmitter {

    constructor() {
        super();

        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);

        this.listener = () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.pixelRatio = Math.min(window.devicePixelRatio, 2);
            this.trigger('resize');
        };
        window.addEventListener('resize', this.listener)
    }

    destroy() {
        this.off('resize');
        window.removeEventListener('resize', this.listener);
    }
}
