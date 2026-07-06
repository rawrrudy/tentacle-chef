import type { Order } from "./Order";

export class OrderManager {

    private currentOrder:Order;

    constructor(){

        this.currentOrder={

            name:"Tomato Soup",

            reward:20,

            timeRemaining:45,

            completed:false

        };

    }

    update(deltaTime:number){

        if(this.currentOrder.completed){

            return;

        }

        this.currentOrder.timeRemaining-=deltaTime;

        if(this.currentOrder.timeRemaining<0){

            this.currentOrder.timeRemaining=0;

        }

    }

    getCurrentOrder(){

        return this.currentOrder;

    }

}