import type { Station } from "../stations/Station";
import type { Octopus } from "./Octopus";
import type { TentacleState } from "./TentacleState";

export class Tentacle {
  state: TentacleState = "idle";

  target: Station | null = null;

  extension = 0;

  setTarget(station: Station | null) {
    if (this.state !== "idle") return;

    this.target = station;

    if (station) {
      this.state = "extending";
    }
  }

  update() {
    switch (this.state) {

      case "idle":
        break;

      case "extending":

        this.extension += 0.05;

        if (this.extension >= 1) {
          this.extension = 1;
          this.state = "working";
        }

        break;

      case "working":

        this.state = "retracting";

        break;

      case "retracting":

        this.extension -= 0.05;

        if (this.extension <- 0) {
          this.extension = 0;
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

    const endX =
      this.target.x + this.target.width / 2;

    const endY = 
      this.target.y + this.target.height / 2;

    const drawX =
      startX + (endX - startX) * this.extension;

    const drawY =
      startY + (endY - startY) * this.extension;

    ctx.strokeStyle = "#ff68ff";
    ctx.lineWidth = 6;

    ctx.beginPath();

    ctx.moveTo(startX, startY);

    ctx.lineTo(drawX, drawY);

    ctx.stroke();
  }
}