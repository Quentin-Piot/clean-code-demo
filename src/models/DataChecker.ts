import { isNumeric } from "../utils/string";

export default class DataChecker {
  isDataCorrect(data: string[][]) {
    if (data.length < 3 || data.length % 2 === 0) {
      console.error("The input format is incorrect");
      return false;
    }
    if (
      data[0].length !== 2 &&
      ((data[0].length === 2 && !isNumeric(data[0][0])) ||
        !isNumeric(data[0][1]))
    ) {
      console.error("Incorrect lawn boundaries");
      return false;
    }

    for (let i = 1; i < data.length; i += 1) {
      if (
        (i % 2 === 1 && data[i].length !== 3) ||
        (i % 2 === 1 &&
          data[i].length === 3 &&
          (!isNumeric(data[i][0]) ||
            !isNumeric(data[i][1]) ||
            (data[i][2] !== "N" &&
              data[i][2] !== "S" &&
              data[i][2] !== "W" &&
              data[i][2] !== "E")))
      ) {
        console.error("Incorrect mower data", data[i]);
        return false;
      }

      if (
        i % 2 === 0 &&
        data[i].findIndex((v: string) => v !== "F" && v !== "L" && v !== "R") >
          -1
      ) {
        console.error("Incorrect mower instructions", data[i]);
        return false;
      }
    }

    return true;
  }
}
