import octopus from "../assets/icons/octopus.png";
import stove from "../assets/icons/stove.png";
import sink from "../assets/icons/sink.png";
import choppingBoard from "../assets/icons/chopping board.png";
import ingredients from "../assets/icons/ingredients.png";
import plates from "../assets/icons/plates.png";
import kitchenTop from "../assets/icons/kitchen top.png";
import kitchenDrawer from "../assets/icons/kitchen drawer.png";
import tile from "../assets/icons/tile.png";

function load(src: string): HTMLImageElement {
  const img = new Image();
  img.src = src;
  return img;
}

export const Assets = {
  octopus: load(octopus),
  stove: load(stove),
  sink: load(sink),
  choppingBoard: load(choppingBoard),
  ingredients: load(ingredients),
  plates: load(plates),
  kitchenTop: load(kitchenTop),
  kitchenDrawer: load(kitchenDrawer),
  tile: load(tile),
};