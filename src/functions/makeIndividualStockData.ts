import fetch from "node-fetch";
import getInstrument from "../helper/getStock";
import tickerInformation from "../../data/static/tickerData";

let getStockRawInfo = (ticker: string) => {
  return new Promise((resolve, reject): any => {
    const json: any = fetch(
      `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${tickerInformation.key}`
    ).then((response) => response.json());

    resolve(json);
  });
};

const makeIndividualStockData = async (stock: any) => {
  let text = "";
  const stockInfo: any = getInstrument(stock.instrumentId);
  const stockRaw: any = await getStockRawInfo(stockInfo[0].SymbolFull);
  const percentageChanged: number =
    ((stockRaw.c - stockRaw.pc) / stockRaw.pc) * 100;
  text += "\n<tr>";
  text += `\n<td>${stockInfo[0].InstrumentDisplayName}</td>`;
  text += `\n<td>${stockInfo[0].SymbolFull}</td>`;
  text +=
    percentageChanged >= 0
      ? `\n<td><span style='color: green;'>${stockRaw.c}&#9650;</span></td>`
      : `\n<td><span style='color: red;'>${stockRaw.c}&#9660;</span></td>`;
  text +=
    percentageChanged >= 0
      ? `\n<td><span style='color: green;'>${percentageChanged.toFixed(
          2
        )}%</span></td>`
      : `\n<td><span style='color: red;'>${percentageChanged.toFixed(
          2
        )}%</span></td>`;
  text += `\n<td>${stock.riskContributionPct}%</td>`;
  text += `\n<td><i>${stock.investmentPct}%</i></td>`;
  text += `\n<td>${stock.exposurePct}%</td>`;
  text += "\n</tr>";

  return text;
};

export default makeIndividualStockData;
