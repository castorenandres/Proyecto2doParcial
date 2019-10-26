import Scene from "./Scene"
import Character from "../Character";
import Engine from "../Engine";
import MenuScene from "./MenuScene";
import Background from "../Background";
import Soundtrack from "/assets/soundtrack.mp3";
import Moneda from "../Moneda"
import Laser from "../laser";
//import laser

class Playing extends Scene {
    private lasers: Laser[] = [];
    private character: Character = null;
    private moneda: Moneda = null;
    private laser: Laser = null;
    private background = new Background(this);
    private soundtrack = new Audio(Soundtrack);
    

    public handleMouseDown = (event: MouseEvent) => {
        //Se ponen los handles del mouse
        this.character.mouseMovementHandler(event); 
    };

    public getCharacter = () => {
        return this.character;
    }

    public getMoneda =() => {
        return this.getMoneda;
    }

    enter = () => {
        this.character = new Character();
        this.moneda = new Moneda();
        this.soundtrack.volume = 0.5;
        this.soundtrack.play();
        this.soundtrack.loop = true;
        //this.laser = new Laser();
        for(let x = 0; x < 4; x++){
            this.lasers.push(new Laser())
        }
    }

    public update = () => {
        this.character.update();
        this.moneda.update();

        this.character.checkCollisionCoin(this.moneda);
        //this.laser.update();
        for(let x = 0; x < 4; x++){
            this.lasers[x].update();
            this.lasers[x].checkCollision(this.character);
        }

        this.character.checkCollisionCoin(this.moneda);
    }

    public render =() => {
        this.background.render();
       
        //this.laser.render();
        this.character.render();
        this.moneda.render();
        for(let x = 0; x < 4; x++){
            this.lasers[x].render();
        }
    }
}

export default Playing;
