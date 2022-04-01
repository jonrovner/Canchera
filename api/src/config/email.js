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
  if (process.env.NODE_ENV) {
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

const sendEmailPassword = async (email, subject, html) => {
  try {
    await transporter.sendMail({
      from: `Canchera <${email.user}>`, // sender address
      to: email, // list of receivers
      subject, // Subject line
      text: "Gracias por seguir confiando en Canchera", // plain text body
      html,
    });
  } catch (error) {
    console.log(error);
  }
};

const getTemplatePassword = (name, token) => {
  let url;
  if (process.env.NODE_ENV) {
    url = "https://canchera.vercel.app";
  } else {
    url = "http://localhost:3000";
  }

  return `
  <div>
    <h1>${name} es su dia de suerte</h1>
    <p>a solicitado un restablecimiento de contraseña para su cuenta de Heroku. Siga el siguiente enlace para establecer una nueva contraseña:</p>
    <a href="${url}/resetpassword/${token}">${url}</a>
  </div>
  
  `;
};

const sendEmailBooking = async (email, subject, html) => {
  try {
    await transporter.sendMail({
      from: `Canchera <${email.user}>`, // sender address
      to: email, // list of receivers
      subject, // Subject line
      text: "Gracias por seguir confiando en Canchera", // plain text body
      html,
    });
  } catch (error) {
    console.log(error);
  }
};

const getTemplateBooking = (name, times, club) => {
  
  return `
  <div style="font-weight:bold">
    <h1>${name} realizaste una reserva!!</h1>
    <hr>
    <h3 style="font-size:24px><span style="color:"blue"">${club} </span> te espera</h3>
    <img src="http://canchera.herokuapp.com/images/club-default.jpg" style="border:"3px solid blue"; width="45%">
    <p style="font-size:24px; font-weight:bold">Tu reserva ${times}</p> 
  </div>
  
  `;
};

const sendEmailInvitation = async (email, subject, html) => {
  try {
    await transporter.sendMail({
      from: `Canchera <${email.user}>`, // sender address
      to: email, // list of receivers
      subject, // Subject line
      text: "Gracias por seguir confiando en Canchera", // plain text body
      html,
    });
  } catch (error) {
    console.log(error);
  }
};

const getTemplateInvitation = (name, times, club) => {

  let url;
  if (process.env.NODE_ENV) {
    url = "https://canchera.vercel.app";
  } else {
    url = "http://localhost:3000";
  }  
  
  return `
  <div style="font-weight:bold">
    <h1>${name} te invito a jugar en el Club ${club} !!</h1>
    <hr>
    <img src="http://canchera.herokuapp.com/images/club-default.jpg" style="border:"3px solid blue"; width="45%">
    <p style="font-size:24px; font-weight:bold">Reservas:${times} </p>
    <hr>
    <p style="font-size:20px; font-weight:bold"> Se parte de la comunidad de Canchera</p>
    <a href="${url}/signup/user">Se parte de Canchera</a>
    
  </div>
  
  `;
};

module.exports = {
  sendEmail,
  getTemplate,
  sendEmailPassword,
  getTemplatePassword,
  sendEmailBooking,
  getTemplateBooking,
  sendEmailInvitation,
  getTemplateInvitation
};
