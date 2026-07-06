export class ScoreManager {

  private score = 0;

  add(amount: number) {
    this.score += amount;
  }

  getScore() {
    return this.score;
  }

  reset() {
    this.score = 0;
  }

}