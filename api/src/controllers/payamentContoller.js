const { CONNREFUSED } = require('dns');
const { User, Order } = require('../db.js');
const mercadopago = require('mercadopago');
require('dotenv').config();
const { GOOGLE_TOKEN, CLIENTID, CLIENT_SECRET } = process.env;

mercadopago.configure({
  client_id: CLIENTID,
  client_secret: CLIENT_SECRET,
});

const createPaymentPreference = async (req, res) => {
  const { description, price, quantity, usuario } = req.body;
  console.log(usuario)
  
  
  try {
   const user = await User.findOne({ where: { sub: usuario } });
  //console.log(user.dataValues.email)
  
    await new Promise((resolve, reject) => {
      
      let preference = {
        items: [
          {
            title: description,
            unit_price: Number(price),
            quantity: Number(quantity),
          },
        ],
        payer: {
          email: "test_user_200519321@testuser.com"
        },
        notification_url: "https://eb5d-191-82-50-102.ngrok.io/webhook",
        //external_reference: user.dataValues.toString(email), // Convertir el correo electrónico a una cadena
    // Asignar el correo electrónico del usuario
        back_urls: {
          success: "http://localhost:3000/Success",
          failure: "http://localhost:3000",
          pending: "",
        },
        auto_return: "approved",
      };

      mercadopago.preferences
        .create(preference)
        .then(function (response) {
          res.json(response.body);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};




 const receiveWebhook = async (req, res) => {
  try {
    const payment = req.query;
    console.log(payment);
    if (payment.topic === "merchant_order") {
      const data = await mercadopago.merchant_orders.findById(payment.id);
      console.log(data.response.items);

      const { title, quantity, unit_price } = data.response.items;


      // Create a new order in the database
      const newOrder = await Order.create({
        descripcion: title,
        quantity: quantity,
        totalPrice: unit_price,
      });

      console.log("New Order created:", newOrder.toJSON());
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Something goes wrong" });
  }
};

const sendMail = async (req, res) => {
  try {
    // Obtener el correo electrónico del usuario desde la referencia externa
    const correoUsuario = req.query.external_reference;
    
    //const orden = await Oc.findOne({ where: { loginuser: correoUsuario } });

    //if (orden) {
      // Actualizar el estado de la orden de compra a 'success'
      // orden.estadooc = 'Exitoso';
      // await orden.save();
      const fs = require('fs');
    const path = require('path');
    const nodemailer = require('nodemailer');
      // Enviar correo electrónico de confirmación al usuario
      const htmlFilePath = path.join(__dirname, '../html/mailpago.html');

      // Leer el contenido del archivo HTML
      const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'rocketparts8@gmail.com',
          pass: GOOGLE_TOKEN,
        },
      });

      const mailOptions = {
        from: 'rocketparts8@gmail.com',
        to: correoUsuario,
        subject: '¡Recibo de Compra!',
        html : htmlContent,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Correo electrónico enviado:', info.response);
        }
      });
    
  
    res.send('Pago exitoso');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPaymentPreference, receiveWebhook, sendMail };
