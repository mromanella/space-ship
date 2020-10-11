import * as animator from "./animator/index";
import { StarScape } from "./starscape";

class StarScapeScene extends animator.Scene {

    starScape: StarScape = new StarScape(this.anim.ctx, 200, this.anim.getWidth(), this.anim.getHeight());

    constructor(anim: animator.Animator) {
        super(anim, 750);
        this.gameObjects = [
            this.starScape
        ]
    }

    update() {
        this.starScape.createStars();
    }

    start() {
        super.start();
        this.starScape.createStars();
    }
}

export default StarScapeScene;