const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const sendEmail = async (mailPayload) => {
  const mailOptions = {
    from: "sonamk18@navgurukul.org",
    subject: "Kreatorverse Vender Dashboard Login Credential",
    ...mailPayload
  };
  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "sonamk18@navgurukul.org",
        pass: "sonam@navgurukul",
      },
    })
  );

  //delivery
  return await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
