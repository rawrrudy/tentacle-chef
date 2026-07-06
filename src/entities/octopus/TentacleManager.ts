import { Tentacle } from "./Tentacle";
import { Octopus } from "./Octopus";
import { Kitchen } from "../../world/kitchen/Kitchen";

import { TaskPlanner } from "../../systems/planning/TaskPlanner";

export class TentacleManager {

  private tentacles: Tentacle[] = [];

  constructor() {

    this.tentacles.push(
      new Tentacle()
    );

  }

  update(
    octopus: Octopus,
    kitchen: Kitchen
  ) {

    // Ask the planner what should happen next
    const task =
      TaskPlanner.getNextTask(
        octopus.inventory
      );

    // Find the correct station
    const station =
      kitchen.getNearestStationOfType(
        octopus.x,
        octopus.y,
        task.targetStation
      );

    // Give every idle tentacle work
    for (const tentacle of this.tentacles) {

      if (tentacle.state === "idle") {

        tentacle.setTarget(
          station
        );

      }

      tentacle.update(
        octopus
      );

    }

  }

  render(
    ctx: CanvasRenderingContext2D,
    octopus: Octopus
  ) {

    for (const tentacle of this.tentacles) {

      tentacle.render(
        ctx,
        octopus
      );

    }

  }

}