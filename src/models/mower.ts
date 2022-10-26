import { IMower } from "../interfaces/mower.interface";
import { EnumDirection, ICoordinates } from "../interfaces/geo.interface";
import { ILawn } from "../interfaces/lawn.interface";

export default class Mower implements IMower {
  coordinates: ICoordinates;

  direction: EnumDirection;

  lawn: ILawn;

  constructor(
    lawn: ILawn,
    coordinates: ICoordinates,
    direction: EnumDirection,
  ) {
    this.lawn = lawn;
    this.coordinates = coordinates;
    this.direction = direction;
  }

  /**
   * Move the mower
   * @returns {boolean} Has moved successfully
   */
  move(): boolean {
    const { boundaries } = this.lawn;
    switch (this.direction) {
      case EnumDirection.NORTH: {
        if (boundaries.northRight.y > this.coordinates.y) {
          this.coordinates.y += 1;
          return true;
        }
        break;
      }
      case EnumDirection.SOUTH: {
        if (this.coordinates.y > 0) {
          this.coordinates.y -= 1;
          return true;
        }
        break;
      }
      case EnumDirection.EAST: {
        if (boundaries.northRight.x > this.coordinates.x) {
          this.coordinates.x += 1;
          return true;
        }
        break;
      }
      case EnumDirection.WEST: {
        if (this.coordinates.x > 0) {
          this.coordinates.x -= 1;
          return true;
        }
        break;
      }
      default: {
        break;
      }
    }
    return false;
  }
}
