import getInstrument from "../helper/getStock";

const stockPercentageChanged = (
  text: string,
  lateststockData: any,
  secondlateststockData: any
) => {
  let stockUnchanged = [];
  let stockThatChangedPercentage = [];

  lateststockData.map((newStock: any) => {
    return secondlateststockData.filter(
      (oldStock: any) => oldStock.instrumentId === newStock.instrumentId
    ).length == 0
      ? null
      : stockUnchanged.push(newStock);
  });

  let stockPercentageChanged = stockUnchanged.filter((stock: any) => {
    let changedPercentage = Number(
      (
        lateststockData.filter(
          (ele: any) => ele.instrumentId === stock.instrumentId
        )[0].investmentPct -
        secondlateststockData.filter(
          (ele: any) => ele.instrumentId === stock.instrumentId
        )[0].investmentPct
      ).toFixed(2)
    );

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
        stockPercentageChanged[i].instrumentId
      );
      text += "\n<tr>";
      text += `\n<th>${stockInfo[0].InstrumentDisplayName}</th>`;
      text += `\n<th>${stockInfo[0].SymbolFull}</th>`;
      text +=
        stockThatChangedPercentage[i] >= 0
          ? `\n<th><span style='color: green'>${stockThatChangedPercentage[i]}%&#9650;</span></th>`
          : `\n<th><span style='color: red'>${stockThatChangedPercentage[i]}%&#9660;</span></th>`;
      text += "\n</tr>";
    }
    text += "\n</table>";
  } else {
    text += "\n<p style='text-align: center'>Nothing has changed</p>";
  }

  return text;
};

export default stockPercentageChanged;
