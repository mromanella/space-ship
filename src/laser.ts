import * as animator from "./animator/index";
import { GameObject, Point } from "./animator/src/objects/index";
import { Circle, Rectangle } from "./animator/src/objects/shapes";
import { randomBetween } from "./animator/src/utils";

class Laser extends animator.objects.shapes.Line {

    rate: number;
    velocity: Point;
    shouldRemove: boolean = false;

    constructor(ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        updateSpeed: number,
        width: number,
        color: string,
        direction: animator.objects.Point,
        length: number,
        rate: number,
        velocity: Point) {
        super(ctx, x, y, updateSpeed, width, color, direction, 2, length);
        this.rate = rate;
        this.velocity = velocity;
    }

}

class LaserWeapon extends GameObject {

    gameBoundsRect: Rectangle;
    fireLimit: number;
    lasers: DefaultLaser[] = [];

    constructor(ctx: CanvasRenderingContext2D, x: number, y: number,
        fireLimit: number, gameBoundsRect: Rectangle, updateSpeed: number = null) {
        super(ctx, x, y, updateSpeed)
        this.fireLimit = fireLimit;
        this.gameBoundsRect = gameBoundsRect;
    }

    update() {
        const lasers = [];
        for (let laser of this.lasers) {
            if (laser.shouldRemove || !animator.collision.withinBounds(laser, this.gameBoundsRect)) {
                laser.clearUpdateInterval();
            } else {
                lasers.push(laser);
            }
        }
        this.lasers = lasers;
    }

    fire(to: Point, velocity: Point) {

    }

    atLimit() {
        return this.lasers.length === this.fireLimit;
    }

    draw() {
        for (let laser of this.lasers) {
            if (laser.shouldDraw) {
                laser.draw();
            }
        }
    }

}

class DefaultLaserWeapon extends LaserWeapon {

    static fireLimit = 3;

    constructor(ctx: CanvasRenderingContext2D, shipLocation: Point, gameBoundsRect: Rectangle) {
        super(ctx, shipLocation.x, shipLocation.y, DefaultLaserWeapon.fireLimit, gameBoundsRect, 1000);
        this.location = shipLocation;
    }

    fire(to: Point, velocity: Point) {
        if (!this.atLimit()) {
            const direction = to.diff(this.location).direction();
            const laser = new DefaultLaser(this.ctx, this.location.x,
                this.location.y, DefaultLaser.updateSpeed, DefaultLaser.width,
                DefaultLaser.color, direction, DefaultLaser.len, DefaultLaser.rate,
                velocity.copy());
            laser.setUpdateInterval();
            this.lasers.push(laser);
        }
    }
}

class DefaultLaser extends Laser {

    static color = 'red';
    static rate = 50;
    static width = 5;
    static len = 20;
    static updateSpeed = 50;

    update() {
        for (let i = 0; i < this.path.length; i++) {
            const withDir = this.direction.multiply(this.rate);
            this.path[i] = this.path[i].add(withDir);
            if (!this.velocity.equals(new Point(0, 0))) {
                const mod = new Point(0, 0);
                if (Math.abs(this.velocity.x) < this.rate) {
                    mod.x = this.velocity.x;
                }
                if (Math.abs(this.velocity.y) < this.rate) {
                    mod.y = this.velocity.y;
                }
                this.path[i].add(mod);
            }
        }
    }
}

class ClusterLaserWeapon extends DefaultLaserWeapon {

    lasers: ClusterLaser[];

    draw() {
        super.draw();
        for (let laser of this.lasers) {
            if (laser.exploding) {
                laser.explosionCircle.draw();
            }
        }
    }

    fire(to: Point, velocity: Point) {
        if (!this.atLimit()) {
            const direction = to.diff(this.location).direction();
            const laser = new ClusterLaser(this.ctx, this.location.x,
                this.location.y, ClusterLaser.updateSpeed, ClusterLaser.width,
                ClusterLaser.color, direction, ClusterLaser.len, ClusterLaser.rate,
                velocity.copy());
            laser.explosionCircle = new Circle(this.ctx, to.x,
                to.y, null, ClusterLaser.radius, ClusterLaser.color);
            laser.setUpdateInterval();
            this.lasers.push(laser);
        }
    }

}

class ClusterLaser extends DefaultLaser {

    static radius: number = 50;
    explosionCircle: Circle;
    exploding: boolean = false;
    shouldUpdate: boolean = true;

    update() {
        if (this.shouldUpdate) {
            super.update();
        }
        if (this.exploding) {
            this.explosionCircle.radius = randomBetween(3, 50);
        } else if (animator.collision.checkCollision(this, this.explosionCircle)) {
            this.explode();
        }
    }

    explode() {
        this.shouldDraw = false;
        this.exploding = true;
        this.shouldUpdate = false;
        setTimeout(() => {
            this.shouldRemove = true;
        }, 1700);
    }
}

export {
    LaserWeapon, Laser, DefaultLaserWeapon, DefaultLaser,
    ClusterLaserWeapon, ClusterLaser
};