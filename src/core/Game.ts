import { Time } from "./Time";
import { Input } from "./Input";
import { Player } from "../entities/Player";
import { Kitchen } from "../world/kitchen/Kitchen";
import { Camera } from "./Camera";
import { Tentacle } from "../entities/Tentacle";

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private animationId = 0;
  private time = new Time();

  private input = new Input();
  private player = new Player();

  private kitchen = new Kitchen();

  private camera = new  Camera();

  private tentacle = new Tentacle();

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
    this.player.update(
      this.input,
      this.time,
      this.kitchen
    );

    this.camera.follow(
      this.player.x,
      this.player.y,
      this.canvas.width,
      this.canvas.height
    );
  }

  render() {
    // Clear prev frame
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Background
    this.ctx.fillStyle = "#181818";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Kitchen grid
    this.ctx.save();

    this.ctx.translate(
        -this.camera.x,
        -this.camera.y
    );

    this.kitchen.render(
      this.ctx,
      this.canvas.width,
      this.canvas.height
    );

    this.tentacle.render(this.ctx, this.player, this.kitchen.getNearestStation(
      this.player.x,
      this.player.y,
      120
    ));

    this.player.render(this.ctx);

    this.ctx.restore();

    const nearby = this.kitchen.getNearestStation(
      this.player.x,
      this.player.y,
      120
    );

    if (nearby) {
      this.ctx.fillStyle = "white";
      this.ctx.font = "20px Arial";

      this.ctx.fillText(
        `Nearby: ${nearby.type}`,
        20,
        120
      );
    }

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
  }
}