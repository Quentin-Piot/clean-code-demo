export interface ICoordinates {
  x: number;
  y: number;
}

export interface IGeoBoundary {
  bottomLeft: ICoordinates;
  northRight: ICoordinates;
}

export type CardinalPoint = "N" | "W" | "E" | "S";

export type Direction = "F" | "L" | "R";
