import spriteDead from "/assets/spritesheetKnightDead.png";
import spriteIdle from "/assets/spritesheetKnightIdle.png";
import spriteJump from "/assets/spritesheetKnightJump.png";
import spriteLand from "/assets/spritesheetKnightLand.png";
import jumpSound from "/assets/jump.wav";
import landSound from "/assets/land.ogg";
import GameContext from "./GameContext";
import Moneda from "./Moneda";

type coords = [number, number];

class Character {
    private position: coords = [0,0];
    private charWidth: number = 60;
    private charHeight: number = 92;
    private frameCounter = 0;
    private currentCharFrame = 0;
    private click: boolean = false;
    private character = new Image();
    private lastMouseEvent: string = "";
    private currentMouseEvent: string = "";
    private offsetx: number = 62.1;

    // hitbox
    private RightSide = this.position[0] + this.charWidth;
    private LeftSide = this.position[0];
    private TopSide = this.position[1];
    private BottomSide = this.position[1] + this.charHeight;


    private spritedead = new Image();
    private spriteidle  = new Image();
    private spritejump = new Image();
    private spriteland = new Image();
    private soundJump = new Audio(jumpSound);
    private soundLand = new Audio(landSound);

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
        this.soundJump.volume = 0.8;
        this.soundLand.volume = 0.5;

        this.character = this.spriteidle;

        this.position = [(width - this.charWidth) / 2, height * 0.55 - this.charHeight];
    };

    public checkCollisionCoin = (moneda: Moneda) => {
        const mRight = moneda.getRightSide();
        const mLeft = moneda.getLeftSide();
        const mTop = moneda.getTopSide();
        const mBottom = moneda.getBottomSide();

        if (this.LeftSide  < mRight && this.RightSide > mLeft && this.TopSide < mBottom && this.BottomSide > mTop) {
            // incrementa score y la moneda aparece en otra parte.
        }
    };

    public mouseMovementHandler = (event: MouseEvent) => {
        let [coordx, coordy] = this.position;
        const {context} = GameContext;
        const {width, height} = context.canvas;
        console.log(this.RightSide)
        // mouse tiene que estar sobre el personaje para moverse
        if (event.offsetX < this.RightSide  && event.offsetX > this.LeftSide && event.offsetY < this.BottomSide && event.offsetY > this.TopSide) {
            if (event.type === "mousedown" && (this.currentMouseEvent === "" || this.currentMouseEvent === "mouseup")){
                if(this.soundJump.paused) {
                    this.soundJump.play();
                }
                this.click = true;
                this.lastMouseEvent = this.currentMouseEvent;
                this.currentMouseEvent = "mousedown";
                this.currentCharFrame = 0;
            } else if (event.type === "mouseup" && this.currentMouseEvent === "mousedown") {
                this.click = false;
                this.lastMouseEvent = this.currentMouseEvent;
                this.currentMouseEvent = "mouseup";
                this.currentCharFrame = 0;
            } else if (event.type === "mousedown" && this.currentMouseEvent === "mousedown") {
                this.click = true;
                this.lastMouseEvent = this.currentMouseEvent;
                this.currentMouseEvent = "mousedown";
            }
        }

        if (this.click) { // mouse has to enter the character hit box to be able to move pendiente
            coordx = (event.offsetX - this.charWidth / 2);
            coordy = (event.offsetY - this.charHeight / 2);
        }
        this.position = [coordx, coordy];
    };


    public update = () => {
        const {context} = GameContext;
        const {width} = context.canvas;
        this.RightSide = this.position[0] + this.charWidth;
        this.LeftSide = this.position[0];
        this.TopSide = this.position[1];
        this.BottomSide = this.position[1] + this.charHeight;

        let [xpos, ypos] = this.position;

        // posicion actual con movimiento de mouse pendiente
        this.frameCounter += 1;
        if (this.currentMouseEvent === "" ) { // idle animation 
            this.character = this.spriteidle;
            this.offsetx = 62.1;
            

            
            if (this.frameCounter % 3 === 0) {
                this.currentCharFrame = (this.currentCharFrame + 1) % 10;
            }
        }

        if (this.currentMouseEvent === "mousedown") { // jump animation
            this.character = this.spritejump;
            this.offsetx = 62.4;
            

            
            if (this.currentCharFrame < 4) { 
                if (this.frameCounter % 3 === 0) {
                    this.currentCharFrame = (this.currentCharFrame + 1);
                }
            } else {
                this.currentCharFrame = 4;
            }
            
        }

        if (this.currentMouseEvent === "mousedown" && this.lastMouseEvent === "mousedown") { 
            this.currentCharFrame = 5;
        }

        if (this.currentMouseEvent === "mouseup" ) { // land animation
            this.character = this.spriteland;
            this.offsetx = 62.4;
            

            
            if (this.currentCharFrame < 6) {
                if (this.frameCounter % 3 === 0) {
                    this.currentCharFrame = (this.currentCharFrame + 1);
                }
            } else { // change to idle animation
                if(this.soundLand.paused) {
                    this.soundLand.play();
                }
                this.lastMouseEvent = this.currentMouseEvent;
                this.currentMouseEvent = "";
            }
            
        }

        
        
        
    };

    public render = () => {
        const {context} = GameContext;
        let [xpos, ypos] = this.position;
        const sy = 0;
        const sWidth = 57;
        const sHeight = 80;

        context.save();
        context.beginPath();
        context.translate(xpos, ypos);
        context.drawImage(this.character,this.currentCharFrame * this.offsetx, sy, sWidth, sHeight, 0, 0,this.charWidth,this.charHeight);
        context.closePath();
        context.restore();
    };

};

export default Character;