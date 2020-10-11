import * as animator from "./animator/index";
import Key from "./animator/src/keyboard/key";
import { Point } from "./animator/src/objects/index";
import { Rectangle } from "./animator/src/objects/shapes";
import { DefaultLaserWeapon, LaserWeapon, ClusterLaserWeapon } from "./laser";

class Ship extends animator.objects.shapes.Circle {

    static P1_SHIP_UP = animator.keyboard.keyNames.W;
    static P1_SHIP_DOWN = animator.keyboard.keyNames.S;
    static P1_SHIP_LEFT = animator.keyboard.keyNames.A;
    static P1_SHIP_RIGHT = animator.keyboard.keyNames.D;

    rate: number;
    velocity: Point;
    maxRate: number;
    pressed: Map<string, boolean> = new Map<string, boolean>();
    keys: string[];
    primary: LaserWeapon;
    secondary: LaserWeapon;

    constructor(scene: animator.Scene, x: number, y: number, radius: number, color: string,
        rate: number = 5, maxRate: number = 30) {
        super(scene.anim.ctx, x, y, 50, radius, color);
        this.rate = rate;
        this.maxRate = maxRate
        this.velocity = new Point(0, 0);
        this.keys = [
            Ship.P1_SHIP_UP,
            Ship.P1_SHIP_DOWN,
            Ship.P1_SHIP_LEFT,
            Ship.P1_SHIP_RIGHT
        ]
        const rect = new Rectangle(this.ctx,
            0, 0, null, scene.anim.getWidth(), scene.anim.getHeight(), 'white');
        this.primary = new ClusterLaserWeapon(this.ctx, this.location, rect);
        this.move = this.move.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
    }

    update() {
        for (let keyName of this.keys) {
            if (this.pressed.get(keyName)) {
                if (keyName === Ship.P1_SHIP_DOWN) {
                    this.moveDown();
                } else if (keyName === Ship.P1_SHIP_LEFT) {
                    this.moveLeft();
                } else if (keyName === Ship.P1_SHIP_RIGHT) {
                    this.moveRight();
                } else {
                    this.moveUp();
                }
                this.clampVelocity();
            } else {
                if (keyName === Ship.P1_SHIP_DOWN) {
                    this.moveUp();
                } else if (keyName === Ship.P1_SHIP_LEFT) {
                    this.moveRight();
                } else if (keyName === Ship.P1_SHIP_RIGHT) {
                    this.moveLeft();
                } else {
                    this.moveDown();
                }
            }
        }
        this.location.x += this.velocity.x;
        this.location.y += this.velocity.y;
    }

    draw() {
        this.primary.draw();
        super.draw();
    }

    firePrimary(to: Point) {
        this.primary.fire(to, this.velocity);
    }

    move(key: Key) {
        this.pressed.set(key.keyName, true);
    }

    remove(key: Key) {
        this.pressed.set(key.keyName, false);
    }

    clampVelocity() {
        const norm = new Point(Math.abs(this.velocity.x), Math.abs(this.velocity.y));
        if (Math.abs(norm.x) > this.maxRate) {
            this.velocity.x = Math.sign(this.velocity.x) * this.maxRate;
        }
        if (Math.abs(norm.y) > this.maxRate) {
            this.velocity.y =  Math.sign(this.velocity.y) * this.maxRate;
        }
    }

    moveUp() {
        this.velocity.y -= this.rate;
    }

    moveDown() {
        this.velocity.y += this.rate;
    }

    moveLeft() {
        this.velocity.x -= this.rate;
    }

    moveRight() {
        this.velocity.x += this.rate;
    }

    removeUp() {
        this.moveDown();
    }

    removeDown() {
        this.moveUp();
    }

    removeLeft() {
        this.moveRight();
    }

    removeRight() {
        this.moveLeft();
    }

    setUpdateInterval() {
        super.setUpdateInterval();
        this.primary.setUpdateInterval();
    }

    clearUpdateInterval() {
        super.clearUpdateInterval();
        let interval: number = null;
        interval = setInterval(() => {
            if (this.primary.lasers.length === 0) {
                this.primary.clearUpdateInterval();
                clearInterval(interval);
            }
        }, 1000);
    }

}

export default Ship;