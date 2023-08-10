const nodemailer = require('nodemailer');
const GOOGLE_TOKEN = process.env.GOOGLE_TOKEN
// Configurar el transporte para el envío de correos electrónicos
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rocketparts8@gmail.com',
    pass: GOOGLE_TOKEN,
  },
});

// Obtener la instancia del transporter para usarla en otras partes del código
module.exports = transporter;