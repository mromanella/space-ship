import * as animator from "./animator/index";
import { keyNames } from "./animator/src/keyboard/index";
import Key from "./animator/src/keyboard/key";
import { Point } from "./animator/src/objects/index";
import Ship from "./ship";
import { StarScape } from "./starscape";

const EASY = 0;
const MEDIUM = 1;
const HARD = 2;

const DIFFICULTIES = {
    EASY,
    MEDIUM,
    HARD
}

class Settings {

    difficulty: number = EASY;

}

class SinglePlayerGame extends animator.Scene {

    settings: Settings;
    numStars: number = 250;
    starScape: StarScape;
    ship: Ship;

    constructor(anim: animator.Animator, settings: Settings) {
        super(anim);
        this.anim = anim;
        this.settings = settings;
        this.starScape = new StarScape(this.anim.ctx, this.numStars, this.anim.getWidth(), this.anim.getHeight());
        this.ship = new Ship(this, 200, 200, 10, 'orange', 0.55);

        this.click = this.click.bind(this);
        this.spacePressed = this.spacePressed.bind(this);
        this.keys = [
            new Key(Ship.P1_SHIP_RIGHT, [this.ship.move], [this.ship.remove]),
            new Key(Ship.P1_SHIP_LEFT, [this.ship.move], [this.ship.remove]),
            new Key(Ship.P1_SHIP_DOWN, [this.ship.move], [this.ship.remove]),
            new Key(Ship.P1_SHIP_UP, [this.ship.move], [this.ship.remove]),
            new Key(keyNames.SPACE, [this.spacePressed])
        ]
        this.gameObjects = [
            this.starScape,
            this.ship
        ]
    }

    click(event: MouseEvent) {
        const to = new Point(event.pageX - 5, event.pageY - 5);
        if (event.button === 0) {
            this.leftClick(to);
        } else if (event.button === 2) {
            this.rightClick(to);
        }
    }

    leftClick(to: Point) {
        console.log('fire')
        this.ship.firePrimary(to);
    }

    rightClick(to: Point) {

    }

    spacePressed() {
        // Stop the ship!
        this.ship.velocity.x = 0;
        this.ship.velocity.y = 0;
    }

    start() {
        super.start();
        this.ship.setUpdateInterval();
        addEventListener('mousedown', this.click, true);
    }

    stop() {
        super.stop();
        this.ship.clearUpdateInterval();
        removeEventListener('mousedown', this.click, true)
    }

}

export { Settings, SinglePlayerGame, DIFFICULTIES };