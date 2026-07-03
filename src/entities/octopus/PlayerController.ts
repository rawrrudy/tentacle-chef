import { Input } from "../../core/Input";
import { Time } from "../../core/Time";
import { Kitchen } from "../../world/kitchen/Kitchen";
import { Octopus } from "./Octopus";

export class PlayerController {
  private octopus: Octopus;

  constructor(octopus: Octopus) {
    this.octopus = octopus;
  }

  update(
    input: Input,
    time: Time,
    kitchen: Kitchen
  ) {
    this.octopus.update(input, time, kitchen);
  }

  render(ctx: CanvasRenderingContext2D) {
    this.octopus.render(ctx);
  }
}