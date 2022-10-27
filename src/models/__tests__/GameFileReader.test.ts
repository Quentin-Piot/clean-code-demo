import GameFileReader from "../GameFileReader";
import DataChecker from "../DataChecker";
import { asyncReadFile } from "../../utils/files";

const correctFile = "../data/__tests__/inputCorrect.txt";
const incorrectFile = "../data/__tests__/inputIncorrect.txt";

describe("Data Parsing", () => {
  let fileReader: GameFileReader;

  beforeAll(() => {
    const dataChecker = new DataChecker();
    fileReader = new GameFileReader(dataChecker);
  });

  test("Can read file", async () => {
    const file = await asyncReadFile(correctFile);
    expect(file).toBeTruthy();
  });
  test("Can parse correct data", async () => {
    const data = await asyncReadFile(correctFile);
    const parsedData = fileReader.parseData(data);
    expect(parsedData).toHaveLength(5);
  });

  test("Can't parse incorrect data", async () => {
    const data = await asyncReadFile(incorrectFile);
    expect(() => {
      fileReader.parseData(data);
    }).toThrow(Error);
  });

  test("Can generate correct input", async () => {
    const data = await fileReader.processFile(correctFile);
    expect(data.ok).toBe(true);
    expect(data.mowersData).toHaveLength(2);
  });
});
