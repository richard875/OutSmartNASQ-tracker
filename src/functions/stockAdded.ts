import makeStockHeading from "./makeStockHeading";
import makeIndividualStockData from "./makeIndividualStockData";

const stockAdded = async (
  text: string,
  lateststockData: any,
  secondlateststockData: any
) => {
  let stocksAdd = [];

  lateststockData.map((newStock: any) => {
    return secondlateststockData.filter(
      (oldStock: any) => oldStock.instrumentId === newStock.instrumentId
    ).length == 0
      ? stocksAdd.push(newStock)
      : null;
  });

  if (stocksAdd.length) {
    text += "\n<table style='width: 100%;'>";
    text = makeStockHeading(text);

    for (var i = 0; i < stocksAdd.length; i++) {
      text += await makeIndividualStockData(stocksAdd[i]);
    }

    text += "\n</table>";
  } else {
    text += "\n<p style='text-align: center'>Nothing has changed</p>";
  }

  return text;
};

export default stockAdded;
