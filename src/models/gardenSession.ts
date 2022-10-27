import Mower from "./mower";

import {
  IGardenSession,
  IGardenSessionInput,
  IMowerActions,
} from "../interfaces/gardenSession.interface";
import { ILawn } from "../interfaces/lawn.interface";
import { EnumDirection, ICoordinates } from "../interfaces/geo.interface";
import Lawn from "./lawn";
import { generateDirectionFromMovement } from "../utils/geo";

export default class GardenSession implements IGardenSession {
  mowers: Mower[];

  lawn: Lawn;

  actions: IMowerActions[];

  nextMowerToMove: number;

  constructor() {
    this.mowers = new Array<Mower>();
    this.lawn = new Lawn({
      bottomLeft: { x: 0, y: 0 },
      northRight: { x: 0, y: 0 },
    });
    this.actions = new Array<IMowerActions>();
    this.nextMowerToMove = -1;
  }

  generateData(input: IGardenSessionInput) {
    this.lawn.boundaries = input.boundaries;

    if (input.mowersData.length > 0) {
      this.nextMowerToMove = 0;
    }

    for (let i = 0; i < input.mowersData.length; i += 1) {
      const data = input.mowersData[i];
      const mower = new Mower(this.lawn, data.coordinates, data.direction);
      const index = this.mowers.push(mower);
      this.actions.push({
        mowerIndex: index - 1,
        actions: data.actions,
        nextActionIndex: 0,
        canMove: data.actions.length > 0,
      });
    }
  }

  /**
   * Play the next session move
   * @returns {boolean} The move has been done successfully
   */
  playNextMove(): boolean {
    const currentAction = this.actions[this.nextMowerToMove];

    if (currentAction.nextActionIndex >= currentAction.actions.length) {
      this.actions[this.nextMowerToMove].canMove = false;
      this.nextMowerToMove += 1;
    }
    if (!currentAction.canMove) return false;

    this.mowers[currentAction.mowerIndex].direction =
      generateDirectionFromMovement(
        this.mowers[currentAction.mowerIndex].direction,
        currentAction.actions[currentAction.nextActionIndex],
      );

    let success = false;
    if (currentAction.actions[currentAction.nextActionIndex] === "F") {
      success = this.moveMower(this.nextMowerToMove);
    }
    this.actions[this.nextMowerToMove].nextActionIndex =
      currentAction.nextActionIndex + 1;

    return success;
  }

  checkIfOver(): boolean {
    return this.actions.findIndex((action) => action.canMove) === -1;
  }

  playGame() {
    while (!this.checkIfOver()) {
      this.playNextMove();
    }

    this.endGame();
  }

  endGame() {
    console.log("**** Final positions ****");
    this.mowers.forEach((mower, index) => {
      console.log(
        `Mower ${index + 1}: ${JSON.stringify(mower.coordinates, null, 2)}`,
      );
    });
    console.log("**** Game Over ****");
  }

  /**
   *
   * @param lawn The lawn linked to the mower
   * @param startingCoordinates The starting coordinates
   * @param startingDirection The starting direction
   * @returns {number} The index of the mower
   */
  addMower(
    lawn: ILawn,
    startingCoordinates: ICoordinates,
    startingDirection: EnumDirection,
  ): number {
    const mower = new Mower(lawn, startingCoordinates, startingDirection);
    this.mowers.push(mower);
    return this.mowers.length - 1;
  }

  /**
   * Move a given mower of the session in the lawn
   * @param index The index of the mower
   * @returns {boolean} The mower has successfully moved
   */
  moveMower(index: number): boolean {
    if (!this.mowers[index]) throw new Error("No mower at this index");
    return this.mowers[index]?.move();
  }
}
