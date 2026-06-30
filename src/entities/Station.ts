export type StationType =
  | "stove"
  | "chopping"
  | "sink"
  | "ingredients"
  |  "serving";

export class Station {
  x: number;
  y: number;
  width: number;
  height: number;
  type: StationType;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    type: StationType
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;
  }

  render(ctx: CanvasRenderingContext2D) {
    switch (this.type) {
      case "stove":
        ctx.fillStyle = "#d94841";
        break;

      case "chopping":
        ctx.fillStyle = "#c08b4c";
        break;

      case "sink":
        ctx.fillStyle = "#4ba3ff";
        break;
      
      case "ingredients":
        ctx.fillStyle = "#67c26f";
        break;

      case "serving":
        ctx.fillStyle = "#f2d35e"
        break;
    }

    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.strokeStyle = "#111";
    ctx.lineWidth = 3;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }

  containsCircle(x: number, y: number, radius: number): boolean {
    const closestX = Math.max(this.x, Math.min(x, this.x + this.width));
    const closestY = Math.max(this.y, Math.min(y, this.y + this.height));

    const dx = x - closestX;
    const dy = y - closestY;

    return dx * dx + dy * dy < radius * radius;
  }

  distanceTo(x: number, y: number): number {
    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;

    return Math.hypot(
      x - centerX,
      y - centerY
    );
  }
}