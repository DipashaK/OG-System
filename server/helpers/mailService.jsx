const nodemailer = require("nodemailer");
const crd = require("../config/crd");

exports.sendGreetMail = (email) => {
  const mail = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: crd.user, pass: crd.pass },
  });

  mail.sendMail({
    from: "crd.user",
    to: email,
    subject: "Account created Successfully",
    html: "",
  }, (err) =>{
    // if(err) throw err
    console.log(err);
    return true;
  });
  return true
};
