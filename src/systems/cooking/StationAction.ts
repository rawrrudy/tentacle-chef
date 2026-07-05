import type { Station } from "../../entities/stations/Station";
import type { Inventory } from "../../entities/octopus/Inventory";

export class StationAction {

  static perform(
    station: Station,
    inventory: Inventory
  ) {

    switch (station.type) {

      case "ingredients":

        if (!inventory.hasItem()) {
          inventory.setItem("tomato");
        }

        break;

      case "chopping":

        if (inventory.getItem() === "tomato") {
          inventory.setItem("choppedTomato");
        }

        break;

      case "stove":

        if (inventory.getItem() === "choppedTomato") {
          inventory.setItem("cookedTomato");
        }

        break;

      case "serving":

        if (inventory.getItem() === "cookedTomato") {
          inventory.clear();
        }

        break;

      case "sink":
        // Nothing yet
        break;

    }

  }

}