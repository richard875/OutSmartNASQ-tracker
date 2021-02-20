import * as fs from "fs";
import * as path from "path";

class LatestFiles {
  public mostRecentFiles: any;
  public latestDataName: string;
  public secondLatestDataName: string;
  public latestDataTime: string;
  public secondLatestDataTime: string;
  private startSlice: number;
  private endSlice: number;

  private getMostRecentFile = (dir: string): any => {
    const files = this.orderReccentFiles(dir);
    return files.length ? [files[0], files[1]] : undefined;
  };

  private orderReccentFiles = (dir: string): any => {
    return fs
      .readdirSync(dir)
      .filter((file) => fs.lstatSync(path.join(dir, file)).isFile())
      .map((file) => ({
        file,
        mtime: fs.lstatSync(path.join(dir, file)).mtime,
      }))
      .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
  };

  constructor(isMarketOpen: boolean) {
    this.mostRecentFiles = this.getMostRecentFile(
      isMarketOpen ? "./data/json/marketOpen" : "./data/json/marketClosed"
    );
    this.latestDataName = this.mostRecentFiles[0].file;
    this.secondLatestDataName = this.mostRecentFiles[1].file;
    this.startSlice = isMarketOpen ? 14 : 16;
    this.endSlice = isMarketOpen ? 33 : 35;
    this.latestDataTime = this.latestDataName.slice(
      this.startSlice,
      this.endSlice
    );
    this.secondLatestDataTime = this.secondLatestDataName.slice(
      this.startSlice,
      this.endSlice
    );
  }
}

export default LatestFiles;
