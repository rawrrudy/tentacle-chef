import { Assets } from "../../core/Assets";
import { SteamParticle } from "../../effects/SteamParticle";
import { Station } from "../../entities/stations/Station";
import type { StationType } from "../../entities/stations/Station";
import { KITCHEN_LAYOUT } from "./Layout";
import { Customer } from "../../entities/customer/Customer";

export class Kitchen {
  readonly tileSize = 64;

  stations: Station[] = [];

  customer: Customer[] = [];

  private steam: SteamParticle[] = [];

  private steamSpawnTimer = 0;

  constructor() {
    this.generateStations();

    this.customer.push(
      new Customer(980, 150)
    );
  }

  private generateStations() {
    for (let y = 0; y < KITCHEN_LAYOUT.length; y++) {
      const row = KITCHEN_LAYOUT[y];

      for (let x = 0; x < row.length; x++) {
        const tile = row[x];

        let type: StationType | null = null;

        switch (tile) {
          case "S":
            type = "stove";
            break;

          case "C":
            type = "chopping";
            break;

          case "K":
            type = "sink";
            break;

          case "I":
            type = "ingredients";
            break;

          case "P":
            type = "serving";
            break;
        }

        if (type) {
          this.stations.push(new Station(x, y, type));
        }
      }
    }
  }

  update() {

    for (const station of this.stations) {
      station.update();
    }

    this.steamSpawnTimer += 1 / 60;
    
    if (this.steamSpawnTimer > 0.12) {

      this.steamSpawnTimer = 0;

      for (const station of this.stations) {

        if (station.type !== "stove") continue;

        this.steam.push(

          new SteamParticle(

            station.x + 32,

            station.y + 12

          )

        );

      }

    }

    for (const particle of this.steam) {

      particle.update(1 / 60);

    }

    this.steam = this.steam.filter(

      p => !p.isDead()
      
    );

    for (const customer of this.customer) {
      customer.update(1 / 60);
    }

  }

  render(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    order: string
  ) {
    const cols = Math.ceil(width / this.tileSize);
    const rows = Math.ceil(height / this.tileSize);

    ctx.imageSmoothingEnabled = false;

    // FLOOR
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

    // COUNTERS
    for (let y = 0; y < KITCHEN_LAYOUT.length; y++) {
      const row = KITCHEN_LAYOUT[y];

      for (let x = 0; x < row.length; x++) {
        if (row[x] !== ".") {
          ctx.drawImage(
            Assets.kitchenDrawer,
            x * this.tileSize,
            y * this.tileSize,
            this.tileSize,
            this.tileSize
          );

          ctx.drawImage(
            Assets.kitchenTop,
            x * this.tileSize,
            y * this.tileSize,
            this.tileSize,
            this.tileSize
          );
        }
      }
    }

    // CUSTOMER

    for (const customer of this.customer) {
      customer.render(
        ctx,
        order
      );
    }

    // STATIONS
    for (const station of this.stations) {
      station.render(ctx);
    }

    // STEAM
    for (const particle of this.steam) {
      particle.render(ctx);
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

  getNearestStationOfType(
    x: number,
    y: number,
    type: string
  ): Station | null {

    let nearest: Station | null = null;
    let nearestDistance = Infinity;

    for (const station of this.stations) {
      
      if (station.type !== type) {
        continue;
      }

      const distance = station.distanceTo(x, y);

      if (distance < nearestDistance) {

        nearestDistance = distance;

        nearest = station;

      }

    }

    return nearest;
    
  }
}