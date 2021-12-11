import { Camera } from './camera.mjs';
import { Player } from './player.mjs';

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.element.getContext('2d');

        this.camera = new Camera();

        this.players = [];
        this.objects = [];
        this.inputs = [];
      
        this.levels = [];
        this.level = -1;

        this.stage = 'game';
    }

    addLevel(level) {
        this.levels.push(level);
    }

    nextLevel() {
        this.level++;

        this.players[0].pos = { ...this.levels[this.level].spawns[0].pos };
        this.players[1].pos = { ...this.levels[this.level].spawns[1].pos };
    }

    addPlayer(player) {
        this.players.push(player);
    }

    addInput(input) {
        this.inputs.push(input);
    }

    update() {
        switch (this.stage) {
            case 'game':
                this.gameTick();
                break;
        }
    }

    gameTick() {
        let level = this.levels[this.level];
        let objects = level.objects.concat(this.players);
        let goals = level.goals;

        this.players[0].tag = "P1";
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.inputs[0].check();
        this.inputs[1].check();

        for (let i = 0; i < objects.length; i++) {
            objects[i].update();
        }

        for (let i = 0; i < objects.length; i++) {
            if (objects[i].detectObject) {
                for (let j = 0; j < objects.length; j++) {
                    objects[i].detectObject(objects[j]);
                }
            }
        }

        for (let i = 0; i < objects.length; i++) {
            objects[i].move();
            this.draw(objects[i]);
        }

        if (level.goals[0].player && 1 || level.goals[1].player) {
            console.log('a');
        }

        this.camera.update(this.players);
    }

    draw(object) {
        let real = this.camera.zoom * this.canvas.width / 1000;

        this.context.drawImage(object.image,
            this.canvas.width / 2 + (object.pos.x - object.dim.w / 2 - this.camera.pos.x) * real,
            this.canvas.height / 2 + (object.pos.y - object.dim.h / 2 - this.camera.pos.y) * real,
            object.dim.w * real,
            object.dim.h * real);
        this.context.strokeStyle = object.touch && object.touch.bottom ? 'green' : 'red';
        let x1 = this.canvas.width / 2 + (object.box.left - this.camera.pos.x) * real;
        let x2 = this.canvas.width / 2 + (object.box.right - this.camera.pos.x) * real;
        let y1 = this.canvas.height / 2 + (object.box.top - this.camera.pos.y) * real;
        let y2 = this.canvas.height / 2 + (object.box.bottom - this.camera.pos.y) * real;
        this.context.strokeRect(x1, y1, x2 - x1, y2 - y1);
        this.context.strokeStyle = 'blue';
        return;
        this.context.strokeRect(
            this.canvas.width / 2 + (object.pos.x - object.dim.w / 2 - this.camera.pos.x) * real,
            this.canvas.height / 2 + (object.pos.y - object.dim.h / 2 - this.camera.pos.y) * real,
            object.dim.w * real,
            object.dim.h * real);
    }
}

export { Game, Camera, Player };