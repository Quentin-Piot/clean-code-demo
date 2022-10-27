import generateInputData from "./models/fileReader";
import GardenSession from "./models/gardenSession";

performance.mark("game-start");

const session = new GardenSession();

generateInputData("../data/input.txt").then((data) => {
  performance.mark("parse-end");

  session.generateData(data);
  session.playGame();
  performance.mark("game-end");

  const timeParse = performance
    .measure("parsing-time", "game-start", "parse-end")
    .duration.toFixed(2);
  const timeGame = performance
    .measure("game-time", "game-start", "game-end")
    .duration.toFixed(2);

  console.log(`Duration parsing: ${timeParse}ms`);
  console.log(`Duration total: ${timeGame}ms`);
});
