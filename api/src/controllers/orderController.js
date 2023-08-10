const {  Order } = require('../db.js');

const getOrder = async (req, res) => {
    try {
        const users = await Order.findAll();
        return res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
};

module.exports = {getOrder}