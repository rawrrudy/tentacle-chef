export class GameManager {

  private timeRemaining = 180;

  private gameOver = false;

  update(deltaTime: number) {

    if (this.gameOver) return;

    this.timeRemaining -= deltaTime;

    if (this.timeRemaining <= 0) {

      this.timeRemaining = 0;

      this.gameOver = true;

    }

  }

  getTimeRemaining() {

    return this.timeRemaining;

  }

  isGameOver() {

    return this.gameOver;

  }

  restart() {

    this.timeRemaining = 180;

    this.gameOver = false;

  }

}