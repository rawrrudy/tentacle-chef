export const Tile = {
  Floor: ".",
  Stove: "S",
  Chop: "C",
  Sink: "K",
  Ingredients: "I",
  Plates: "P",
} as const;

export type TileType = (typeof Tile)[keyof typeof Tile];