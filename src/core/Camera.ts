export class Camera {

  x: number;
  y: number;

  private readonly smoothness = 0.10;

  private shakeTime = 0;
  private shakeStrength = 0;

  constructor() {

    this.x = 0;
    this.y = 0;

  }

  shake(
    strength = 5,
    duration = 0.15
  ) {

    this.shakeStrength = strength;
    this.shakeTime = duration;

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

    if (this.shakeTime > 0) {

      this.shakeTime -= 1 / 60;

      this.x +=
        (Math.random() - 0.5) *
        this.shakeStrength;

      this.y +=
        (Math.random() - 0.5) *
        this.shakeStrength;

    }

  }

}