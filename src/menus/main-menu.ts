import * as animator from "../animator/index";
import {
    FONT_FAMILY,
    TO_INFO,
    TO_MAIN_MENU,
    TO_SETTINGS
} from "../constants";
import StarScapeMenu from "./starscape-menu";

class MainMenu extends StarScapeMenu {

    constructor(anim: animator.Animator) {
        super(anim);
        this.select = this.select.bind(this);
        this.buttons = new animator.objects.text.SelectTextBoxGroup(anim.ctx, 'yellow', [
            new animator.objects.text.TextBox(anim.ctx, 'Singleplayer', (anim.getWidth() / 6), anim.getHeight() / 4, 0,
                'white', `${anim.getWidth() / 15}px`, FONT_FAMILY),
            new animator.objects.text.TextBox(anim.ctx, 'Info', (anim.getWidth() / 2.225), anim.getHeight() / 2, 0,
                'white', `${anim.getWidth() / 30}px`, FONT_FAMILY)
        ]);
        this.keys = [
            new animator.keyboard.Key(animator.keyboard.keyNames.ARROW_UP, [this.cursorUp]),
            new animator.keyboard.Key(animator.keyboard.keyNames.ARROW_DOWN, [this.cursorDown]),
            new animator.keyboard.Key(animator.keyboard.keyNames.ENTER, [this.select])
        ];
    }

    select() {
        super.select();
        this.playSelectSound();
        let to = TO_MAIN_MENU;
        const i = this.buttons.cursor;
        if (i === 0) {
            to = TO_SETTINGS;
        } else if (i === 1) {
            // View info
            to = TO_INFO;
        }
        this.eventController.trigger(to);
    }
}

export default MainMenu;