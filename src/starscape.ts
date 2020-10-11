import * as animator from "./animator/index";
import { GameObject } from "./animator/src/objects/index";

class Star extends animator.objects.shapes.Circle {

    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number = 1, color: string = '#fff') {
        super(ctx, x, y, 0, radius, color);
    }
}

class StarScape extends GameObject {

    ctx: CanvasRenderingContext2D;
    numStars: number;
    xMax: number;
    yMax: number;
    stars: Star[] = [];

    constructor(ctx: CanvasRenderingContext2D, numStars: number, xMax: number, yMax: number) {
        super(ctx, 0, 0, null);
        this.numStars = numStars;
        this.xMax = xMax;
        this.yMax = yMax;
        this.createStars();
    }

    createStars() {
        this.stars = [];
        for (let i = 0; i < this.numStars; i++) {
            let x = animator.utils.randomBetween(0, this.xMax);
            let y = animator.utils.randomBetween(0, this.yMax);
            let rad = animator.utils.randomBetween(1, 2);
            let star = new Star(this.ctx, x, y, rad);
            this.stars.push(star);
        }
    }

    drawStars() {
        for (let star of this.stars) {
            star.draw();
        }
    }

    draw() {
        this.ctx.fillStyle = '#000'
        this.ctx.fillRect(0, 0, this.xMax, this.yMax);
        this.drawStars();
    }
}

export {
    Star,
    StarScape
}