import * as nodemailer from "nodemailer";
import LatestFiles from "../functions/latestFiles";
import GmailInformation from "../../data/static/gmailData";

const sendEmail = (
  makeData: string,
  isMarketOpen: boolean,
  emailHeading: string
) => {
  const nameToGet = new LatestFiles(isMarketOpen);

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
    subject: `(${emailHeading}) Stock Data as ${nameToGet.latestDataTime}`,
    html: makeData,
    attachments: [
      {
        filename: `(${emailHeading}) Data as ${nameToGet.latestDataTime}.html`,
        content: makeData,
        contentType: "text/plain",
      },
    ],
  };

  sendStockData.sendMail(mailOptions, (error: any, info: any) =>
    error ? console.log(error) : console.log("Email sent: " + info.response)
  );
};

export default sendEmail;
