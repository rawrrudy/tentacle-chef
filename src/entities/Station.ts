import { Assets } from "../core/Assets";

export type StationType = 
  | "stove"
  | "chopping"
  | "sink" 
  | "ingredients"
  | "serving";

export class Station {
  readonly tileSize = 64;

  tileX: number;
  tileY: number;
  type: StationType;

  constructor(
    tileX: number,
    tileY: number,
    type: StationType
  ) {
    this.tileX = tileX;
    this.tileY = tileY;
    this.type = type;
  }

  get x(): number {
    return this.tileX * this.tileSize;
  }

  get y(): number {
    return this.tileY * this.tileSize;
  }

  get width(): number {
    return this.tileSize;
  }

  get height(): number {
    return this.tileSize;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.imageSmoothingEnabled = false;

    let sprite: HTMLImageElement;

    switch (this.type) {
      case "stove":
        sprite = Assets.stove;
        break;

      case "chopping":
        sprite = Assets.choppingBoard;
        break;
      
      case "sink":
        sprite = Assets.sink;
        break;

      case "ingredients":
        sprite = Assets.ingredients;
        break;

      case "serving":
        sprite = Assets.plates;
        break;
    }

    ctx.drawImage(
      sprite,
      this.x,
      this.y,
      this.width,
      this.height
    );
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

    return Math.hypot(x - centerX, y - centerY);
  }
}