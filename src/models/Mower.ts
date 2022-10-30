import { IMower } from "../interfaces/mower.interface";
import {
  CardinalPoint,
  Direction,
  ICoordinates,
} from "../interfaces/geo.interface";
import { ILawn } from "../interfaces/lawn.interface";
import { generateDirectionFromMovement } from "../utils/geo";

export default class Mower implements IMower {
  coordinates: ICoordinates;

  cardinalDirection: CardinalPoint;

  lawn: ILawn;

  obstacles: ICoordinates[];

  constructor(
    lawn: ILawn,
    coordinates: ICoordinates,
    cardinalDirection: CardinalPoint,
    obstacles: ICoordinates[] = [],
  ) {
    this.lawn = lawn;
    this.coordinates = coordinates;
    this.cardinalDirection = cardinalDirection;
    this.obstacles = obstacles;
  }

  /**
   * Move the mower by looking at its direction, checking the boundaries and obstacles
   * @returns {boolean} Has moved successfully
   */
  move(direction: Direction): boolean {
    const { boundaries } = this.lawn;
    const newPosition = this.coordinates;

    this.cardinalDirection = generateDirectionFromMovement(
      this.cardinalDirection,
      direction,
    );

    // If rotation, don't try to move
    if (direction !== "F") return false;

    switch (this.cardinalDirection) {
      case "N": {
        if (boundaries.northRight.y > this.coordinates.y) {
          newPosition.y += 1;
          return true;
        }
        break;
      }
      case "S": {
        if (this.coordinates.y > 0) {
          newPosition.y -= 1;
          return true;
        }
        break;
      }
      case "E": {
        if (boundaries.northRight.x > this.coordinates.x) {
          newPosition.x += 1;
          return true;
        }
        break;
      }
      case "W": {
        if (this.coordinates.x > 0) {
          newPosition.x -= 1;
          return true;
        }
        break;
      }
      default: {
        break;
      }
    }

    if (!this.checkObstacle(newPosition)) {
      this.coordinates = newPosition;
    }
    return false;
  }

  /**
   * Check if there is an obstacle at this positon
   * @param coordinates the position to check
   * @returns {boolean} The presence of an obstacle
   */
  checkObstacle(coordinates): boolean {
    return (
      this.obstacles.findIndex(
        (obstacle) =>
          obstacle.x === coordinates.x && obstacle.y === coordinates.y,
      ) !== -1
    );
  }
}
