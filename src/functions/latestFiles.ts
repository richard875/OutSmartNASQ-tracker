import * as fs from "fs";
import * as path from "path";

class LatestFiles {
  private static getMostRecentFile = (dir: string): any => {
    const files = LatestFiles.orderReccentFiles(dir);
    return files.length ? [files[0], files[1]] : undefined;
  };

  private static orderReccentFiles = (dir: string): any => {
    return fs
      .readdirSync(dir)
      .filter((file) => fs.lstatSync(path.join(dir, file)).isFile())
      .map((file) => ({
        file,
        mtime: fs.lstatSync(path.join(dir, file)).mtime,
      }))
      .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
  };

  private static mostRecentFiles: any = LatestFiles.getMostRecentFile(
    "./data/json"
  );

  public static latestDataName: string = LatestFiles.mostRecentFiles[0].file; // name string
  public static secondLatestDataName: string =
    LatestFiles.mostRecentFiles[1].file; // name string
  public static latestDataTime: string = LatestFiles.latestDataName.slice(
    4,
    23
  );
  public static secondLatestDataTime: string = LatestFiles.secondLatestDataName.slice(
    4,
    23
  );
}

export default LatestFiles;
