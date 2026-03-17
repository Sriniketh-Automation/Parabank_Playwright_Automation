import * as fs from 'fs';
import * as path from 'path';

export class JsonReader {
  // Method to read JSON test data file by filename
  static getData(fileName: string): any {
    const filePath = path.resolve(
      process.cwd(),
      `testdata/${fileName}.json`
    );
    const rawData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData);
  }
}