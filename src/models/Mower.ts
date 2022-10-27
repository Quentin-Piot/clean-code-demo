import { IMower } from "../interfaces/mower.interface";
import { CardinalPoint, ICoordinates } from "../interfaces/geo.interface";
import { ILawn } from "../interfaces/lawn.interface";

export default class Mower implements IMower {
  coordinates: ICoordinates;

  direction: CardinalPoint;

  lawn: ILawn;

  obstacles: ICoordinates[];

  constructor(
    lawn: ILawn,
    coordinates: ICoordinates,
    direction: CardinalPoint,
    obstacles: ICoordinates[] = [],
  ) {
    this.lawn = lawn;
    this.coordinates = coordinates;
    this.direction = direction;
    this.obstacles = obstacles;
  }

  /**
   * Move the mower by looking at its direction, checking the boundaries and obstacles
   * @returns {boolean} Has moved successfully
   */
  move(): boolean {
    const { boundaries } = this.lawn;
    const newPosition = this.coordinates;
    switch (this.direction) {
      case "N": {
        if (boundaries.northRight.y > this.coordinates.y) {
          newPosition.y += 1;
        }
        break;
      }
      case "S": {
        if (this.coordinates.y > 0) {
          newPosition.y -= 1;
        }
        break;
      }
      case "E": {
        if (boundaries.northRight.x > this.coordinates.x) {
          newPosition.x += 1;
        }
        break;
      }
      case "W": {
        if (this.coordinates.x > 0) {
          newPosition.x -= 1;
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
      ) === -1
    );
  }
}
