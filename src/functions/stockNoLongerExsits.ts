import makeStockHeading from "./makeStockHeading";
import makeIndividualStockData from "./makeIndividualStockData";
import checkEmailStatus from "../helper/checkIfSendEmail";

const stockNoLongerExsits = async (
  text: string,
  lateststockData: any,
  secondlateststockData: any
) => {
  let stocksRemoved = secondlateststockData.filter(
    (oldStock: any) =>
      !lateststockData
        .map((x: any) => x.instrumentId)
        .includes(oldStock.instrumentId)
  );

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
