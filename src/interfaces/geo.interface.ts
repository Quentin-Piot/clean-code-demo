export interface ICoordinates {
  x: number;
  y: number;
}

export interface IGeoBoundary {
  bottomLeft: ICoordinates;
  northRight: ICoordinates;
}

export enum EnumDirection {
  "NORTH" = "NORTH",
  "WEST" = "WEST",
  "EAST" = "EAST",
  "SOUTH" = "SOUTH",
}
