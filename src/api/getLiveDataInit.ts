import getRawStockAPI from "./getLiveData";
import MarketStatus from "./marketStatus";

// init
const currentMarketStatus = new MarketStatus();

getRawStockAPI(
  currentMarketStatus.toFetch(),
  currentMarketStatus.holidayStatus.marketOpen,
  currentMarketStatus.currentDateString
);
