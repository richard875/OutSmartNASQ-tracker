import LatestFiles from "./latestFiles";
import addBlankLine from "./blankLine";
import makeStockDataTable from "./makeStockDataTable";
import stockChanged from "./stockChanged";
import stockPercentageChanged from "./stockPercentageChanged";

const makeData = async (isMarketOpen: boolean) => {
  const nameToGet = new LatestFiles(isMarketOpen);
  const inputLocation: string = isMarketOpen ? "marketOpen" : "marketClosed";
  const lateststockData = require(`../../data/json/${inputLocation}/${nameToGet.latestDataName}`);
  const secondlateststockData = require(`../../data/json/${inputLocation}/${nameToGet.secondLatestDataName}`);

  let makeData: string = ""; // declear string
  makeData += '<body style="width: 75%; margin: 0 auto;">';
  makeData = addBlankLine(makeData, 2);
  makeData += "\n<h1 style='text-align: center'>OutSmartNASQ</h1>";
  makeData += `\n<h2 style='text-align: center'>Data as ${nameToGet.latestDataTime}</h2>`;
  makeData = addBlankLine(makeData, 2);
  makeData += "\n<h2 style='text-align: center'>Current holdings</h2>";
  makeData = await makeStockDataTable(
    makeData,
    lateststockData.sort((a: any, b: any) => b.investmentPct - a.investmentPct)
  );
  makeData = addBlankLine(makeData, 2);
  makeData += "\n<h2 style='text-align: center'>Stock changes</h2>";
  makeData = addBlankLine(makeData, 1);
  makeData += "\n<p><b>Stock that no longer exsits (likely sold):</b></p>";
  makeData = await stockChanged(
    makeData,
    lateststockData,
    secondlateststockData,
    false
  );
  makeData = addBlankLine(makeData, 1);
  makeData += "\n<p><b>Stock added since last checked (likely bought):</b></p>";
  makeData = await stockChanged(
    makeData,
    lateststockData,
    secondlateststockData,
    true
  );
  makeData = addBlankLine(makeData, 2);
  makeData += "\n<h2 style='text-align: center'>Stock percentage changes</h2>";
  makeData = addBlankLine(makeData, 1);
  makeData = stockPercentageChanged(
    makeData,
    lateststockData,
    secondlateststockData
  );
  makeData = addBlankLine(makeData, 2);
  makeData +=
    "\n<p style='text-align: center'><b>“An investment in knowledge pays the best interest.”&nbsp;&nbsp;-&nbsp;&nbsp;Benjamin Franklin</b></p>";
  makeData = addBlankLine(makeData, 1);
  makeData += "\n<p>Sincerely,</p>";
  makeData += "\n<p>Richard Lee</p>";
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
