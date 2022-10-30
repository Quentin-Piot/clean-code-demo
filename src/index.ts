import GameSession from "./models/GameSession";
import DataChecker from "./models/DataChecker";
import FileReader from "./models/GameFileReader";

const main = async () => {
  performance.mark("parse-start");

  const dataChecker = new DataChecker();

  // optional: used as dependency injection to possibility change data checker in the future
  const fileReader = new FileReader(dataChecker);

  try {
    const input = await fileReader.processFile("../data/input.txt");
    performance.mark("parse-end");

    performance.mark("game-start");

    const session = new GameSession();
    session.generateData(input);
    session.playGame();
    performance.mark("game-end");

    const timeParse = performance
      .measure("parsing-time", "parse-start", "parse-end")
      .duration.toFixed(2);
    const timeGame = performance
      .measure("game-time", "game-start", "game-end")
      .duration.toFixed(2);

    console.info(`Duration parsing: ${timeParse}ms`);
    console.info(`Duration game: ${timeGame}ms`);
  } catch (e) {
    console.error(e);
  }
};

main();
