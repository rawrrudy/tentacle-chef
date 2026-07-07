export class SteamParticle {

  x: number;
  y: number;

  life = 1;

  speed = 18 + Math.random() * 12;

  drift = (Math.random() - 0.5) * 20;

  size = 3 + Math.random() * 4;

  constructor(
    x: number,
    y: number
  ) {
    this.x = x;
    this.y = y;
  }

  update(delta: number) {

    this.y -= this.speed * delta;

    this.x += this.drift * delta;

    this.life -= delta * 0.5;

  }

  render(ctx: CanvasRenderingContext2D) {

    ctx.save();

    ctx.globalAlpha = this.life;

    ctx.fillStyle = "#FFFFFF";

    ctx.beginPath();

    ctx.arc(
      this.x,
      this.y,
      this.size,
      0,
      Math.PI * 2
    );

    ctx.fill();

    ctx.restore();

  }

  isDead() {

    return this.life <= 0;

  }

}