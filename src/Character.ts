import spriteDead from "/assets/spritesheetKnightDead.png";
import spriteIdle from "/assets/spritesheetKnightIdle.png";
import spriteJump from "/assets/spritesheetKnightJump.png";
import spriteLand from "/assets/spritesheetKnightLand.png";
import GameContext from "./GameContext";

type coords = [number, number];

class Character {
    private position: coords = [0,0];
    private charWidth: number = 75; // pendiente
    private charHeight: number = 75; // pendiente
    private frameCounter = 0;
    private currentCharFrame =0;

    private spritedead = new Image();
    private spriteidle  = new Image();
    private spritejump = new Image();
    private spriteland = new Image();

    public getPosition () {
        return this.position;
    }

    public constructor () {
        const {context} = GameContext;
        const {width, height} = context.canvas;
        this.spriteidle.src = spriteIdle;
        this.spritejump.src = spriteJump;
        this.spriteland.src = spriteLand;
        this.spritedead.src = spriteDead;
    };

    public render = () => {
        const {context} = GameContext;
        let [xpos, ypos] = this.position;

        context.save();
        context.beginPath();
        //context.drawImage(this.spriteidle)
    };

};

export default Character;