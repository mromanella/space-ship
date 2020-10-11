import "./index.css";
import * as animator from "./animator/index";
import {
    CANVAS_SELECTOR,
    FPS,
    START_CLICKED,
    TO_INFO,
    TO_MAIN_MENU,
    TO_SETTINGS,
    TO_SINGLEPLAYER_GAME
} from "./constants";
import StartMenu from "./menus/start-menu";
import MainMenu from "./menus/main-menu";
import InfoMenu from "./menus/info-menu";
import SettingsMenu from "./menus/settings-menu";
import { MENU_BG_SOUND, MENU_BG_SOUND_SRC } from "./menus/menu-sounds";
import Ship from "./ship";
import { Settings, SinglePlayerGame } from "./game";

function transition(from: animator.Scene, to: animator.Scene) {
    from.stop();
    currentScene = to;
    to.start();
}

const anim = new animator.Animator(CANVAS_SELECTOR, FPS).setDimensions(window.innerWidth - 20,
    window.innerHeight - 15);


let settingsMenu = new SettingsMenu(anim);
let mainMenu = new MainMenu(anim);
let infoMenu = new InfoMenu(anim);
let singlePlayerGame: SinglePlayerGame = null; 

const soundController = animator.sounds.getSoundController();
soundController.volumeMax = 0.35;
soundController.add(MENU_BG_SOUND, MENU_BG_SOUND_SRC).loop(MENU_BG_SOUND, true).volume(MENU_BG_SOUND, 0.15);


const eventController = animator.events.getEventController();
eventController.register(START_CLICKED, () => {
    soundController.stop(MENU_BG_SOUND).play(MENU_BG_SOUND);
    transition(currentScene, mainMenu);
})
eventController.register(TO_INFO, () => {
    transition(currentScene, infoMenu);
});
eventController.register(TO_MAIN_MENU, () => {
    transition(currentScene, mainMenu);
});
eventController.register(TO_SETTINGS, () => {
    transition(currentScene, settingsMenu);
});
eventController.register(TO_SINGLEPLAYER_GAME, () => {
    soundController.stop(MENU_BG_SOUND);
    singlePlayerGame = new SinglePlayerGame(anim, new Settings());
    settingsMenu.stop();
    setTimeout(() => {
        singlePlayerGame.start();
    }, 1500);
});

let startMenu = new StartMenu(anim);
let currentScene: animator.Scene = startMenu;

startMenu.start();