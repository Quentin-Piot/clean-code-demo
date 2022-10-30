import Lawn from "../Lawn";
import { ICoordinates } from "../../interfaces/geo.interface";
import GameSession from "../GameSession";
import { IGardenSessionInput } from "../../interfaces/gardenSession.interface";

const originPosition: ICoordinates = { x: 0, y: 0 };
const inputData: IGardenSessionInput = {
  ok: true,
  boundaries: { bottomLeft: { x: 0, y: 0 }, northRight: { x: 5, y: 5 } },
  mowersData: [
    {
      ok: true,
      coordinates: { x: 1, y: 2 },
      direction: "N",
      actions: ["F", "F", "L", "F", "L", "F", "L", "F", "F"],
    },
    {
      ok: true,
      coordinates: { x: 3, y: 3 },
      direction: "E",
      actions: ["F", "F", "R", "F", "F", "R", "F", "R", "R", "F"],
    },
  ],
};
const inputDataFinished: IGardenSessionInput = {
  ok: true,
  boundaries: { bottomLeft: { x: 0, y: 0 }, northRight: { x: 5, y: 5 } },
  mowersData: [
    {
      ok: true,
      coordinates: { x: 1, y: 2 },
      direction: "N",
      actions: [],
    },
    {
      ok: true,
      coordinates: { x: 3, y: 3 },
      direction: "E",
      actions: [],
    },
  ],
};

describe("Mower tests", () => {
  let lawn: Lawn;

  beforeAll(() => {
    lawn = new Lawn({
      bottomLeft: { x: 0, y: 0 },
      northRight: { x: 5, y: 5 },
    });
  });

  test("should be well created", async () => {
    const gameSession = new GameSession();
    expect(gameSession).toBeTruthy();
  });
  test("should generate good data", async () => {
    const gameSession = new GameSession();
    gameSession.generateData(inputData);
    expect(gameSession.mowers).toHaveLength(2);
    expect(gameSession.actions).toHaveLength(2);
    expect(gameSession.checkIfNoActionRemaining()).toBe(false);
  });
  test("should add a mower", async () => {
    const gameSession = new GameSession();
    gameSession.addMower(lawn, originPosition, "N");
    expect(gameSession.mowers).toHaveLength(1);
  });

  test("should end game", async () => {
    const gameSession = new GameSession();
    gameSession.generateData(inputDataFinished);
    gameSession.playGame();
    expect(gameSession.over).toBe(true);
  });
});
