const {DataTypes} = require ('sequelize');

module.exports = (sequelize) => {
    sequelize.define("review", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true ,
        },
        comentario: {
            type: DataTypes.STRING,
            
        },
        calificacion: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
        },
    })
}