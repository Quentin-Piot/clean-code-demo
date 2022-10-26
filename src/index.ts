import asyncReadFile from "./services/reader";

asyncReadFile("../data/input.txt").then((d) => console.log(d));
