import getRawStockAPI from "../api/getLiveData";
import makeData from "../functions/makeFile";
import exportFile from "../helper/export";
import sendEmail from "../helper/sendEmail";

// init
const index = async () => {
  const dataToExport = await makeData();
  exportFile(dataToExport);
  sendEmail(dataToExport);
};

export default index;
