import { IMower } from "./mower.interface";
import { EnumDirection, ICoordinates, IGeoBoundary } from "./geo.interface";

export interface IGardenSession {
  mowers: IMower[];
}

export interface IMowerDataInput {
  coordinates: ICoordinates;
  direction: EnumDirection;
  actions: ("F" | "L" | "R")[];
}

export interface IGardenSessionInput {
  boundaries: IGeoBoundary;
  mowersData: IMowerDataInput[];
}

export interface IMowerActions {
  mowerIndex: number;
  actions: ("F" | "L" | "R")[];
  canMove: boolean;
  nextActionIndex: number;
}
