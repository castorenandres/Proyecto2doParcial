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
    private frameCounter = 0;
    private currentCharFrame = 0;
    private click: boolean = false;
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


    private spritedead = new Image();
    private spriteidle  = new Image();
    private spritejump = new Image();
    private spriteland = new Image();
    private soundJump = new Audio(jumpSound);
    private soundLand = new Audio(landSound);
    private coinGrab = new Audio(grabCoin);

    public getPosition () {
        return this.position;
    }

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

    public checkCollisionCoin = (moneda: Moneda) => { // checar si es mejor aqui o en moneda o current scene
        const mRight = moneda.getRightSide() + 20;
        const mLeft = moneda.getLeftSide() - 20;
        const mTop = moneda.getTopSide() + 20;
        const mBottom = moneda.getBottomSide() - 20;

        if (this.LeftSide  < mRight && this.RightSide > mLeft && this.TopSide < mBottom && this.BottomSide > mTop) {
            // incrementa score y la moneda aparece en otra parte.
            if(this.coinGrab.paused) {
                this.coinGrab.play();
                moneda.changeCoinPosition();
                this.score += 1;
            }
            
        }
    };

    public CharacterDead = () => { // checar si funciona
        this.currentCharFrame = 0;
        this.offsetx = 94.2;
        this.frameCounter += 1;
<<<<<<< HEAD

=======
>>>>>>> b0fe7c5c3ac269bdbe43bf242734d2db60f449a3
        if (this.currentCharFrame < 10) { 
            if (this.frameCounter % 6 === 0) {
                this.currentCharFrame = (this.currentCharFrame + 1);
            }
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