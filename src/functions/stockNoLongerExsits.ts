import makeStockHeading from "./makeStockHeading";
import makeIndividualStockData from "./makeIndividualStockData";

const stockNoLongerExsits = (
  text: string,
  lateststockData: any,
  secondlateststockData: any
) => {
  let stocksRemoved = [];

  secondlateststockData.map((oldStock: any) => {
    return lateststockData.filter(
      (newStock: any) => newStock.instrumentId === oldStock.instrumentId
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

export default stockNoLongerExsits;
