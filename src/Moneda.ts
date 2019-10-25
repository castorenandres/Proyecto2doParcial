import spriteMoneda from "/assets/spritesheet.png"
import GameContext from "./GameContext"

type coords = [number, number];

class Moneda {
    private position : coords = [0, 0];
    private monedaWidth: number = 32;
    private monedaHeight: number = 32;
    private frameCounter = 0;
    private currentCharFrame = 0;
    private moneda = new Image();

    private spritemoneda = new Image();

    // hitbox
    private RightSide = this.position[0] + this.monedaWidth;
    private LeftSide = this.position[0];
    private TopSide = this.position[1];
    private BottomSide = this.position[1] + this.monedaHeight;

    public getPosition(){
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

    //recibe una position [x,y]
    public setPosition(position){
        this.position = position;
    }

    public constructor () {
        const {context} = GameContext;
        const {width, height} = context.canvas;
        this.spritemoneda.src = spriteMoneda;
        this.moneda = this.spritemoneda;

        this.position = [(width - this.monedaWidth) / 2, height * .8 - this.monedaHeight];
    }

    public update = () => {
        const {context} = GameContext;
        const {width} = context.canvas;
        this.RightSide = this.position[0] + this.monedaWidth;
        this.LeftSide = this.position[0];
        this.TopSide = this.position[1];
        this.BottomSide = this.position[1] + this.monedaHeight;

        let [xpos, ypos] = this.position;

        this.frameCounter +=1;
        if(this.frameCounter % 3 == 0) {
            this.currentCharFrame = (this.currentCharFrame + 1) % 9;
        }
    }
    public render = () => {
        const {context} = GameContext;
        let [xpos, ypos] = this.position;
        const offsetX = 34;
        const sy = 0;
        const sWidth = 29;
        const sHeight = 29;

        context.save();
        context.beginPath();
        context.translate(xpos, ypos);
        context.scale(1.5,1.5)
        context.drawImage(this.moneda, this.currentCharFrame * offsetX, sy, sWidth, sHeight, 0, 0, this.monedaWidth, this.monedaHeight);
        context.closePath();
        context.restore();
    }
}

export default Moneda;