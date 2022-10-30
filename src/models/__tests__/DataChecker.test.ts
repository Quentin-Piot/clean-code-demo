import DataChecker from "../DataChecker";

const correctData = [
  ["5", "5"],
  ["1", "2", "N"],
  ["L", "F", "L", "F", "L", "F", "L", "F", "F"],
  ["3", "3", "E"],
  ["F", "F", "R", "F", "F", "R", "F", "R", "R", "F"],
];

const incorrectData = [
  ["5", "5", "D"],
  ["1", "2", "N"],
  ["L", "F", "L", "F", "L", "F", "L", "F", "F"],
  ["3", "3", "E"],
  ["F", "F", "R", "F", "F", "R", "F", "R", "R", "F"],
];

describe("Game data parsing", () => {
  test("should create a DataChecker instance ", async () => {
    const dataChecker = new DataChecker();
    expect(dataChecker).toBeTruthy();
  });

  test("should be correct data ", async () => {
    const dataChecker = new DataChecker();
    expect(dataChecker.isDataCorrect(correctData)).toBe(true);
  });

  test("should be incorrect data ", async () => {
    const dataChecker = new DataChecker();
    expect(dataChecker.isDataCorrect(incorrectData)).toBe(true);
  });
});
