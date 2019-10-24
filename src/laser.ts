import GameContext from "./GameContext";
import Character from "./Character";
import laserImage from "/assets/laser.png"
import Time from "./Time"

type coords = [number, number];

class laser{
    private position: coords = [0, 0]
    private direction: coords = [1,0];
    private laserWidth: number = 50;
    private laserHeight: number = 100;
    private speed = 15;
    private laser = new Image();
    
    public getPosition(){
        return this.position;
    }

    constructor(){
        const {context} = GameContext;
        const { width, height} = context.canvas;
        this.laser.src = laserImage;
        this.position = [width-this.laserWidth/2, 50]
    }

    public update = () => {
        const { context } = GameContext;
        const { width } = context.canvas;

        let [posX, posY] = this.position;

        posX = posX + this.speed*Time.deltaTime;

        this.position = [posX, posY];

    }

    public render = () => {
        const { context } = GameContext;
        let[posX, posY] = this.position;

        context.save();
        context.beginPath();
        //context.translate(posX, posY);
        context.drawImage(this.laser, 400, 400);
        context.closePath();
        context.restore();
    }

}

export default laser;