import { Time } from "./Time";

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private animationId = 0;
  private time = new Time();

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
    // Game logic will go here
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "#1e1e1e";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "white";
    this.ctx.font = "24px Arial";

    this.ctx.fillText(
      `FPS: ${Math.round(1 / Math.max(this.time.deltaTime, 0.0001))}`,
      20,
      40
    );

    this.ctx.fillText("Tentacle Chef!", 20, 80);
  }
}