import getRawStockAPI from "./getLiveData";
import MarketStatus from "./marketStatus";

// init
const currentMarketStatus = new MarketStatus();

getRawStockAPI(
  currentMarketStatus.toFetch(),
  currentMarketStatus.holidayStatus.marketOpen,
  currentMarketStatus.currentDateString
);

import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";

const test = async () => {
  const response = await fetch(
    "https://www.etoro.com/sapi/userstats/risk/UserName/OutSmartNSDQ/Contribution?client_request_id=56580be7-4dcf-4e2c-8964-c3eced0725bb"
  );
  const rawStockAPI = await response.text();

  console.log(rawStockAPI);
};

test();
