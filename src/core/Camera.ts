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

    // ⚠️ Update these if your map size changes
    const worldWidth = 15 * 64;
    const worldHeight = 10 * 64;

    const desiredX =
      targetX - canvasWidth / 2;

    const desiredY =
      targetY - canvasHeight / 2;

    // Smooth follow
    this.x +=
      (desiredX - this.x) *
      this.smoothness;

    this.y +=
      (desiredY - this.y) *
      this.smoothness;

    // Camera shake
    if (this.shakeTime > 0) {

      this.shakeTime -= 1 / 60;

      this.x +=
        (Math.random() - 0.5) *
        this.shakeStrength;

      this.y +=
        (Math.random() - 0.5) *
        this.shakeStrength;

    }

    // Clamp camera inside the world
    this.x = Math.max(
      0,
      Math.min(
        this.x,
        worldWidth - canvasWidth
      )
    );

    this.y = Math.max(
      0,
      Math.min(
        this.y,
        worldHeight - canvasHeight
      )
    );

  }

}