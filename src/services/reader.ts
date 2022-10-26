import { promises as fsPromises } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const relativeFilename = fileURLToPath(import.meta.url);
const relativeDirname = dirname(relativeFilename);

export default async function asyncReadFile(filename: string) {
  try {
    const text = await fsPromises.readFile(
      join(relativeDirname, filename),
      "utf-8",
    );
    return text.split("\n").map((s) => s.replace(/ /g, "").split(""));
  } catch (err) {
    return new Error(
      `Can't read the input file: ${JSON.stringify(err, null, 2)}`,
    );
  }
}
