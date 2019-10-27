import spriteDead from "/assets/spritesheetKnightDeadNew.png";
import spriteIdle from "/assets/spritesheetKnightIdle.png";
import spriteJump from "/assets/spritesheetKnightJump.png";
import spriteLand from "/assets/spritesheetKnightLand.png";
import jumpSound from "/assets/jump.wav";
import landSound from "/assets/land.ogg";
import grabCoin from "/assets/grabCoin.wav";
import GameContext from "./GameContext";
import Moneda from "./Moneda";

type coords = [number, number];

class Character {
    private position: coords = [0,0];
    private charWidth: number = 57;
    private charHeight: number = 80;
    private sWidth = 57; // sprite width
    private sHeight = 80; // sprite height
    private frameCounter = 0;
    private currentCharFrame = 0;
    private click: boolean = false; // flag for mouse click
    private character = new Image();
    private lastMouseEvent: string = "";
    private currentMouseEvent: string = "";
    private offsetx: number = 62.1;
    private score: number = 0;

    // hitbox
    private RightSide = this.position[0] + this.charWidth; 
    private LeftSide = this.position[0];
    private TopSide = this.position[1];
    private BottomSide = this.position[1] + this.charHeight;

    // sprites and sounds
    private spritedead = new Image();
    private spriteidle  = new Image();
    private spritejump = new Image();
    private spriteland = new Image();
    private soundJump = new Audio(jumpSound);
    private soundLand = new Audio(landSound);
    private coinGrab = new Audio(grabCoin);

    public getRightSide () {
        return this.RightSide;
    }

    public getLeftSide () {
        return this.LeftSide;
    }
    
    public getTopSide () {
        return this.TopSide;
    }
    
    public getBottomSide () {
        return this.BottomSide;
    }

    public getScore() {
        return this.score;
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
        this.coinGrab.volume = 1;

        this.character = this.spriteidle;
        this.position = [(width - this.charWidth) / 2, height * 0.55 - this.charHeight];
    };

    public checkCollisionCoin = (moneda: Moneda) => { 
        const mRight = moneda.getRightSide() + 20;
        const mLeft = moneda.getLeftSide() - 20;
        const mTop = moneda.getTopSide() + 20;
        const mBottom = moneda.getBottomSide() - 20;

        if (this.LeftSide  < mRight && this.RightSide > mLeft && this.TopSide < mBottom && this.BottomSide > mTop) {
            // changes coin's position and increments score by one
            if(this.coinGrab.paused) {
                this.coinGrab.play();
                moneda.changeCoinPosition();
                this.score += 1;
            }
            
        }
    };

    public CharacterDead = () => { // sets the sprite to spriteKnightDead and changes the last and current mouse event to run the animation
        this.character = this.spritedead;
        this.sWidth = 57;
        this.offsetx = 89.5; 
        this.currentCharFrame = 0;
        this.lastMouseEvent = "dead";
        this.currentMouseEvent = "dead";
        
    };

    public mouseMovementHandler = (event: MouseEvent) => {
        let [coordx, coordy] = this.position;

        // Mouse has to be over the character to move
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

        if (this.click) { // If click is true, the character moves to the center of the cursor
            coordx = (event.offsetX - this.charWidth / 2);
            coordy = (event.offsetY - this.charHeight / 2);
        }
        this.position = [coordx, coordy]; // updates the new position of the character
    };


    public update = () => {
        this.RightSide = this.position[0] + this.charWidth;
        this.LeftSide = this.position[0];
        this.TopSide = this.position[1];
        this.BottomSide = this.position[1] + this.charHeight;

        this.frameCounter += 1;
        if (this.currentMouseEvent === "" ) { // idle animation 
            this.character = this.spriteidle;
            this.offsetx = 62.1;
            

            
            if (this.frameCounter % 6 === 0) {
                this.currentCharFrame = (this.currentCharFrame + 1) % 10;
            }
        }

        if (this.currentMouseEvent === "mousedown") { // jump animation
            this.character = this.spritejump;
            this.offsetx = 62.4;
            

            
            if (this.currentCharFrame < 4) { 
                if (this.frameCounter % 6 === 0) {
                    this.currentCharFrame = (this.currentCharFrame + 1);
                }
            }
            
        }

        

        if (this.currentMouseEvent === "mouseup" ) { // land animation
            this.character = this.spriteland;
            this.offsetx = 62.4;
            
            if (this.currentCharFrame < 5) {
                if (this.frameCounter % 6 === 0) {
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

        if (this.currentMouseEvent === "dead" && this.lastMouseEvent === "dead") { // dead animation
            this.frameCounter += 1;
            if (this.currentCharFrame < 9) { 
                if (this.frameCounter % 6 === 0) {
                    this.currentCharFrame = (this.currentCharFrame + 1);
                }
            }  
        }

    };

    public render = () => {
        const {context} = GameContext;
        let [xpos, ypos] = this.position;
        const sy = 0;
        
        // Character
        context.save();
        context.beginPath();
        context.translate(xpos, ypos);
        context.drawImage(this.character,this.currentCharFrame * this.offsetx, sy, this.sWidth, this.sHeight, 0, 0,this.charWidth,this.charHeight);
        context.closePath();
        context.restore();

        // Score
        context.save();
        context.beginPath();
        context.font = "50px Arial";
        context.fillStyle = "yellow";
        context.fillText(this.score.toString(),380,60);
        context.closePath();
        context.restore();
    };

};

export default Character;