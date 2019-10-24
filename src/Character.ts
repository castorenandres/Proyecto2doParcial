import spriteDead from "/assets/spritesheetKnightDead.png";
import spriteIdle from "/assets/spritesheetKnightIdleNew.png";
import spriteJump from "/assets/spritesheetKnightJump.png";
import spriteLand from "/assets/spritesheetKnightLand.png";
import spritetest from "/assets/spritesheet.png";
import GameContext from "./GameContext";

type coords = [number, number];

class Character {
    private position: coords = [0,0];
    private charWidth: number = 80; // pendiente
    private charHeight: number = 100; // pendiente
    private frameCounter = 0;
    private currentCharFrame =0;
    private character = new Image();


    private st = new Image();
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
        this.st.src = spritetest;

        this.character = this.st;

        this.position = [(width - this.charWidth) / 2, height * .8 - this.charHeight];
    };

    public update = () => {
        const {context} = GameContext;
        const {width} = context.canvas;

        let [xpos, ypos] = this.position;

        // posicion actual con movimiento de mouse
        /*
        this.frameCounter += 1;
        if (this.frameCounter % 2 === 0) {
            this.currentCharFrame = (this.currentCharFrame + 1) % 10;
        }
        */
    };

    public render = () => {
        const {context} = GameContext;
        let [xpos, ypos] = this.position;
        const offsetX = 108.8;
        const sy = 0;
        const sWidth = 55;
        const sHeight = 92;

        context.save();
        context.beginPath();
        context.drawImage(this.st,this.currentCharFrame * offsetX, sy, sWidth, sHeight, 0, 0,this.charWidth,this.charHeight);
        context.closePath();
        context.restore();
    };

};

export default Character;