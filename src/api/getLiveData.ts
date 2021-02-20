import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";

const getRawStockAPI = async (
  ifFetch: boolean,
  isMarketOpen: boolean,
  fileName: string
) => {
  const outputLocation: string = isMarketOpen ? "marketOpen" : "marketClosed";
  const outputName: string = isMarketOpen
    ? `rawMarketOpen_${fileName}.json`
    : `rawMarketClosed_${fileName}.json`;

  if (ifFetch) {
    const response = await fetch(
      `https://www.etoro.com/sapi/userstats/risk/UserName/OutSmartNSDQ/Contribution?client_request_id=${uuidv4()}`
    );
    const rawStockAPI = await response.text();

    fs.writeFile(
      `./data/json/${outputLocation}/${outputName}`,
      rawStockAPI,
      (err: any) => {
        if (err) console.log(err);
      }
    );

    console.log(rawStockAPI);
  }
};

export default getRawStockAPI;
