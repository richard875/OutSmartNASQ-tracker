import * as nodemailer from "nodemailer";
import LatestFiles from "../functions/latestFiles";
import GmailInformation from "../../data/static/gmailData";
import checkEmailStatus from "./checkIfSendEmail";

const sendEmail = (makeData: string) => {
  let inDateRange = false;
  let currentTime = new Date();
  if (currentTime.getMinutes() == 1) inDateRange = true;

  if (checkEmailStatus.dataHasChanged || inDateRange) {
    let emailHeading = "";

    if (checkEmailStatus.dataHasChanged) emailHeading = "Data changed";
    if (inDateRange) emailHeading = "Hourly email";
    if (checkEmailStatus.dataHasChanged && inDateRange)
      emailHeading = "Hourly email and data changed";

    console.log(emailHeading);

    let sendStockData = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GmailInformation.emailAddress,
        pass: GmailInformation.emailPassword,
      },
    });

    let mailOptions = {
      from: GmailInformation.emailAddress,
      to: GmailInformation.sendToEmail,
      subject: `(${emailHeading}) Stock Data as ${LatestFiles.latestDataTime}`,
      html: makeData,
      attachments: [
        {
          filename: `(${emailHeading}) Data as ${LatestFiles.latestDataTime}.html`,
          content: makeData,
          contentType: "text/plain",
        },
      ],
    };

    sendStockData.sendMail(mailOptions, (error: any, info: any) =>
      error ? console.log(error) : console.log("Email sent: " + info.response)
    );
  } else {
    console.log("Data has not changed");
  }
};

export default sendEmail;
