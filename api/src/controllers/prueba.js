const axios = require('axios');

const { Oc, Detalleoc } = require('../db');

const { createPaymentPreference } = require('./payamentContoller');

const dummy1 = { "loginuser":"mcornejo375@gmail.com", "idoc":2 };

const postOCyDetalle = async (req, res) => {
  const { loginuser, hashvalidacionpago, estadooc, detalleocx } = req.body;
  let valortotaloc = 0;

  try {
    const fechahoraocaux = new Date();
    const fechahoraoc = fechahoraocaux.toISOString();

    // Calcular el valortotaloc sumando los subtotales
    for (let i = 0; i < detalleocx.length; i++) {
      const { valorunitario, cant } = detalleocx[i];
      const subtotal = valorunitario * cant; // Calcular el subtotal
      valortotaloc += subtotal; // Sumar el subtotal al valortotaloc
    }

    const newOC = await Oc.create({ fechahoraoc, loginuser, hashvalidacionpago, valortotaloc, estadooc });
    // Obtener el idoc generado para la OC recién insertada
    const idoc = newOC.idoc;

    // Insertar en la tabla "detalleoc" por cada objeto en "detalleocx"
    for (let i = 0; i < detalleocx.length; i++) {
      const { idproducto, nombreproducto, valorunitario, cant } = detalleocx[i];
      const subtotal = valorunitario * cant; // Calcular el subtotal

      await Detalleoc.create({ idoc, idproducto, nombreproducto, valorunitario, cant, subtotal });
    }
    
    console.log('newOC: ', newOC);
    console.log('idoc: ', newOC.idoc);

/** */
     const urlx = 'https://4102-191-82-44-7.ngrok.io/create-order';
     const bodyx = {
       loginuserparam: loginuser,
       idocparam: idoc
     };

    try{
    let response = await axios.post(urlx, bodyx);
    
    let URLPoint = "";
    URLPoint = response.data.init_point;
    console.log("RESPUESTA PAYMENTCONTROLLER:","FIN - PAYMENTCONTROLLER");
    console.log('URLPoint: ', URLPoint);
   algod =
   {
     orden: "Porfavor pague en el link:",
     URLo: URLPoint
   };
   console.log("TTTTTTT", "KKKKKKK");
//   return res.status(201).send({hola:"felipe", URL:"http://tuhermana"}); 

 return res.status(201).send( algod );   

    } catch (error) {
    console.error('Error en la solicitud POST: ', error);
    }

  
  } catch (error) {  return res.status(500).send({ error: 'Error en consulta' });  }
};
module.exports = { postOCyDetalle };


