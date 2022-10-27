import { promises as fsPromises } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const relativeFilename = fileURLToPath(import.meta.url);
const relativeDirname = dirname(relativeFilename);
export const asyncReadFile = async (filename: string) => {
  try {
    return await fsPromises.readFile(join(relativeDirname, filename), "utf-8");
  } catch (err) {
    throw new Error(
      `Can't read the input file: ${JSON.stringify(err, null, 2)}`,
    );
  }
};
