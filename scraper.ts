//#region import
const instruments = require("./InstrumentID.json");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

const getMostRecentFile = (dir: string) => {
  const files = orderReccentFiles(dir);
  return files.length ? [files[0], files[1]] : undefined;
};

const orderReccentFiles = (dir: string) => {
  return fs
    .readdirSync(dir)
    .filter((file) => fs.lstatSync(path.join(dir, file)).isFile())
    .map((file) => ({ file, mtime: fs.lstatSync(path.join(dir, file)).mtime }))
    .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
};

const mostRecentFiles = getMostRecentFile("./parsedStockData");
const latestDataName = mostRecentFiles[0].file; // name string
const secondLatestDataName = mostRecentFiles[1].file; // name string
const lateststockData = require(`./parsedStockData/${latestDataName}`);
const secondlateststockData = require(`./parsedStockData/${secondLatestDataName}`);
//#endregion

//#region helper
let currentDateAndTime = () => {
  let current = new Date();
  return `${current.getMonth()}_${current.getDate()}_${current.getFullYear()}_${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
};

let getInstrument = (instrumentID: number) => {
  return instruments.InstrumentDisplayDatas.filter(
    (ele: any) => ele.InstrumentID === instrumentID
  );
};

let addBlankLine = (text: string, repeatNumber: number): string => {
  for (let i = 0; i < repeatNumber; i++) {
    text += "\n<br />";
  }
  return text;
};

let makeStockHeading = (text: string) => {
  text += "\n<tr>";
  text += "\n<th>Company</th>";
  text += "\n<th>Ticker</th>";
  text += "\n<th>Buy/Sell</th>";
  text += "\n<th><i>Invested%</i></th>";
  text += "\n<th>P/L%</th>";
  text += "\n<th>Current Value</th>";
  text += "\n</tr>";

  return text;
};

let makeIndividualStockData = (text: string, stock: any) => {
  let stockInfo: any = getInstrument(stock.InstrumentID);
  text += "\n<tr>";
  text += `\n<td>${stockInfo[0].InstrumentDisplayName}</td>`;
  text += `\n<td>${stockInfo[0].SymbolFull}</td>`;
  text += `\n<td>${stock.Direction}</td>`;
  text += `\n<td><i>${stock.Invested}%</i></td>`;
  text +=
    stock.NetProfit >= 0
      ? `\n<td><span style='color: green'>${stock.NetProfit}&#8593;</span></td>`
      : `\n<td><span style='color: red'>${stock.NetProfit}&#8595;</span></td>`;
  text += `\n<td>${stock.Value}%</td>`;
  text += "\n</tr>";

  return text;
};

let makeStockDataTable = (text: string, stockData: any) => {
  text += "\n<table style='width: 100%;'>";
  text = makeStockHeading(text);
  stockData.AggregatedPositions.map((stock: any) => {
    text = makeIndividualStockData(text, stock);
  });
  text += "\n</table>";
  return text;
};

let stockNoLongerExsits = (text: string) => {
  let stocksRemoved = [];

  secondlateststockData.AggregatedPositions.map((oldStock: any) => {
    return lateststockData.AggregatedPositions.filter(
      (newStock: any) => newStock.InstrumentID === oldStock.InstrumentID
    ).length == 0
      ? stocksRemoved.push(oldStock)
      : null;
  });

  if (stocksRemoved.length) {
    text += "\n<table style='width: 100%;'>";
    text = makeStockHeading(text);
    stocksRemoved.map((stock: any) => {
      text = makeIndividualStockData(text, stock);
    });
    text += "\n</table>";
  } else {
    text += "\n<p style='text-align: center'>Nothing has changed</p>";
  }

  return text;
};

let stockAdded = (text: string) => {
  let stocksAdd = [];

  lateststockData.AggregatedPositions.map((newStock: any) => {
    return secondlateststockData.AggregatedPositions.filter(
      (oldStock: any) => oldStock.InstrumentID === newStock.InstrumentID
    ).length == 0
      ? stocksAdd.push(newStock)
      : null;
  });

  if (stocksAdd.length) {
    text += "\n<table style='width: 100%;'>";
    text = makeStockHeading(text);
    stocksAdd.map((stock: any) => {
      text = makeIndividualStockData(text, stock);
    });
    text += "\n</table>";
  } else {
    text += "\n<p style='text-align: center'>Nothing has changed</p>";
  }

  return text;
};

