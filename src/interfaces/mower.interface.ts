import { ILawn } from "./lawn.interface";
import { CardinalPoint, ICoordinates } from "./geo.interface";

export interface IMower {
  coordinates: ICoordinates;
  cardinalDirection: CardinalPoint;
  lawn: ILawn;
  obstacles?: ICoordinates[];
}
