import { promises as fsPromises } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import {
  IGardenSessionInput,
  IMowerDataInput,
} from "../interfaces/gardenSession.interface";
import { isNumeric } from "../utils/string";
import { generateDirectionFromString } from "../utils/geo";

const relativeFilename = fileURLToPath(import.meta.url);
const relativeDirname = dirname(relativeFilename);

const asyncReadFile = async (filename: string) => {
  try {
    const text = await fsPromises.readFile(
      join(relativeDirname, filename),
      "utf-8",
    );
    return text;
  } catch (err) {
    throw new Error(
      `Can't read the input file: ${JSON.stringify(err, null, 2)}`,
    );
  }
};

const isDataCorrect = (data: (string | number)[][]) => {
  if (data.length < 3 || data.length % 2 === 0) {
    console.error("Bad data Input");
    return false;
  }
  if (data[0].length !== 2) {
    console.error("Incorrect lawn boundaries");
    return false;
  }
  if (!isNumeric(data[0][0]) || !isNumeric(data[0][1])) {
    console.error("Incorrect lawn boundaries");
    return false;
  }

  for (let i = 2; i < data.length; i += 1) {
    if (i % 2 === 1 && data[i].length !== 3) {
      console.error("Incorrect mower origin");
      return false;
    }
    if (
      i % 2 === 1 &&
      data[i].length === 3 &&
      (!isNumeric(data[i][0]) || !isNumeric(data[i][1]))
    ) {
      console.log(i, i % 2);
      console.error("Incorrect mower origin");
      return false;
    }
  }

  return true;
};
const generateInputData = async (
  filename: string,
): Promise<IGardenSessionInput> => {
  const textInput = await asyncReadFile(filename);
  const arrayData = textInput
    .split("\n")
    .map((s) => s.replace(/ /g, "").split(""));

  if (!isDataCorrect(arrayData)) {
    throw new Error("Incorrect");
  }

  const mowersData: IMowerDataInput[] = [];
  for (let i = 1; i < arrayData.length - 1; i += 2) {
    const data: IMowerDataInput = {
      coordinates: {
        x: parseInt(arrayData[i][0], 10),
        y: parseInt(arrayData[i][1], 10),
      },
      direction: generateDirectionFromString(arrayData[i][2] as any),
      actions: arrayData[i + 1] as any[],
    };
    mowersData.push(data);
  }
  return {
    boundaries: {
      bottomLeft: { x: 0, y: 0 },
      northRight: {
        x: parseInt(arrayData[0][0], 10),
        y: parseInt(arrayData[0][1], 10),
      },
    },
    mowersData,
  };
};

export default generateInputData;
