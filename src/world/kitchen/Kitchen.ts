import { Station } from "../../entities/Station";

export class Kitchen {
  readonly tileSize = 64;

  stations: Station[] = [
    new Station(128, 128, 64, 64, "stove"),
    new Station(128, 256, 64, 64, "chopping"),
    new Station(128, 384, 64, 64, "sink"),

    new Station(960, 128, 64, 64, "ingredients"),
    new Station(960, 384, 64, 64, "serving"),
  ];

  render(ctx: CanvasRenderingContext2D, width: number, height: number) {
    const cols = Math.ceil(width / this.tileSize);
    const rows = Math.ceil(height / this.tileSize);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        ctx.fillStyle = "#2c2c2c";
        ctx.fillRect(
          x * this.tileSize,
          y * this.tileSize,
          this.tileSize,
          this.tileSize
        );

        ctx.strokeStyle = "#3b3b3b";
        ctx.strokeRect(
          x * this.tileSize,
          y * this.tileSize,
          this.tileSize,
          this.tileSize
        );
      }
    }

    // Draw stations
    for (const station of this.stations) {
      station.render(ctx);
    }
  }
}