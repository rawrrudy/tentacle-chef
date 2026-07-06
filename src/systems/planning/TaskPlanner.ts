import type { Inventory } from "../../entities/octopus/Inventory";
import type { Task } from "./Task";

export class TaskPlanner {
  
  static getNextTask(
    inventory: Inventory
  ): Task {

    switch (inventory.getItem()) {
    
      case "none":

        return {

          type: "collectingredients",

          targetStation: "ingredients"

        };

      case "tomato":

        return {

          type: "chop",

          targetStation: "chopping"

        };

      case "choppedTomato":

        return {

          type: "cook",

          targetStation: "stove"

        };

      case "cookedTomato":

        return {

          type: "serve",

          targetStation: "serving"

        };

    }

  }
  
}