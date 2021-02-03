let instruments = require("./InstrumentID.json");
let stockData = require("./dynamicData.json");

// helper
let getInstrument = (instrumentID) => {
  return instruments.InstrumentDisplayDatas.filter(
    (ele) => ele.InstrumentID === instrumentID
  );
};

console.log(
  stockData.AggregatedPositions.map(
    (x) => getInstrument(x.InstrumentID)[0].InstrumentDisplayName
  )
);
