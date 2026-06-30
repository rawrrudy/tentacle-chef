import { Input } from "../core/Input";
import { Time } from "../core/Time";

export class Player {
  x = 640;
  y = 384;

  radius = 25;
  speed = 250;

  update(input: Input, time: Time, kitchen: any) {
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
    ctx.fillStyle = "#8a2be2";

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}