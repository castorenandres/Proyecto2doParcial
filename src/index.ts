import GameEngine from "./Engine";
import GameContext from "./GameContext";

const canvas = document.getElementById("game-area") as HTMLCanvasElement;
const context = canvas.getContext("2d");

GameContext.context = context;

const engine = new GameEngine();
engine.start();

/*
canvas.addEventListener("mousedown", engine.mouseDownListener);
canvas.addEventListener("mousemove", engine.mouseDownListener);
canvas.addEventListener("mouseout", engine.mouseDownListener);
canvas.addEventListener("mouseup", engine.mouseDownListener);
*/