import GameContext from "./GameContext";
import Character from "./Character";
import Time from "./Time";
import Moneda from "./Moneda";

class Engine{
    private character: Character = null;
    private moneda: Moneda = null;

    public start = () => {
        this.init();
        requestAnimationFrame(this.tick);
    };

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

    public init = () => {
        this.character = new Character();
        this.moneda = new Moneda();
    };

    public tick = () => {
        this.clearScreen();
        Time.update();

        this.character.update();
        this.character.render();
        this.moneda.update();
        this.moneda.reder();
        
        requestAnimationFrame(this.tick);
    };
}

export default Engine;