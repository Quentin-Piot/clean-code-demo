import generateInputData from "./models/fileReader";
import GardenSession from "./models/gardenSession";

const session = new GardenSession();

generateInputData("../data/input.txt").then((data) => {
  session.generateData(data);
  console.log(session.mowers);
  session.playGame();
});
