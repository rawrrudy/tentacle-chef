import type { Station } from "../stations/Station";
import type { Octopus } from "./Octopus";
import type { TentacleState } from "./TentacleState";

export class Tentacle {

  state: TentacleState = "idle";

  target: Station | null = null;

  extension = 0;

  workProgress = 0;

  setTarget(station: Station | null) {

    if (this.state !== "idle") return;
    if (!station) return;
    if (station.occupied) return;

    station.occupied = true;

    this.target = station;
    this.state = "extending";
    this.workProgress = 0;
  }

  update(octopus:Octopus) {

    if (!this.target) return;

    switch (this.state) {

      case "idle":
        break;

      case "searching":
        break;

      case "extending":

        this.extension += 0.04;

        if (this.extension >= 1) {

          this.extension = 1;

          this.target.startWork();

          this.state = "working";

        }

        break;

      case "working":

        this.workProgress += 0.01;

        this.target.progress = this.workProgress;

        if (this.workProgress >= 1) {

          this.target.performAction(
            octopus.inventory
          );

          this.target.finishWork();

          this.state = "retracting";

        }

        break;

      case "retracting":

        this.extension -= 0.04;

        if (this.extension <= 0) {

          this.extension = 0;

          this.target.reset();

          this.target = null;

          this.state = "idle";

        }

        break;

    }

  }

  render(
    ctx: CanvasRenderingContext2D,
    octopus: Octopus
  ) {

    if (!this.target) return;

    const startX = octopus.x;
    const startY = octopus.y;

    const endX = this.target.x + this.target.width / 2;
    const endY = this.target.y + this.target.height / 2;

    const drawX = 
      startX + (endX - startX) * this.extension;

    const drawY = 
      startY + (endY - startY) * this.extension;

    ctx.strokeStyle = "#d17cff";
    ctx.lineWidth = 6;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(drawX, drawY);
    ctx.stroke();
  }

}