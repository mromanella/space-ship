import * as animator from "../animator/index";
import { FONT_FAMILY, TO_MAIN_MENU, TO_SINGLEPLAYER_GAME } from "../constants";
import StarScapeMenu from "./starscape-menu";

class SettingsMenu extends StarScapeMenu {

    subButtons: animator.objects.text.SelectTextBoxGroup[];

    constructor(anim: animator.Animator) {
        super(anim);
        this.select = this.select.bind(this);
        this.cursorLeft = this.cursorLeft.bind(this);
        this.cursorRight = this.cursorRight.bind(this);
        this.buttons = new animator.objects.text.SelectTextBoxGroup(anim.ctx, 'yellow', [
            new animator.objects.text.TextBox(anim.ctx, 'Main menu', 25, 25, 0,
                'white', `${anim.getWidth() / 45}px`, FONT_FAMILY),
            new animator.objects.text.TextBox(anim.ctx, 'Difficulty', (anim.getWidth() / 3),
                (anim.getHeight() / 8), 0,
                'white', `${anim.getWidth() / 25}px`, FONT_FAMILY),
            new animator.objects.text.TextBox(anim.ctx, 'Play', (anim.getWidth() / 2.4),
                (anim.getHeight() / 1.25), 0,
                'white', `${anim.getWidth() / 20}px`, FONT_FAMILY)
        ]);
        this.subButtons = [
            null,
            new animator.objects.text.SelectTextBoxGroup(anim.ctx, 'yellow',
                [
                    new animator.objects.text.TextBox(anim.ctx, 'Easy', (anim.getWidth() / 4),
                        (anim.getHeight() / 4), 0,
                        'white', `${anim.getWidth() / 35}px`, FONT_FAMILY),
                    new animator.objects.text.TextBox(anim.ctx, 'Medium', (anim.getWidth() / 2.3),
                        (anim.getHeight() / 4), 0, 
                        'white', `${anim.getWidth() / 35}px`, FONT_FAMILY),
                    new animator.objects.text.TextBox(anim.ctx, 'Hard', (anim.getWidth() / 1.5),
                        (anim.getHeight() / 4), 0, 
                        'white', `${anim.getWidth() / 35}px`, FONT_FAMILY)
                ]),
            null
        ];
        this.keys = [
            new animator.keyboard.Key(animator.keyboard.keyNames.ARROW_UP, [this.cursorUp]),
            new animator.keyboard.Key(animator.keyboard.keyNames.ARROW_DOWN, [this.cursorDown]),
            new animator.keyboard.Key(animator.keyboard.keyNames.ENTER, [this.select]),
            new animator.keyboard.Key(animator.keyboard.keyNames.ARROW_LEFT, [this.cursorLeft]),
            new animator.keyboard.Key(animator.keyboard.keyNames.ARROW_RIGHT, [this.cursorRight])
        ];
        this.buttons.cursor = 1;
        this.subButtons[1].cursor = 0;
    }

    cursorRight() {
        const i = this.buttons.cursor;
        const sub = this.subButtons[i];
        if (sub) {
            super.playHighlightSound();
            sub.cursorUp();
        }
    }

    cursorLeft() {
        const i = this.buttons.cursor;
        const sub = this.subButtons[i];
        if (sub) {
            super.playHighlightSound();
            sub.cursorDown();
        }
    }

    select() {
        super.select();
        let to = null;
        const i = this.buttons.cursor;
        if (i === 0) {
            this.playSelectSound();
            to = TO_MAIN_MENU;
        } else if (i === 2) {
            this.playSelectPlaySound();
            to = TO_SINGLEPLAYER_GAME;
        }
        if (to) {
            this.eventController.trigger(to);
        }
    }

    draw() {
        super.draw();
        for (let group of this.subButtons) {
            if (group) {
                group.draw();
            }
        }
    }
}

export default SettingsMenu;

