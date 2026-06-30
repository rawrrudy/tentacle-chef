import { Time } from "./Time";
import { Input } from "./Input";
import { Player } from "../entities/Player";
import { Kitchen } from "../world/kitchen/Kitchen";

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private animationId = 0;
  private time = new Time();

  private input = new Input();
  private player = new Player();

  private kitchen = new Kitchen();

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    const ctx = canvas.getContext("2d");

    if (!ctx) throw new Error("Canvas not supported");

    this.ctx = ctx;
  }

  start() {
    const loop = (timestamp: number) => {
        this.time.update(timestamp);

        this.update();
        this.render();

        this.animationId = requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }

  stop() {
    cancelAnimationFrame(this.animationId);
  }

  update() {
    this.player.update(this.input, this.time);
  }

  render() {
    // Clear prev frame
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Background
    this.ctx.fillStyle = "#181818";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Kitchen grid
    this.kitchen.render(
        this.ctx,
        this.canvas.width,
        this.canvas.height
    );

    // FPS
    this.ctx.fillStyle = "white";
    this.ctx.font = "24px Arial";
    this.ctx.fillText(
      `FPS: ${Math.round(1 / Math.max(this.time.deltaTime, 0.0001))}`,
      20,
      40
    );

    // Title
    this.ctx.fillText("Tentacle Chef!", 20, 80);

    // Player
    this.player.render(this.ctx);
  }
}