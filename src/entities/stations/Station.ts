import { Assets } from "../../core/Assets";
import type { StationState } from "./StationState";
import type { Inventory } from "../octopus/Inventory";
import { StationAction } from "../../systems/cooking/StationAction";

export type StationType = 
  | "stove"
  | "chopping"
  | "sink"
  | "ingredients"
  | "serving";

export class Station {

  readonly tileSize = 64;

  tileX:number;
  tileY:number;

  type:StationType;

  state:StationState="idle";

  progress=0;

  occupied=false;

  constructor(
      tileX:number,
      tileY:number,
      type:StationType
  ){
      
      this.tileX=tileX;
      this.tileY=tileY;
      this.type=type;

  }

  get x(){
      return this.tileX*this.tileSize;
  }

  get y(){
      return this.tileY*this.tileSize;
  }

  get width(){
      return this.tileSize;
  }

  get height(){
      return this.tileSize;
  }

  update(){}

  startWork(){

      this.state="working";
      this.progress=0;
      this.occupied=true;
  }

  finishWork(){
      this.state="completed";

      this.progress=1;

  }

  reset(){

      this.state="idle";

      this.progress=0;

      this.occupied=false;

  }

  performAction(inventory: Inventory) {
    StationAction.perform(this, inventory);
  }

  render(ctx:CanvasRenderingContext2D){

      ctx.imageSmoothingEnabled=false;

      let sprite:HTMLImageElement;

      switch(this.type){

        case "stove":
            sprite=Assets.stove;;
            break;
        
        case "chopping":
            sprite=Assets.choppingBoard;
            break;
        
        case "sink":
            sprite=Assets.sink;
            break;

        case "ingredients":
            sprite=Assets.ingredients;
            break;

        default:
            sprite=Assets.plates;

      }

      if (this.occupied) {

          const glow = 
              (Math.sin(Date.now() * 0.008) + 1) / 2;

          ctx.save();

          ctx.shadowColor = "#FFD966";
          ctx.shadowBlur = 12 + glow * 10;

          ctx.strokeStyle = "#FFD966";
          ctx.lineWidth = 3;

          ctx.strokeRect(
              this.x - 2,
              this.y - 2,
              this.width + 4,
              this.height + 4
          );

          ctx.restore();

      }

      ctx.drawImage(
          sprite,
          this.x,
          this.y,
          this.width,
          this.height
      );

      if(this.state!=="idle"){

          ctx.fillStyle="#262626";

          ctx.fillRect(
              this.x,
              this.y - 12,
              this.width,
              8
          );

          ctx.fillStyle = "#69F07A";

          ctx.fillRect(
             this.x,
             this.y - 12,
             this.width * this.progress,
             8
          );

          ctx.strokeStyle = "#111";
          ctx.lineWidth = 1;

          ctx.strokeRect(
              this.x,
              this.y - 12,
              this.width,
              8
          );

      }

  }

  containsCircle(
      x:number,
      y:number,
      radius:number
  ){

      const closestX=Math.max(
          this.x,
          Math.min(
              x,
              this.x+this.width
          )
      );

      const closestY=Math.max(
          this.y,
          Math.min(
              y,
              this.y+this.height
          )
      );

      const dx=x-closestX;
      const dy=y-closestY;

      return dx*dx+dy*dy<radius*radius;

  }

  distanceTo(
      x:number,
      y:number
  ){

      return Math.hypot(
          x-(this.x+32),
          y-(this.y+32)
      );

  }
  
}