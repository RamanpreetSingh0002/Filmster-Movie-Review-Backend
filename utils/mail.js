const nodemailer = require("nodemailer");
const SibApiV3Sdk = require("sib-api-v3-sdk");

// generate OTP
exports.generateOTP = (otp_length = 6) => {
  let OTP = "";
  for (let i = 1; i <= otp_length; i++) {
    const randomVal = Math.round(Math.random() * 9);
    OTP += randomVal;
  }
  return OTP;
};

// connecting with mail transporter
exports.generateMailTransporter = () =>
  nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAIL_TRAP_USER,
      pass: process.env.MAIL_TRAP_PASS,
    },
  });

exports.sendEmail = async ({ name, email, subject, htmlContent }) => {
  const defaultClient = SibApiV3Sdk.ApiClient.instance;

  // Configure API key authorization: api-key
  const apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = process.env.SIB_API_KEY;

  // Uncomment below two lines to configure authorization using: partner-key
  // const partnerKey = defaultClient.authentications['partner-key'];
  // partnerKey.apiKey = 'YOUR API KEY';

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email

  sendSmtpEmail = {
    subject: subject,
    htmlContent: htmlContent,
    sender: {
      name: "Filmster Movie Review",
      email: process.env.OFFICIAL_EMAIL,
    },
    to: [
      {
        email: email,
        name: name,
      },
    ],
  };

  return await apiInstance.sendTransacEmail(sendSmtpEmail);
};
