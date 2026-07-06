import type { Order } from "./Order";

export class OrderManager {

  private currentOrder: Order;

  constructor() {

    this.currentOrder = this.createOrder();

  }

  private createOrder(): Order {

    return {

        name: "Tomato Soup",

        reward: 20,

        timeRemaining: 45,

        completed: false

    };

  }

  update(deltaTime: number) {

    if (this.currentOrder.completed) {

      return;

    }

    this.currentOrder.timeRemaining -= deltaTime;

    if (this.currentOrder.timeRemaining < 0) {

      this.currentOrder.timeRemaining = 0;

    }

  }

  completeOrder() {

    this.currentOrder.completed = true;

  }

  nextOrder() {

    this.currentOrder = this.createOrder();

  }

  getCurrentOrder() {

    return this.currentOrder;

  }
  
}