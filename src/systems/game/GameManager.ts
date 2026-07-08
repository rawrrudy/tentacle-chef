export class GameManager {

  // ----------------------------
  // LEVEL DATA
  // ----------------------------

  private day = 1;

  private targetMoney = 100;

  private targetCustomers = 5;

  private customersServed = 0;

  // ----------------------------
  // TIMER
  // ----------------------------

  private timeRemaining = 180;

  private gameOver = false;

  private levelComplete = false;

  update(deltaTime: number) {

    if (this.gameOver) return;

    if (this.levelComplete) return;

    this.timeRemaining -= deltaTime;

    if (this.timeRemaining <= 0) {

      this.timeRemaining = 0;

      this.gameOver = true;

    }

  }

  // ----------------------------
  // CUSTOMER PROGRESS
  // ----------------------------

  addCustomerServed() {

    this.customersServed++;

  }

  getCustomersServed() {

    return this.customersServed;

  }

  getTargetCustomers() {

    return this.targetCustomers;

  }

  // ----------------------------
  // MONEY GOAL
  // ----------------------------

  getTargetMoney() {

    return this.targetMoney;

  }

  // ----------------------------
  // LEVEL
  // ----------------------------

  getDay() {

    return this.day;

  }

  checkLevelComplete(
    currentMoney: number
  ) {

    if (

      currentMoney >= this.targetMoney &&

      this.customersServed >= this.targetCustomers

    ) {

      this.levelComplete = true;

      this.gameOver = true;

    }

  }

  isLevelComplete() {

    return this.levelComplete;

  }

  // ----------------------------
  // TIMER
  // ----------------------------

  getTimeRemaining() {

    return this.timeRemaining;

  }

  isGameOver() {

    return this.gameOver;

  }

  nextDay() {

    this.day++;

    this.targetMoney += 60;

    this.targetCustomers += 3;

    this.timeRemaining = 180;

    this.customersServed = 0;

    this.levelComplete = false;

    this.gameOver = false;

  }

  restart() {

    this.day = 1;

    this.targetMoney = 100;

    this.targetCustomers = 5;

    this.timeRemaining = 180;

    this.customersServed = 0;

    this.levelComplete = false;

    this.gameOver = false;

  }

}