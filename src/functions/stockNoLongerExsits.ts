import makeStockHeading from "./makeStockHeading";
import makeIndividualStockData from "./makeIndividualStockData";
import checkEmailStatus from "../helper/checkIfSendEmail";

const stockNoLongerExsits = async (
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

    for (var i = 0; i < stocksRemoved.length; i++) {
      text += await makeIndividualStockData(stocksRemoved[i]);
    }

    text += "\n</table>";
    checkEmailStatus.dataHasChanged = true;
  } else {
    text += "\n<p style='text-align: center'>Nothing has changed</p>";
  }

  return text;
};

export default stockNoLongerExsits;
