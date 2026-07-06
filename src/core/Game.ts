import { Time } from "./Time";
import { Input } from "./Input";
import { Kitchen } from "../world/kitchen/Kitchen";
import { Camera } from "./Camera";

import { TentacleManager } from "../entities/octopus/TentacleManager";
import { Octopus } from "../entities/octopus/Octopus";
import { PlayerController } from "../entities/octopus/PlayerController";
import { OrderManager } from "../systems/orders/OrderManager";

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private animationId = 0;

  private time = new Time();
  private input = new Input();

  private kitchen = new Kitchen();
  private camera = new Camera();

  private octopus = new Octopus();
  private player = new PlayerController(this.octopus);

  private tentacleManager = new TentacleManager();

  private orderManager = new OrderManager();

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

    this.kitchen.update();

    this.orderManager.update(
      this.time.deltaTime
    );

    this.tentacleManager.update(
      this.octopus,
      this.kitchen
    );

    this.camera.follow(
      this.octopus.x,
      this.octopus.y,
      this.canvas.width,
      this.canvas.height
    );
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "#181818";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

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

    const nearby = this.kitchen.getNearestStation(
      this.octopus.x,
      this.octopus.y,
      120
    );

    this.tentacleManager.render(
      this.ctx,
      this.octopus
    );

    this.player.render(this.ctx);

    this.ctx.restore();

    if (nearby) {
      this.ctx.fillStyle = "white";
      this.ctx.font = "20px Arial";

      this.ctx.fillText(
        `Nearby: ${nearby.type}`,
        20,
        120
      );
    }

    this.ctx.fillStyle = "white";
    this.ctx.font = "24px Arial";

    this.ctx.fillText(
      `FPS: ${Math.round(1 / Math.max(this.time.deltaTime, 0.0001))}`,
      20,
      40
    );

    this.ctx.fillText(
      "Tentacle Chef!",
      20,
      80
    );

    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Arial";

    this.ctx.fillText(
      `Inventory: ${this.octopus.inventory.getItem()}`,
      20,
      160
    );

    const order = this.orderManager.getCurrentOrder();

    this.ctx.fillText(
      `Order: ${order.name}`,
      20,
      200
    );

    this.ctx.fillText(
      `Reward: $${order.reward}`,
      20,
      230
    );

    this.ctx.fillText(
      `Time: ${order.timeRemaining.toFixed(1)}s`,
      20,
      260
    );
  }
}