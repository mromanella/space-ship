import * as animator from "../animator/index";
import StarScapeScene from "../starscape-scene";
import { HIGHLIGHT_SOUND, HIGHLIGHT_SOUND_SRC, SELECT_PLAY_SOUND, SELECT_PLAY_SOUND_SRC, SELECT_SOUND, SELECT_SOUND_SRC } from "./menu-sounds";

class StarScapeMenu extends StarScapeScene {

    buttons: animator.objects.text.SelectTextBoxGroup;
    nonSelectableText: animator.objects.text.TextBoxGroup;

    constructor(anim: animator.Animator) {
        super(anim);
        this.soundController.add(HIGHLIGHT_SOUND, HIGHLIGHT_SOUND_SRC)
        this.soundController.add(SELECT_SOUND, SELECT_SOUND_SRC);
        this.soundController.add(SELECT_PLAY_SOUND, SELECT_PLAY_SOUND_SRC);
        this.cursorDown = this.cursorDown.bind(this);
        this.cursorUp = this.cursorUp.bind(this);
    }

    playHighlightSound() {
        this.soundController.stop(HIGHLIGHT_SOUND).play(HIGHLIGHT_SOUND);
    }

    playSelectSound() {
        this.soundController.stop(SELECT_SOUND).play(SELECT_SOUND);
    }

    playSelectPlaySound() {
        this.soundController.stop(SELECT_PLAY_SOUND).play(SELECT_PLAY_SOUND);
    }

    select() {
        
    }

    cursorDown() {
        this.playHighlightSound();
        this.buttons.cursorUp();
    }

    cursorUp() {
        this.playHighlightSound();
        this.buttons.cursorDown();
    }

    update() {
        super.update();

    }

    draw() {
        super.draw();
        if (this.buttons) {
            this.buttons.draw();
        }
        if (this.nonSelectableText) {
            this.nonSelectableText.draw();
        }
    }
}

export default StarScapeMenu;