import LatestFiles from "./latestFiles";
import addBlankLine from "./blankLine";
import makeStockDataTable from "./makeStockDataTable";
import stockNoLongerExsits from "./stockNoLongerExsits";
import stockAdded from "./stockAdded";
import stockPercentageChanged from "./stockPercentageChanged";
import exportFile from "../helper/export";
import sendEmail from "../helper/sendEmail";
const lateststockData = require(`../../data/json/${LatestFiles.latestDataName}`);
const secondlateststockData = require(`../../data/json/${LatestFiles.secondLatestDataName}`);

const makeData = (): string => {
  let makeData: string = ""; // declear string
  makeData += '<body style="width: 50%; margin: 0 auto;">';
  makeData = addBlankLine(makeData, 2);
  makeData += "\n<h1 style='text-align: center'>OutSmartNASQ</h1>";
  makeData += `\n<h2 style='text-align: center'>Data as ${LatestFiles.latestDataTime}</h2>`;
  makeData = addBlankLine(makeData, 2);
  makeData += "\n<h2 style='text-align: center'>Current holdings:</h2>";
  makeData = makeStockDataTable(
    makeData,
    lateststockData.sort((a: any, b: any) => b.investmentPct - a.investmentPct)
  );
  makeData = addBlankLine(makeData, 2);
  makeData += "\n<h2 style='text-align: center'>Stock changes</h2>";
  makeData = addBlankLine(makeData, 1);
  makeData += "\n<p><b>Stock that no longer exsits (likely sold):</b></p>";
  makeData = stockNoLongerExsits(
    makeData,
    lateststockData,
    secondlateststockData
  );
  makeData = addBlankLine(makeData, 1);
  makeData += "\n<p><b>Stock added since last checked (likely bought):</b></p>";
  makeData = stockAdded(makeData, lateststockData, secondlateststockData);
  makeData = addBlankLine(makeData, 2);
  makeData += "\n<h2 style='text-align: center'>Stock percentage changes</h2>";
  makeData = addBlankLine(makeData, 1);
  makeData = stockPercentageChanged(
    makeData,
    lateststockData,
    secondlateststockData
  );
  makeData += `
    <style>
        table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
        }
    </style>`;
  makeData += "</body>";

  return makeData;
};

export default makeData;
