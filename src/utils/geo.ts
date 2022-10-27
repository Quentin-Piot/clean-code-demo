import {
  CardinalPoint,
  Direction,
  ICoordinates,
} from "../interfaces/geo.interface";

export const generateDirectionFromMovement = (
  previousDirection: CardinalPoint,
  movement: Direction,
): CardinalPoint => {
  if (previousDirection === "N") {
    if (movement === "F") {
      return "N";
    }
    if (movement === "L") {
      return "W";
    }
    return "E";
  }
  if (previousDirection === "S") {
    if (movement === "F") {
      return "S";
    }
    if (movement === "L") {
      return "E";
    }
    return "W";
  }
  if (previousDirection === "W") {
    if (movement === "F") {
      return "W";
    }
    if (movement === "L") {
      return "S";
    }
    return "N";
  }
  if (previousDirection === "E") {
    if (movement === "F") {
      return "E";
    }
    if (movement === "L") {
      return "N";
    }
    return "S";
  }
  return "N";
};

export const positionToString = (position: ICoordinates) => {
  return `x:${position.x} y:${position.y}`;
};
