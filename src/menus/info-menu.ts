import * as animator from "../animator/index";
import {
    FONT_FAMILY,
    TO_MAIN_MENU,
} from "../constants";
import StarScapeMenu from "./starscape-menu";

class InfoMenu extends StarScapeMenu {

    constructor(anim: animator.Animator) {
        super(anim);
        this.select = this.select.bind(this);
        this.buttons = new animator.objects.text.SelectTextBoxGroup(anim.ctx, 'yellow', [
            new animator.objects.text.TextBox(anim.ctx, 'Main menu', 25, 25, 0,
                'white', `${anim.getWidth() / 45}px`, FONT_FAMILY)
        ]);
        this.keys = [
            new animator.keyboard.Key(animator.keyboard.keyNames.ENTER, [this.select])
        ];
        this.nonSelectableText = new animator.objects.text.TextBoxGroup(anim.ctx, [
            new animator.objects.text.TextBox(anim.ctx, 'Credits', (anim.getWidth() / 3.25),
                100, 0, 'white', `${anim.getWidth() / 15}px`, FONT_FAMILY),
            new animator.objects.text.TextBox(anim.ctx, 'Jesús Lastra', (anim.getWidth() / 2.6),
                225, 0, 'white', `${anim.getWidth() / 45}px`, FONT_FAMILY),
            new animator.objects.text.TextBox(anim.ctx, 'Gichco', (anim.getWidth() / 2.25),
                275, 0, 'white', `${anim.getWidth() / 45}px`, FONT_FAMILY)
        ]);
        this.buttons.cursor = 0;
    }

    draw() {
        super.draw();
    }

    select() {
        super.select();
        this.playSelectSound();
        this.eventController.trigger(TO_MAIN_MENU);
    }
}

export default InfoMenu;