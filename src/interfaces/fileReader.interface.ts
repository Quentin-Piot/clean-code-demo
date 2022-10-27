import DataChecker from "../models/DataChecker";

export interface IDataInput {
  ok: boolean;
}

export interface FileReader {
  dataChecker: DataChecker;

  parseData(data: string): string[][];

  processFile(location: string): Promise<IDataInput>;
}
