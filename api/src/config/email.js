const nodemailer = require("nodemailer");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const email = {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
};

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: email.user, // generated ethereal user
    pass: email.pass, // generated ethereal password
  },
});

const sendEmail = async (email, subject, html) => {
  try {

    await transporter.sendMail({
      from: `Canchera <${email.user}>`, // sender address
      to: email, // list of receivers
      subject, // Subject line
      text: "Gracias por ser parte de la comunidad canchera", // plain text body
      html,
    });
  } catch (error) {
    console.log(error);

  }

};

const getTemplate = (name, token) => {
  let url;
  if (config.use_env_variable) {
    url = "https://canchera.herokuapp.com";
  } else {
    url = "http://localhost:3001";
  }

  return `
      <div>
        <h1>Bienvenido a la comunidad de canchera ${name}</h1>
        <p>Para confirmar tu cuenta clickea  el enlace</p>
        <a href="${url}/confirm/${token}">Confirmar cuenta</a>
      </div>
      
      `;
};

module.exports = {
  sendEmail,
  getTemplate,
};
