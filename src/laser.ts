import GameContext from "./GameContext";
import Character from "./Character";
import laserImage from "/assets/laserBueno.png"
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
    
    private RightSide = this.position[0] + this.laser.naturalWidth/2;
    private LeftSide = this.position[0];
    private TopSide = this.position[1];
    private BottomSide = this.position[1] + this.laser.naturalHeight/2;

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

        this.RightSide = this.position[0] + this.laser.naturalWidth;
        this.LeftSide = this.position[0];
        this.TopSide = this.position[1];
        this.BottomSide = this.position[1] + this.laser.naturalHeight;

        if(this.axis < .5){
            posY = posY + this.speed * Time.deltaTime;
        }else{
            posX = posX + this.speed * Time.deltaTime;
            
        }

        

        this.position = [posX, posY];
        
        

        if(posY < 0 || posY > width || posX < 0 || posX > width){
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

    public checkCollision = (Character: Character) => {
        const mRight = Character.getRightSide() + 20;
        const mLeft = Character.getLeftSide() + 50;
        const mTop = Character.getTopSide() + 20;
        const mBottom = Character.getBottomSide() - 20;

        if (this.LeftSide  < mRight && this.RightSide > mLeft && this.TopSide < mBottom && this.BottomSide > mTop) {
            Character.CharacterDead();
        }
    }

}

export default laser;