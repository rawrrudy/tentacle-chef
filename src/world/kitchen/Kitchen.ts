import { Assets } from "../../core/Assets";
import { Station } from "../../entities/Station";

export class Kitchen {
  readonly tileSize = 64;

  stations: Station[] = [
    new Station(2, 2, "stove"),
    new Station(4, 2, "chopping"),
    new Station(6, 2, "sink"),

    new Station(10, 2, "ingredients"),
    new Station(12, 2, "serving"),
  ];

  render(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    const cols = Math.ceil(width / this.tileSize);
    const rows = Math.ceil(height / this.tileSize);

    ctx.imageSmoothingEnabled = false;

    // Floor
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        ctx.drawImage(
          Assets.tile,
          x * this.tileSize,
          y * this.tileSize,
          this.tileSize,
          this.tileSize
        );
      }
    }

    // Counter
    for (let x = 1; x < 14; x++) {
      ctx.drawImage(
        Assets.kitchenDrawer,
        x * this.tileSize,
        2 * this.tileSize,
        this.tileSize,
        this.tileSize
      );

      ctx.drawImage(
        Assets.kitchenTop,
        x * this.tileSize,
        2 * this.tileSize,
        this.tileSize,
        this.tileSize
      );
    }

    // Stations
    for (const station of this.stations) {
      station.render(ctx);
    }
  }

  isColliding(
    x: number,
    y: number,
    radius: number
  ): boolean {
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