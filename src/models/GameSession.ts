import Mower from "./Mower";

import {
  IGameSession,
  IGardenSessionInput,
  IMowerActions,
} from "../interfaces/gardenSession.interface";
import { ILawn } from "../interfaces/lawn.interface";
import { CardinalPoint, ICoordinates } from "../interfaces/geo.interface";
import Lawn from "./Lawn";
import { positionToString } from "../utils/geo";

export default class GameSession implements IGameSession {
  mowers: Mower[];

  lawn: Lawn;

  actions: IMowerActions[];

  nextMowerToMove: number;

  over: boolean;

  constructor() {
    this.mowers = new Array<Mower>();
    this.lawn = new Lawn({
      bottomLeft: { x: 0, y: 0 },
      northRight: { x: 0, y: 0 },
    });
    this.actions = new Array<IMowerActions>();
    this.nextMowerToMove = -1;
    this.over = false;
  }

  generateData(input: IGardenSessionInput) {
    this.lawn.boundaries = input.boundaries;

    if (input.mowersData.length > 0) {
      this.nextMowerToMove = 0;
    }

    for (let i = 0; i < input.mowersData.length; i += 1) {
      const data = input.mowersData[i];
      const index = this.addMower(this.lawn, data.coordinates, data.direction);
      this.actions.push({
        mowerIndex: index,
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

      if (this.nextMowerToMove < this.mowers.length - 1) {
        console.info(
          `Mower ${this.nextMowerToMove} has finished. Next mower starting now.`,
        );
        this.nextMowerToMove += 1;

        // If we want to add mowers as obstacles, it's not written in the instructions, so for now it just only commented
        // this.mowers[this.nextMowerToMove].obstacles.push(
        //   this.mowers[this.nextMowerToMove - 1].coordinates,
        // );
      }
    }
    if (!currentAction.canMove) return false;

    if (currentAction.nextActionIndex === 0) {
      console.info(
        `Mower ${
          this.nextMowerToMove
        } is starting at position ${positionToString(
          this.mowers[this.nextMowerToMove].coordinates,
        )}`,
      );
    }
    const hasMoved = this.mowers[this.nextMowerToMove].move(
      currentAction.actions[currentAction.nextActionIndex],
    );

    this.actions[this.nextMowerToMove].nextActionIndex =
      currentAction.nextActionIndex + 1;

    return hasMoved;
  }

  /**
   * Check if the game is over by checking if all the actions have been done
   * @returns {boolean} Is the game over
   */
  checkIfNoActionRemaining(): boolean {
    return this.actions.findIndex((action) => action.canMove) === -1;
  }

  /**
   * Play a full game
   */
  playGame() {
    while (!this.checkIfNoActionRemaining()) {
      this.playNextMove();
    }

    this.endGame();
  }

  /**
   * End the game by displaying the results
   */
  endGame() {
    console.info("**** Final positions ****");
    this.mowers.forEach((mower, index) => {
      console.info(
        `Mower ${index + 1}: ${positionToString(mower.coordinates)}`,
      );
    });
    this.over = true;
    console.info("**** Game Over ****");
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
    startingDirection: CardinalPoint,
  ): number {
    const mower = new Mower(lawn, startingCoordinates, startingDirection);
    this.mowers.push(mower);
    return this.mowers.length - 1;
  }
}
