import {
  IGardenSessionInput,
  IMowerDataInput,
} from "../interfaces/gardenSession.interface";
import { CardinalPoint, Direction } from "../interfaces/geo.interface";
import DataChecker from "./DataChecker";
import { FileReader } from "../interfaces/fileReader.interface";
import { asyncReadFile } from "../utils/files";

export default class GameFileReader implements FileReader {
  dataChecker: DataChecker;

  constructor(dataChecker: DataChecker) {
    this.dataChecker = dataChecker;
  }

  /**
   * Process file string, check if it corrects and parse it to an array
   * @param input The input string
   * @returns {string[][]} Parsed data
   */
  parseData(input: string) {
    const arrayData = input
      .split("\n")
      .map((s) => s.replace(/ /g, "").split(""));
    const isCorrect = this.dataChecker.isDataCorrect(arrayData);
    if (!isCorrect) {
      throw new Error("Data Input");
    }

    return arrayData;
  }

  /**
   * Process a file to create an input readable by a GameSession
   * @param location Location of the file
   * @returns {Promise<IGardenSessionInput>} Promise of readable GameSessionInput
   */
  async processFile(location: string): Promise<IGardenSessionInput> {
    const textInput = await asyncReadFile(location);
    const arrayData = this.parseData(textInput);
    const mowersData: IMowerDataInput[] = [];
    for (let i = 1; i < arrayData.length - 1; i += 2) {
      const data: IMowerDataInput = {
        ok: true,
        coordinates: {
          x: parseInt(arrayData[i][0], 10),
          y: parseInt(arrayData[i][1], 10),
        },
        direction: arrayData[i][2] as CardinalPoint,
        actions: arrayData[i + 1] as Direction[],
      };
      mowersData.push(data);
    }
    return {
      ok: true,
      boundaries: {
        bottomLeft: { x: 0, y: 0 },
        northRight: {
          x: parseInt(arrayData[0][0], 10),
          y: parseInt(arrayData[0][1], 10),
        },
      },
      mowersData,
    };
  }
}
