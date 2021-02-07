import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";

//#region helper
let currentDateAndTime = () => {
  let current = new Date();
  return `${("0" + (current.getMonth() + 1)).slice(-2)}_${(
    "0" + current.getDate()
  ).slice(-2)}_${current.getFullYear()}_${("0" + current.getHours()).slice(
    -2
  )}:${("0" + current.getMinutes()).slice(-2)}:${(
    "0" + current.getSeconds()
  ).slice(-2)}`;
};
//#endregion

//#region import data
async function getRawStockAPI() {
  const outputName: string = `raw_${currentDateAndTime()}.json`;
  const response = await fetch(
    `https://www.etoro.com/sapi/userstats/risk/UserName/OutSmartNSDQ/Contribution?client_request_id=${uuidv4()}`
  );
  const rawStockAPI = await response.text();

  fs.writeFile(`./data/json/${outputName}`, rawStockAPI, (err: any) => {
    if (err) return console.log(err);
  });
  console.log(rawStockAPI);
}
//#endregion

// export
export default getRawStockAPI;
