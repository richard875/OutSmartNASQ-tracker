import makeStockHeading from "./makeStockHeading";
import makeIndividualStockData from "./makeIndividualStockData";

let makeStockDataTable = async (text: string, stockData: any) => {
  text += "\n<table style='width: 100%;'>";
  text = makeStockHeading(text);

  for (var i = 0; i < stockData.length; i++) {
    text += await makeIndividualStockData(stockData[i]);
  }
  text += "\n</table>";

  return text;
};

export default makeStockDataTable;
