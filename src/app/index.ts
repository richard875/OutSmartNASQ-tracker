import getRawStockAPI from "../api/getLiveData";
import makeData from "../functions/makeFile";
import exportFile from "../helper/export";
import sendEmail from "../helper/sendEmail";

// init
const index = () => {
  const dataToExport: string = makeData();
  exportFile(dataToExport);
  sendEmail(dataToExport);
};

export default index;
