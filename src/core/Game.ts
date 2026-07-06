import { Time } from "./Time";
import { Input } from "./Input";
import { Kitchen } from "../world/kitchen/Kitchen";
import { Camera } from "./Camera";

import { TentacleManager } from "../entities/octopus/TentacleManager";
import { Octopus } from "../entities/octopus/Octopus";
import { PlayerController } from "../entities/octopus/PlayerController";
import { OrderManager } from "../systems/orders/OrderManager";
import { ScoreManager } from "../systems/score/ScoreManager";
import { GameManager } from "../systems/game/GameManager";
import { roundedRect } from "../utils/Draw";
import { Assets } from "./Assets";
import { FloatingText } from "../effects/FloatingText";

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private animationId = 0;

  private time = new Time();
  private input = new Input();

  private kitchen = new Kitchen();
  private camera = new Camera();

  private octopus = new Octopus();
  private player = new PlayerController(this.octopus);

  private tentacleManager = new TentacleManager();

  private orderManager = new OrderManager();

  private scoreManager = new ScoreManager();

  private gameManager = new GameManager();

  private previousInventory = "none";

  private floatingText: FloatingText[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    const ctx = canvas.getContext("2d");

    if (!ctx) throw new Error("Canvas not supported");

    this.ctx = ctx;
  }

  start() {
    const loop = (timestamp: number) => {
      this.time.update(timestamp);

      this.update();
      this.render();

      this.animationId = requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }

  stop() {
    cancelAnimationFrame(this.animationId);
  }

  update() {

    if (this.gameManager.isGameOver()) {
      return;
    }

    this.player.update(
      this.input,
      this.time,
      this.kitchen
    );

    this.kitchen.update();

    this.orderManager.update(
      this.time.deltaTime
    );

    this.gameManager.update(
      this.time.deltaTime
    );

    this.tentacleManager.update(
      this.octopus,
      this.kitchen
    );

    this.camera.follow(
      this.octopus.x,
      this.octopus.y,
      this.canvas.width,
      this.canvas.height
    );

    const currentInventory =
      this.octopus.inventory.getItem();

    if (
      this.previousInventory === "cookedTomato" &&
      currentInventory === "none"
    ) {

      const reward =
        this.orderManager.completeOrder();

      this.scoreManager.add(reward);

      this.camera.shake();

      this.floatingText.push(
        new FloatingText(
          this.octopus.x,
          this.octopus.y - 40,
          `+$${reward}`
        )
      );

    }

    this.previousInventory = 
      currentInventory;

    for (const text of this.floatingText) {
      text.update(this.time.deltaTime);
    }

    this.floatingText = this.floatingText.filter(
      text => !text.isDead()
    );

  }

  render() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  // Background
  this.ctx.fillStyle = "#181818";
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

  // ======================
  // WORLD
  // ======================

  this.ctx.save();

  this.ctx.translate(
    -this.camera.x,
    -this.camera.y
  );

  this.kitchen.render(
    this.ctx,
    this.canvas.width,
    this.canvas.height
  );

  this.tentacleManager.render(
    this.ctx,
    this.octopus
  );

  this.player.render(this.ctx);

  for (const text of this.floatingText) {
    text.render(this.ctx);
  }

  this.ctx.restore();

  // ======================
  // HUD
  // ======================

  const order = this.orderManager.getCurrentOrder();

  // =====================
  // PANEL SHADOW
  // =====================

  this.ctx.shadowColor = "rgba(0,0,0,0.45)";
  this.ctx.shadowBlur = 18;
  this.ctx.shadowOffsetX = 0;
  this.ctx.shadowOffsetY = 6;

  roundedRect(
    this.ctx,
    15,
    15,
    295,
    320,
    16
  );

  this.ctx.fillStyle = "#2A2521";
  this.ctx.fill();

  // ======================
  // TOP ACCENT STRIP
  // ======================

  roundedRect(
    this.ctx,
    15,
    15,
    295,
    10,
    16
  );

  this.ctx.fillStyle = "#C94F7C";
  this.ctx.fill();

  this.ctx.strokeStyle = "#D8C18E";
  this.ctx.lineWidth = 3;
  this.ctx.stroke();

  // Disable shadow for everything else
  this.ctx.shadowBlur = 0;
  this.ctx.shadowOffsetX = 0;
  this.ctx.shadowOffsetY = 0;

  roundedRect(
      this.ctx,
      18,
      18,
      289,
      314,
      14
  );

  this.ctx.strokeStyle = "rgba(255,255,255,0.08)";
  this.ctx.lineWidth = 1;
  this.ctx.stroke();

  this.ctx.drawImage(
    Assets.octopus,
    28,
    24,
    36,
    36
  );

  // ---------- TITLE ----------

  this.ctx.fillStyle = "#FFF3D4";
  this.ctx.font = "bold 30px Arial";

  this.ctx.fillText(
    "TENTACLE CHEF",
    72,
    50
  );

  // ---------- MONEY ----------

  this.ctx.fillStyle = "#FFD54A";
  this.ctx.font = "bold 24px Arial";

  this.ctx.fillText(
    `$${this.scoreManager.getScore()}`,
    30,
    92
  );

  // ---------- GAME TIMER ----------

  this.ctx.fillStyle = "#62D6FF";
  this.ctx.font = "22px Arial";

  const totalSeconds = Math.max(
    0,
    Math.ceil(this.gameManager.getTimeRemaining())
  );

  const minutes = Math.floor(totalSeconds / 60);

  const seconds = totalSeconds % 60;

  const timerText = 
    `${minutes}:${seconds.toString().padStart(2, "0")}`;

  this.ctx.fillText(
    timerText,
    215,
    92
  );

  // --------- DIVIDER ---------------

  this.ctx.beginPath();

  this.ctx.strokeStyle = "rgba(255,255,255,0.18)";
  this.ctx.lineWidth = 1;

  this.ctx.moveTo(30,110);
  this.ctx.lineTo(280,110);

  this.ctx.stroke();

  // ---------- ORDER ----------

  this.ctx.fillStyle = "#FFFFFF";
  this.ctx.font = "bold 20px Arial";

  this.ctx.fillText(
    "CURRENT ORDER",
    30,
    135
  );

  this.ctx.drawImage(
    Assets.ingredients,
    30,
    145,
    28,
    28
  );

  this.ctx.font = "18px Arial";

  this.ctx.fillText(
    order.name,
    68,
    165
  );

  // ---------- PROGRESS BAR ----------

  const progress = Math.max(
    0,
    order.timeRemaining / 45
  );

  this.ctx.fillStyle = "#262626";

  this.ctx.fillRect(
    30,
    182,
    240,
    18
  );

  this.ctx.fillStyle = "#69F07A";

  this.ctx.fillRect(
    30,
    182,
    240 * progress,
    20
  );

  this.ctx.strokeStyle = "#111";
  this.ctx.strokeRect(
    30,
    182,
    240,
    18
  );

  // ---------- REWARD ----------

  this.ctx.fillStyle = "#FFA93A";
  this.ctx.font = "18px Arial";

  this.ctx.fillText(
    `Reward: $${order.reward}`,
    30,
    220
  );

  // ------- DIVIDER --------

  this.ctx.beginPath();

  this.ctx.strokeStyle = "rgba(255,255,255,0.10)";
  this.ctx.lineWidth = 1;

  this.ctx.moveTo(30,235);
  this.ctx.lineTo(280,235);

  this.ctx.stroke();

  // ---------- INVENTORY ----------

  this.ctx.fillStyle = "#A5FF8A";
  this.ctx.font = "bold 18px Arial";

  this.ctx.fillText(
    "INVENTORY",
    30,
    260
  );

  const item = this.octopus.inventory.getItem();

  let inventorySprite = Assets.plates;

  switch (item) {

    case "tomato":
    case "choppedTomato":
    case "cookedTomato":
      inventorySprite = Assets.ingredients;
      break;

    default:
      inventorySprite = Assets.plates;

  }

  this.ctx.drawImage(
    inventorySprite,
    30,
    275,
    32,
    32
  );

  this.ctx.fillStyle = "#FFFFFF";
  this.ctx.font = "16px Arial";

  this.ctx.fillText(
    item,
    72,
    284
  );

  // ======================
  // GAME OVER
  // ======================

  if (this.gameManager.isGameOver()) {

    this.ctx.fillStyle = "rgba(0,0,0,0.75)";
    this.ctx.fillRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.textAlign = "center";

    this.ctx.font = "bold 56px Arial";

    this.ctx.fillText(
      "GAME OVER",
      this.canvas.width / 2,
      this.canvas.height / 2 - 30
    );

    this.ctx.font = "30px Arial";

    this.ctx.fillText(
      `Final Money: $${this.scoreManager.getScore()}`,
      this.canvas.width / 2,
      this.canvas.height / 2 + 30
    );

    this.ctx.font = "18px Arial";

    this.ctx.fillText(
      "Refresh to play again",
      this.canvas.width / 2,
      this.canvas.height / 2 + 70
    );

    this.ctx.textAlign = "left";
  }
}
}