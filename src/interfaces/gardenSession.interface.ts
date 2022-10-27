import { IMower } from "./mower.interface";
import {
  CardinalPoint,
  Direction,
  ICoordinates,
  IGeoBoundary,
} from "./geo.interface";
import { IDataInput } from "./fileReader.interface";

export interface IGameSession {
  mowers: IMower[];
}

export interface IMowerDataInput extends IDataInput {
  coordinates: ICoordinates;
  direction: CardinalPoint;
  actions: Direction[];
}

export interface IGardenSessionInput extends IDataInput {
  boundaries: IGeoBoundary;
  mowersData: IMowerDataInput[];
}

export interface IMowerActions {
  mowerIndex: number;
  actions: Direction[];
  canMove: boolean;
  nextActionIndex: number;
}
