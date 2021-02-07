import * as nodemailer from "nodemailer";
import LatestFiles from "../functions/latestFiles";
import GmailInformation from "../../data/static/gmailData";

const sendEmail = (makeData: string) => {
  let sendStockData = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GmailInformation.emailAddress,
      pass: GmailInformation.emailPassword,
    },
  });

  let mailOptions = {
    from: GmailInformation.emailAddress,
    to: "richard_875@me.com",
    subject: `Stock Data as ${LatestFiles.latestDataTime}`,
    html: makeData,
    attachments: [
      {
        filename: `Data as ${LatestFiles.latestDataTime}.html`,
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
