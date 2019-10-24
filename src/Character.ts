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
    private character = new Image();


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

        this.character = this.spriteidle;


    };

    public update = () => {
        //
    };

    public render = () => {
        const {context} = GameContext;
        let [xpos, ypos] = this.position;

        context.save();
        context.beginPath();
        context.drawImage(this.character,100,100,this.charWidth,this.charHeight);
        context.closePath();
        context.restore();
    };

};

export default Character;