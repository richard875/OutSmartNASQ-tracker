import makeStockHeading from "./makeStockHeading";
import makeIndividualStockData from "./makeIndividualStockData";
import checkEmailStatus from "../helper/checkIfSendEmail";

const stockChanged = async (
  text: string,
  newData: any,
  oldData: any,
  toAdd: boolean
) => {
  let lateststockData = toAdd ? newData : oldData;
  let secondlateststockData = toAdd ? oldData : newData;

  let stocksAdd = lateststockData.filter(
    (oldStock: any) =>
      !secondlateststockData
        .map((x: any) => x.instrumentId)
        .includes(oldStock.instrumentId)
  );

  if (stocksAdd.length) {
    text += "\n<table style='width: 100%;'>";
    text = makeStockHeading(text);

    for (var i = 0; i < stocksAdd.length; i++) {
      text += await makeIndividualStockData(stocksAdd[i]);
    }

    text += "\n</table>";
    checkEmailStatus.dataHasChanged = true;
  } else {
    text += "\n<p style='text-align: center'>Nothing has changed</p>";
  }

  return text;
};

export default stockChanged;
