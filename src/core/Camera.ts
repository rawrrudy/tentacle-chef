export class Camera {
  x: number;
  y: number;

  constructor() {
    this.x = 0;
    this.y = 0;
  }

  follow(targetX: number, targetY: number, canvasWidth: number, canvasHeight: number) {
    this.x = targetX - canvasWidth / 2;
    this.y = targetY - canvasHeight / 2;
  }
}