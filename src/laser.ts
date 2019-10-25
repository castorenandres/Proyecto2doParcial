import GameContext from "./GameContext";
import Character from "./Character";
import laserImage from "/assets/laser.png"
import Time from "./Time"

type coords = [number, number];

class laser{
    private position: coords = [0, 0]
    private direction: coords = [0,0]
    private laserWidth: number = 50;
    private laserHeight: number = 100;
    private speed = 250;
    private laser = new Image();
    private axis: number = null;
    private horizontal: boolean = null;
    
    public getPosition(){
        return this.position;
    }

    constructor(){
        const {context} = GameContext;
        const { width, height} = context.canvas;
        this.laser.src = laserImage;
        let [posX, posY] = this.position;

        this.position = [0, 0]

        this.axis = Math.random();

        if(this.axis < .5){
            //Vertial
            posX = (this.random(5) * 125) + 87.5 + 45
            this.position = [posX, 0]
            this.horizontal = false;
        }else{
            //Horizontal
            posY = (this.random(5) * 125) + 87.5 + 45
            this.position = [0, posY]
            this.horizontal = true;
            //Rotar la imagen 90 grados
        }
 
    }

    public update = () => {
        const { context } = GameContext;
        const { width } = context.canvas;

        let [posX, posY] = this.position;

        if(this.axis < .5){
            posY = posY + this.speed * Time.deltaTime;
        }else{
            posX = posX + this.speed * Time.deltaTime;
            
        }

        this.position = [posX, posY];

        if(posY < 0 || posY > width || posX < 0 || posX > width){
            delete this.laser
        }

    }

    public render = () => {
        const { context } = GameContext;
        let[posX, posY] = this.position;
        if(this.horizontal == false){
            context.save();
            context.beginPath();
            context.drawImage(this.laser, posX, posY);
            context.closePath();
            context.restore();
        }else{
            console.log("laser horizontal")
            context.save();
            context.beginPath();
            context.translate(posX, posY)
            context.rotate(90 * Math.PI / 180)
            context.drawImage(this.laser, 0, 0);
            context.closePath();
            context.restore(); 
        }
    }

    public random(max: number){
        return Math.floor(Math.random() * Math.floor(max))
    }

}

export default laser;