import type { IngredientType } from "../ingredients/IngredientType";

export class Inventory {
    
  private item: IngredientType = "none";

  hasItem(): boolean {
    return this.item !== "none";
  }

  getItem(): IngredientType {
    return this.item;
  }

  setItem(item: IngredientType) {
    this.item = item;
  }

  clear() {
    this.item = "none";
  }
}