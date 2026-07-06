export class Camera {

  x: number;
  y: number;

  private readonly smoothness = 0.10;

  constructor() {

    this.x = 0;
    this.y = 0;

  }

  follow(
    targetX: number,
    targetY: number,
    canvasWidth: number,
    canvasHeight: number
  ) {

    const desiredX =
      targetX - canvasWidth / 2;

    const desiredY =
      targetY - canvasHeight / 2;

    this.x +=
      (desiredX - this.x) *
      this.smoothness;

    this.y +=
      (desiredY - this.y) *
      this.smoothness;

  }

}