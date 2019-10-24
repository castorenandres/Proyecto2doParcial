import GameEngine from "./Engine"
const canvas = document.getElementById("game-area") as HTMLCanvasElement;
const context = canvas.getContext("2d");

const engine = new GameEngine();
/*
engine.start();

canvas.addEventListener("mousedown", engine.mouseDownListener);
canvas.addEventListener("mousemove", engine.mouseDownListener);
canvas.addEventListener("mouseout", engine.mouseDownListener);
canvas.addEventListener("mousemoup", engine.mouseDownListener);
*/