import GameFileReader from "../GameFileReader";
import DataChecker from "../DataChecker";
import { asyncReadFile } from "../../utils/files";

const correctFile = "../data/__tests__/inputCorrect.txt";

const correctString =
  "5 5\n" + "1 2 N\n" + "LFLFLFLFF\n" + "3 3 E\n" + "FFRFFRFRRF";
const incorrectString =
  "5 5\n" + "1 2 X\n" + "LFLFLFLFF\n" + "3 3 E\n" + "FFRFFRFRRF";

describe("Game data parsing", () => {
  let gameFileReader: GameFileReader;

  beforeAll(() => {
    const dataChecker = new DataChecker();
    gameFileReader = new GameFileReader(dataChecker);
  });

  test("should read a file", async () => {
    const file = await asyncReadFile(correctFile);
    expect(file).toBeTruthy();
  });
  test("should parse data with correct file", async () => {
    const parsedData = gameFileReader.parseData(correctString);
    expect(parsedData).toHaveLength(5);
  });

  test("should throw error when parsing incorrect data", async () => {
    expect(() => {
      gameFileReader.parseData(incorrectString);
    }).toThrow(Error);
  });

  test("should generate a correct input file when parsing correct data", async () => {
    const data = await gameFileReader.processFile(correctFile);
    expect(data.ok).toBe(true);
    expect(data.mowersData).toHaveLength(2);
  });
});