let stockPercentageChanged = (text: string) => {
  let stockUnchanged = [];
  let stockThatChangedPercentage = [];

  lateststockData.AggregatedPositions.map((newStock: any) => {
    return secondlateststockData.AggregatedPositions.filter(
      (oldStock: any) => oldStock.InstrumentID === newStock.InstrumentID
    ).length == 0
      ? null
      : stockUnchanged.push(newStock);
  });

  let stockPercentageChanged = stockUnchanged.filter((stock: any) => {
    let changedPercentage =
      lateststockData.AggregatedPositions.filter(
        (ele: any) => ele.InstrumentID === stock.InstrumentID
      )[0].Invested -
      secondlateststockData.AggregatedPositions.filter(
        (ele: any) => ele.InstrumentID === stock.InstrumentID
      )[0].Invested;

    changedPercentage == 0
      ? null
      : stockThatChangedPercentage.push(changedPercentage);

    return changedPercentage != 0;
  });

  if (stockThatChangedPercentage.length) {
    text += "\n<table style='width: 100%;'>";
    text += "\n<tr>";
    text += "\n<th>Company</th>";
    text += "\n<th>Ticker</th>";
    text += "\n<th><i>Invested% CHANGED</i></th>";
    text += "\n</tr>";
    for (let i = 0; i < stockThatChangedPercentage.length; i++) {
      let stockInfo: any = getInstrument(
        stockPercentageChanged[i].InstrumentID
      );
      text += "\n<tr>";
      text += `\n<th>${stockInfo[0].InstrumentDisplayName}</th>`;
      text += `\n<th>${stockInfo[0].SymbolFull}</th>`;
      text +=
        stockThatChangedPercentage[i] >= 0
          ? `\n<th><span style='color: green'>${stockThatChangedPercentage[i]}%&#8593;</span></th>`
          : `\n<th><span style='color: red'>${stockThatChangedPercentage[i]}%&#8595;</span></th>`;
      text += "\n</tr>";
    }
    text += "\n</table>";
  } else {
    text += "\n<p style='text-align: center'>Nothing has changed</p>";
  }

  return text;
};
//#endregion

//#region make output data
let makeData: string = ""; // declear string
makeData += "<h1 style='text-align: center'>OutSmartNASQ</h1>";
makeData += `\n<h2 style='text-align: center'>Data as ${latestDataName.slice(
  9,
  28
)}</h2>`;
makeData = addBlankLine(makeData, 2);
makeData += "\n<h2 style='text-align: center'>Current holdings:</h2>";
makeData = addBlankLine(makeData, 1);
makeData = makeStockDataTable(makeData, lateststockData);
makeData = addBlankLine(makeData, 2);
makeData += "\n<h2 style='text-align: center'>Stock changes</h2>";
makeData = addBlankLine(makeData, 1);
makeData += "\n<p><b>Stock that no longer exsits (likely sold):</b></p>";
makeData = stockNoLongerExsits(makeData);
makeData = addBlankLine(makeData, 1);
makeData += "\n<p><b>Stock added since last checked (likely bought):</b></p>";
makeData = stockAdded(makeData);
makeData = addBlankLine(makeData, 2);
makeData += "\n<h2 style='text-align: center'>Stock percentage changes</h2>";
makeData = addBlankLine(makeData, 1);
makeData = stockPercentageChanged(makeData);
makeData += `
<style>
  table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
  }
</style>`;
//#endregion

//#region output data
const outputName: string = `analyzed${latestDataName.slice(9, 28)}.md`;
const outputNameHTML: string = `analyzed${latestDataName.slice(9, 28)}.html`;
fs.writeFile(`./analyzedData/${outputName}`, makeData, function (err: any) {
  if (err) return console.log(err);
});
fs.writeFile(
  `./analyzedDataHTML/${outputNameHTML}`,
  makeData,
  function (err: any) {
    if (err) return console.log(err);
  }
);
//#endregion

//#region send mail
let sendStockData = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "outsmartnsdqautosender@gmail.com",
    pass: '"9~DuN[N_#Ue!KH7F',
  },
});

let mailOptions = {
  from: "outsmartnsdqautosender@gmail.com",
  to: "richard_875@me.com",
  subject: `Stock Data as ${latestDataName.slice(9, 28)}`,
  html: makeData,
  attachments: [
    {
      filename: `Data as ${latestDataName.slice(9, 28)}.html`,
      content: makeData,
      contentType: "text/plain",
    },
  ],
};

sendStockData.sendMail(mailOptions, function (error: any, info: any) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
//#endregion
