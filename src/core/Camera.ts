export class Camera {

  x: number;
  y: number;

  constructor() {

    this.x = 0;
    this.y = 0;

  }

  follow(
    _targetX: number,
    _targetY: number,
    _canvasWidth: number,
    _canvasHeight: number
  ) {

    this.x = 0;
    this.y = 0;

  }

}