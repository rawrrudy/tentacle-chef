import { Assets } from "../../core/Assets";

export class Customer {

  x: number;
  y: number;

  private bob = Math.random() * Math.PI * 2;

  constructor(
    x: number,
    y: number
  ) {
    this.x = x;
    this.y = y;
  }

  update(delta: number) {
    this.bob += delta * 2;
  }

  render(
      ctx: CanvasRenderingContext2D,
      order: string
  ) {

    const offset =
      Math.sin(this.bob) * 2;

    ctx.imageSmoothingEnabled = false;

    // Shadow
    ctx.fillStyle = "rgba(0,0,0,0.25)";

    ctx.beginPath();

    ctx.ellipse(
      this.x,
      this.y + 24,
      18,
      6,
      0,
      0,
      Math.PI * 2
    );

    ctx.fill();

    // Customer
    ctx.drawImage(
      Assets.male,
      this.x - 32,
      this.y - 32 + offset,
      64,
      64
    );

    ctx.fillStyle = "#FFFFFF";

    ctx.beginPath();

    ctx.roundRect(
        this.x - 22,
        this.y - 62 + offset,
        44,
        28,
        8
    );

    ctx.fill();

    ctx.strokeStyle = "#111";
    ctx.lineWidth = 2;

    ctx.stroke();

    ctx.fillStyle = "#111";
    ctx.font = "12px Pixelify Sans";
    ctx.textAlign = "center";

    ctx.fillText(
        order,
        this.x,
        this.y - 44 + offset
    );

    ctx.textAlign = "left";

  }

}