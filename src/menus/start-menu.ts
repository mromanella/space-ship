import * as animator from "../animator/index";
import { FONT_FAMILY, START_CLICKED } from "../constants";
import StarScapeMenu from "./starscape-menu";

class StartMenu extends StarScapeMenu {

    constructor(anim: animator.Animator) {
        super(anim);
        this.select = this.select.bind(this);
        this.buttons = new animator.objects.text.SelectTextBoxGroup(anim.ctx, 'yellow', [
            new animator.objects.text.TextBox(anim.ctx, 'Start', (anim.getWidth() / 2.5), anim.getHeight() / 2, 0,
                'yellow', `${anim.getWidth() / 25}px`, FONT_FAMILY)
        ]);
        this.keys = [
            new animator.keyboard.Key(animator.keyboard.keyNames.ENTER, [this.select])
        ]
        this.nonSelectableText = new animator.objects.text.TextBoxGroup(anim.ctx, [
            new animator.objects.text.TextBox(anim.ctx, 'Space Ship', (anim.getWidth() / 4.75), anim.getHeight() / 5, 0,
                'white', `${anim.getWidth() / 15}px`, FONT_FAMILY),
        ])

    }

    select() {
        this.playSelectSound();
        this.eventController.trigger(START_CLICKED);
    }

}

export default StartMenu;