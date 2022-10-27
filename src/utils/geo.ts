import { EnumDirection } from "../interfaces/geo.interface";

export const generateDirectionFromString = (
  str: "N" | "E" | "S" | "W",
): EnumDirection => {
  switch (str) {
    case "E":
      return EnumDirection.EAST;
    case "N":
      return EnumDirection.NORTH;
    case "S":
      return EnumDirection.SOUTH;
    case "W":
      return EnumDirection.WEST;
    default:
      return EnumDirection.NORTH;
  }
};

export const generateDirectionFromMovement = (
  previousDirection: EnumDirection,
  movement: "F" | "R" | "L",
): EnumDirection => {
  if (previousDirection === EnumDirection.NORTH) {
    if (movement === "F") {
      return EnumDirection.NORTH;
    }
    if (movement === "L") {
      return EnumDirection.WEST;
    }
    return EnumDirection.EAST;
  }
  if (previousDirection === EnumDirection.SOUTH) {
    if (movement === "F") {
      return EnumDirection.SOUTH;
    }
    if (movement === "L") {
      return EnumDirection.EAST;
    }
    return EnumDirection.WEST;
  }
  if (previousDirection === EnumDirection.WEST) {
    if (movement === "F") {
      return EnumDirection.WEST;
    }
    if (movement === "L") {
      return EnumDirection.SOUTH;
    }
    return EnumDirection.NORTH;
  }
  if (previousDirection === EnumDirection.EAST) {
    if (movement === "F") {
      return EnumDirection.EAST;
    }
    if (movement === "L") {
      return EnumDirection.NORTH;
    }
    return EnumDirection.SOUTH;
  }
  return EnumDirection.NORTH;
};
