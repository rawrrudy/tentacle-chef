import { Player } from "./Player";
import { Station } from "./Station";

export class Tentacle {
  render(
    ctx: CanvasRenderingContext2D,
    player: Player,
    station: Station | null
  ) {
    if (!station) return;

    const startX = player.x;
    const startY = player.y;

    const endX = station.x + station.width / 2;
    const endY = station.y + station.height / 2;

    ctx.strokeStyle = "#b65cff";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }
}