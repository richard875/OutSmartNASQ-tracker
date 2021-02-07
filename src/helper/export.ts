import LatestFiles from "../functions/latestFiles";
import * as fs from "fs";

const exportFile = (makeData: string) => {
  const outputName: string = `analyzed${LatestFiles.latestDataTime}.md`;
  const outputNameHTML: string = `analyzed${LatestFiles.latestDataTime}.html`;

  fs.writeFile(`./data/markdown/${outputName}`, makeData, (err: any) => {
    if (err) return console.log(err);
  });
  fs.writeFile(`./data/html/${outputNameHTML}`, makeData, (err: any) => {
    if (err) return console.log(err);
  });
};

export default exportFile;
