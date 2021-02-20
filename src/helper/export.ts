import LatestFiles from "../functions/latestFiles";
import * as fs from "fs";

const exportFile = (makeData: string, isMarketOpen: boolean) => {
  const nameToGet = new LatestFiles(isMarketOpen);
  const outputName: string = `analyzed${nameToGet.latestDataTime}.md`;
  const outputNameHTML: string = `analyzed${nameToGet.latestDataTime}.html`;
  const outputLocation: string = isMarketOpen ? "marketOpen" : "marketClosed";

  fs.writeFile(
    `./data/markdown/${outputLocation}/${outputName}`,
    makeData,
    (err: any) => {
      if (err) return console.log(err);
    }
  );
  fs.writeFile(
    `./data/html/${outputLocation}/${outputNameHTML}`,
    makeData,
    (err: any) => {
      if (err) return console.log(err);
    }
  );
};

export default exportFile;
