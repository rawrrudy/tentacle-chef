import { Tentacle } from "./Tentacle";
import { Octopus } from "./Octopus";
import { Kitchen } from "../../world/kitchen/Kitchen";

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

    const station =
      kitchen.getNearestStation(
        octopus.x,
        octopus.y,
        120
      );

    for (const tentacle of this.tentacles) {

      if (
        tentacle.state === "idle"
      ) {

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