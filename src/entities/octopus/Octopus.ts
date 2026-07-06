import { Assets } from "../../core/Assets";
import { Kitchen } from "../../world/kitchen/Kitchen";
import { Input } from "../../core/Input";
import { Time } from "../../core/Time";
import { Inventory } from "./Inventory";

export class Octopus {
  x = 648;
  y = 384;

  radius = 24;
  speed = 250;

  private bobTime = 0;

  inventory = new Inventory();

  update(
    input: Input,
    time: Time,
    kitchen: Kitchen
  ) {
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
      this.y = newY
    }

    this.bobTime += time.deltaTime * 4;

  }

  render(ctx: CanvasRenderingContext2D) {
    const size = 64;

    ctx.imageSmoothingEnabled = false;

    ctx.save();

    ctx.fillStyle = "rgba(0,0,0,0.45)";

    ctx.beginPath();

    ctx.ellipse(
      this.x,
      this.y + 22,
      24,
      10,
      0,
      0,
      Math.PI * 2
    );

    ctx.fill();

    ctx.restore();

    const bobOffset =
      Math.sin(this.bobTime) * 2;

    ctx.drawImage(
      Assets.octopus,
      this.x - size / 2,
      this.y - size / 2 + bobOffset,
      size,
      size
    );
  }
}