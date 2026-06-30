import { Station } from "../../entities/Station";

export class Kitchen {
  readonly tileSize = 64;

  stations: Station[] = [
    new Station(2, 2, "stove"),
    new Station(2, 4, "chopping"),
    new Station(2, 6, "sink"),

    new Station(15, 2, "ingredients"),
    new Station(15, 6, "serving"),
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

  isColliding(x: number, y: number, radius: number): boolean {
    for (const station of this.stations) {
      if (station.containsCircle(x, y, radius)) {
        return true;
      }
    }

    return false;
  }

  getNearestStation(
    x: number,
    y: number,
    maxDistance: number
  ): Station | null {

    let nearest: Station | null = null;
    let nearestDistance = maxDistance;

    for (const station of this.stations) {
      const distance = station.distanceTo(x, y);

      if (distance < nearestDistance) {
        nearest = station;
        nearestDistance = distance;
      }
    }

    return nearest;
  }
}