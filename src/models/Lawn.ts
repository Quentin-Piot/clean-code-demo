import { IGeoBoundary } from "../interfaces/geo.interface";

export default class Lawn {
  boundaries: IGeoBoundary;

  constructor(boundaries: IGeoBoundary) {
    this.boundaries = boundaries;
  }
}
