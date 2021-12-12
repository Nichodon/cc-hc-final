import { Button } from './button.mjs';

class Door extends Button {
    constructor(texture, pos, dim, platform) {
        super(texture, pos, dim);

        this.platform = platform;
    }

    trigger() {
        if (this.pressed.length) this.platform.play();

        super.trigger();
    }
}

export { Door };