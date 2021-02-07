import makeStockHeading from "./makeStockHeading";
import makeIndividualStockData from "./makeIndividualStockData";

let makeStockDataTable = (text: string, stockData: any) => {
  text += "\n<table style='width: 100%;'>";
  text = makeStockHeading(text);
  stockData.map((stock: any) => {
    text = makeIndividualStockData(text, stock);
  });
  text += "\n</table>";
  return text;
};

export default makeStockDataTable;
