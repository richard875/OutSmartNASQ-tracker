const moment = require("moment-timezone");
import makeData from "../functions/makeFile";
import exportFile from "../helper/export";
import sendEmail from "../helper/sendEmail";
import MarketStatus from "../api/marketStatus";
import checkEmailStatus from "../helper/checkIfSendEmail";
import getRawStockAPI from "../api/getLiveData";

// init
const index = async () => {
  const currentMarketStatus = new MarketStatus();
  currentMarketStatus.toFetch();
  const isMarketOpen: boolean = currentMarketStatus.holidayStatus.marketOpen;
  const dataToExport: any = await makeData(isMarketOpen);

  let inDateRange = false;
  let currentTime = moment().tz("America/New_York");
  if (
    (currentTime.hour() == 9 && currentTime.minute() == 35) ||
    (currentTime.hour() == 16 && currentTime.minute() == 5)
  )
    inDateRange = true;

  if (checkEmailStatus.dataHasChanged || inDateRange || true) {
    let emailHeading = "";

    if (checkEmailStatus.dataHasChanged) emailHeading = "Data changed";
    if (inDateRange) emailHeading = "Daily email";
    if (checkEmailStatus.dataHasChanged && inDateRange)
      emailHeading = "Daily email and data changed";

    console.log(emailHeading);

    exportFile(dataToExport, isMarketOpen);
    sendEmail(dataToExport, isMarketOpen, emailHeading);

    // fetch again so data so it doesn't export / email in loop
    getRawStockAPI(true, isMarketOpen, currentMarketStatus.currentDateString);
  } else {
    console.log("Data has not changed");
  }
};

export default index;
