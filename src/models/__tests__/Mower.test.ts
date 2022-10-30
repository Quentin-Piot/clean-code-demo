import Lawn from "../Lawn";
import Mower from "../Mower";
import { ICoordinates } from "../../interfaces/geo.interface";

const originPosition: ICoordinates = { x: 0, y: 0 };
describe("Mower tests", () => {
  let lawn: Lawn;

  beforeAll(() => {
    lawn = new Lawn({
      bottomLeft: { x: 0, y: 0 },
      northRight: { x: 5, y: 5 },
    });
  });

  test("should be well created", async () => {
    const mower = new Mower(lawn, originPosition, "N", []);
    expect(mower).toBeTruthy();
  });

  test("should detect or not the obstacle", async () => {
    const mower = new Mower(lawn, originPosition, "N", []);
    const pos: ICoordinates = { x: 1, y: 3 };
    mower.obstacles.push(pos);
    expect(mower.checkObstacle(pos)).toBe(true);
    expect(mower.checkObstacle(originPosition)).toBe(false);
  });

  test("should move to a good position", async () => {
    const mower = new Mower(lawn, originPosition, "N", []);
    mower.move("F");
    expect(mower.coordinates).toEqual({ x: 0, y: 1 });
  });

  test("should rotate and not move", async () => {
    const mower = new Mower(lawn, originPosition, "N", []);
    mower.move("R");
    expect(mower.cardinalDirection).toBe("E");
    expect(mower.coordinates).toEqual(originPosition);
  });

  test("should not move out of the lawn", async () => {
    const posAtBorderOfLawn = { x: 0, y: lawn.boundaries.northRight.y };
    const mower = new Mower(lawn, posAtBorderOfLawn, "N", []);
    mower.move("F");
    expect(mower.coordinates).toEqual(posAtBorderOfLawn);
  });
});
