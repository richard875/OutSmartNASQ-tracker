const makeStockHeading = (text: string) => {
  text += "\n<tr>";
  text += "\n<th>Company</th>";
  text += "\n<th>Ticker</th>";
  text += "\n<th>Risk</th>";
  text += "\n<th><i>Invested%</i></th>";
  text += "\n<th>Exposure%</th>";
  text += "\n</tr>";

  return text;
};

export default makeStockHeading;
