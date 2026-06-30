import { Input } from "../core/Input";
import { Time } from "../core/Time";
import { Kitchen } from "../world/kitchen/Kitchen";

export class Player {
  x = 640;
  y = 384;

  radius = 24;
  speed = 250;

  private sprite: HTMLImageElement;
  private loaded = false;

  constructor() {
    this.sprite = new Image();

    // Change this path if your image is somewhere else
    this.sprite.src = "/src/assets/icons/octopus.png";

    this.sprite.onload = () => {
      this.loaded = true;
    };
  }

  update(input: Input, time: Time, kitchen: Kitchen) {
    let dx = 0;
    let dy = 0;

    if (input.isKeyDown("w")) dy--;
    if (input.isKeyDown("s")) dy++;
    if (input.isKeyDown("a")) dx--;
    if (input.isKeyDown("d")) dx++;

    if (dx !== 0 || dy !== 0) {
      const length = Math.hypot(dx, dy);
      dx /= length;
      dy /= length;
    }

    const newX = this.x + dx * this.speed * time.deltaTime;
    const newY = this.y + dy * this.speed * time.deltaTime;

    if (!kitchen.isColliding(newX, this.y, this.radius)) {
      this.x = newX;
    }

    if (!kitchen.isColliding(this.x, newY, this.radius)) {
      this.y = newY;
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    if (!this.loaded) {
      ctx.fillStyle = "#ff00ff";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      return;
    }

    const size = 64;

    ctx.drawImage(
      this.sprite,
      this.x - size / 2,
      this.y - size / 2,
      size,
      size
    );
  }
}