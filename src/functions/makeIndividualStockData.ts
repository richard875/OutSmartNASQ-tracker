import getInstrument from "../helper/getStock";

const makeIndividualStockData = (text: string, stock: any) => {
  let stockInfo: any = getInstrument(stock.instrumentId);
  text += "\n<tr>";
  text += `\n<td>${stockInfo[0].InstrumentDisplayName}</td>`;
  text += `\n<td>${stockInfo[0].SymbolFull}</td>`;
  text += `\n<td>${stock.riskContributionPct}</td>`;
  text += `\n<td><i>${stock.investmentPct}%</i></td>`;
  text += `\n<td>${stock.exposurePct}%</td>`;
  text += "\n</tr>";

  return text;
};

export default makeIndividualStockData;
