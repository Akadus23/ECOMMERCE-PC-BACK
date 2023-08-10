const { Order } = require('../db.js');

const getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        return res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
};

const obtenerOrderPorId = async (req, res) => {
  const id = req.params.id;
  try{
      const order = await Order.findByPk(id);
      if (order) {
          res.json(order);
      } 
      else{Order
          res.status(404).json({error: "Order not found"})
      }
  }catch(error){
      res.status(500).json({ message: error.message });
  }
}

module.exports = { getOrders, obtenerOrderPorId };
