import Scene from "./Scene";
import GameContext from "../GameContext";
import Engine from "../Engine";
import MenuScene from "./MenuScene";
import Creditos from "./Creditos"

class VicotryScene extends Scene {
    private currentOption: number = 0;
    private options = ["menu", "creditos"];
    public enter = () => {};
    public  update = (engine:Engine) => {};
    public  render = () => {
        const context = GameContext.context;
        const width = context.canvas.width;
        const height = context.canvas.height;

        context.save();
        context.beginPath();
        // checar que quede bonito
        context.textAlign = "center";
        context.fillStyle = "teal";
        context.font = "25px sans-serif";
        context.strokeStyle = "lime";
        for (let i = 0; i < this.options.length; i++) {
            if (i === this.currentOption) {
                context.strokeText(this.options[i], width / 2, height / 2 + i * 35);
            }
            context.fillText(this.options[i], width / 2, height / 2 + i * 35);
        }

        context.closePath();
        context.restore();
    };

    public handleMouseDown = (event: MouseEvent) => {};
    public  KeyUpHandler = (event: KeyboardEvent) => {};
    public  KeyDownHandler = (event: KeyboardEvent, engine: Engine) => {
        const key = event.key;

        switch(key) {
            case "ArrowUp":
                this.currentOption = (this.currentOption - 1 + this.options.length) % this.options.length;
                break;
            
            case "ArrowDown":
                this.currentOption = (this.currentOption + 1) % this.options.length;
                break;

            case "Enter":
                if (this.currentOption === 0){
                    engine.setCurrentScene(new MenuScene());
                } else if (this.currentOption === 1) { // checar si se pone
                    engine.setCurrentScene(new Creditos());
                }
                break;
        };
    };
};

export default VicotryScene;