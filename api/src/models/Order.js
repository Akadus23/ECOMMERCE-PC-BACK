const {DataTypes} = require ('sequelize');

module.exports = (sequelize) => {
    sequelize.define("order", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        descripcion: {
            type: DataTypes.STRING,
            
        },
        quantity: {
            type: DataTypes.INTEGER,
           
        },
        totalPrice: {
            type: DataTypes.INTEGER,
            
        },
    })
}