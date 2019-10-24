import GameEngine from "./Engine";
import GameContext from "./GameContext";

const canvas = document.getElementById("game-area") as HTMLCanvasElement;
const context = canvas.getContext("2d");

GameContext.context = context;

const engine = new GameEngine();
engine.start();


canvas.addEventListener("mousedown", engine.mouseEventListener);
canvas.addEventListener("mouseup", engine.mouseEventListener);
canvas.addEventListener("mousemove", engine.mouseEventListener);
canvas.addEventListener("mouseenter", engine.mouseEventListener);
canvas.addEventListener("mouseout", engine.mouseEventListener);
