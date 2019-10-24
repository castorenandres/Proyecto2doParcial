import spriteDead from "/assets/spritesheetKnightDead.png";
import spriteIdle from "/assets/spritesheetKnightIdle.png";
import spriteJump from "/assets/spritesheetKnightJump.png";
import spriteLand from "/assets/spritesheetKnightLand.png";
import GameContext from "./GameContext";

type coords = [number, number];

class Character {
    private position: coords = [0,0];
    private charWidth: number = 60; // pendiente
    private charHeight: number = 92; // pendiente
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

        this.position = [(width - this.charWidth) / 2, height * .8 - this.charHeight];
    };

    public update = () => {
        const {context} = GameContext;
        const {width} = context.canvas;

        let [xpos, ypos] = this.position;

        // posicion actual con movimiento de mouse
        
        this.frameCounter += 1;
        if (this.frameCounter % 2 === 0) {
            this.currentCharFrame = (this.currentCharFrame + 1) % 10;
        }
        
    };

    public render = () => {
        const {context} = GameContext;
        let [xpos, ypos] = this.position;
        const offsetX = 62.1;
        const sy = 0;
        const sWidth = 57;
        const sHeight = 80;

        context.save();
        context.beginPath();
        context.translate(xpos, ypos);
        context.drawImage(this.character,this.currentCharFrame * offsetX, sy, sWidth, sHeight, 0, 0,this.charWidth,this.charHeight);
        context.closePath();
        context.restore();
    };

};

export default Character;