import { ILawn } from "./lawn.interface";
import { EnumDirection, ICoordinates } from "./geo.interface";

export interface IMower {
  coordinates: ICoordinates;
  direction: EnumDirection;
  lawn: ILawn;
}
