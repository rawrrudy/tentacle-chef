export class Time {
  deltaTime = 0;
  lastTime = 0;

  update(currentTime: number) {
    this.deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;
  }
}