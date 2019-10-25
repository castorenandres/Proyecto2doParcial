import Scene from "./Scene"
import Character from "../Character";
import Engine from "../Engine";
import MenuScene from "./MenuScene";
import Background from "../Background";
import Moneda from "../Moneda"
import Laser from "../laser";
//import laser

class Playing extends Scene {
    private character: Character = null;
    private moneda: Moneda = null;
    private laser: Laser = null;
    private background = new Background(this);

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
        this.laser = new Laser();
    }

    public update = () => {
        this.character.update();
        this.moneda.update();
        this.laser.update();
    }

    public render =() => {
        this.background.render();
       
        this.laser.render();
        this.character.render();
        this.moneda.render();
    }
}

export default Playing;
