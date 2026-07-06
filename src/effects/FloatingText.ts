export class FloatingText {

  x: number;
  y: number;

  text: string;

  life = 1;

  constructor(
    x: number,
    y: number,
    text: string
  ) {

    this.x = x;
    this.y = y;

    this.text = text;

  }

  update(delta: number) {

    this.y -= 35 * delta;

    this.life -= delta;

  }

  render(ctx: CanvasRenderingContext2D) {

    ctx.save();

    ctx.globalAlpha = Math.max(0, this.life);

    ctx.fillStyle = "#FFD54A";

    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;

    ctx.font = "bold 22px Arial";

    ctx.strokeText(
      this.text,
      this.x,
      this.y
    );

    ctx.fillText(
      this.text,
      this.x,
      this.y
    );

    ctx.restore();

  }

  isDead() {

    return this.life <= 0;

  }

}