import { IMower } from "./mower.interface";
import {
  CardinalPoint,
  Direction,
  ICoordinates,
  IGeoBoundary,
} from "./geo.interface";

export interface IGameSession {
  mowers: IMower[];
}

export interface IMowerDataInput {
  coordinates: ICoordinates;
  direction: CardinalPoint;
  actions: Direction[];
}

export interface IGardenSessionInput {
  boundaries: IGeoBoundary;
  mowersData: IMowerDataInput[];
}

export interface IMowerActions {
  mowerIndex: number;
  actions: Direction[];
  canMove: boolean;
  nextActionIndex: number;
}
