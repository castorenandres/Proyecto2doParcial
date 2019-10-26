import GameContext from "./GameContext";
import Character from "./Character";
import Time from "./Time";
import Moneda from "./Moneda";
import Scene from "./Scenes/Scene";
import Playing from "./Scenes/Playing";
import Laser from "./laser";

class Engine{
    private currentScene: Scene = null;

    //Se utiliza en PLaying
    /*
    private character: Character = null;
    private moneda: Moneda = null;
    */
    public start = () => {
        this.init();
        requestAnimationFrame(this.tick);
    };

    public setCurrentScene = (scene: Scene) => {
        this.currentScene = scene;
        this.currentScene.enter();
      };

    public handleMouseDown = (event: MouseEvent) => {
        this.currentScene.handleMouseDown(event);
    };

    public keydownHandler = (event: KeyboardEvent) => {
        this.currentScene.KeyDownHandler(event, this);
      };
    
    public keyupHandler = (event: KeyboardEvent) => {
        this.currentScene.KeyUpHandler(event);
    };

    public getEngine () {
        return this
    }

    public clearScreen = () => {
        const context = GameContext.context;
        const canvas = context.canvas;
        const width = canvas.width;
        const height = canvas.height;

        context.save();
        context.beginPath();
        context.fillStyle = "white";
        context.fillRect(0,0,width,height);
        context.closePath();
        context.restore();
    };

    public changeScene = (scene: Scene) => {
        this.currentScene = scene;
        this.currentScene.enter();
    };

    public init = () => {
        /*
        this.character = new Character();
        this.moneda = new Moneda();
        */
       //Sequitan por las escenas

       //iniciaria en el menu y se haria el cambio ahi
       this.currentScene = new Playing();
       this.currentScene.enter();

    };

    public tick = () => {
        this.clearScreen();
        Time.update();

        this.currentScene.update();
        this.currentScene.render();

        /*
        this.character.update();
        this.character.render();
        this.moneda.update();
        this.moneda.render();
        *///Se quitan por las escenas
        
        requestAnimationFrame(this.tick);
    };
}

export default Engine;