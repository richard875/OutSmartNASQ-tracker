// import
const instruments: any = require("../../data/static/InstrumentID.json");

const getInstrument = (instrumentID: number) => {
  return instruments.InstrumentDisplayDatas.filter(
    (ele: any) => ele.InstrumentID === instrumentID
  );
};

export default getInstrument;
