const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Product = sequelize.define('product', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true 
      },
      nombreproducto: { 
        type: DataTypes.STRING, 
        allowNull: true 
      },
      descproducto: { 
        type: DataTypes.STRING, 
        allowNull: true 
      },
      colorproducto: { 
        type: DataTypes.ARRAY(DataTypes.STRING), 
        allowNull: true 
      },
      fotoprinc: { 
        type: DataTypes.STRING, 
        allowNull: true 
      },
      precioproducto: { 
        type: DataTypes.INTEGER, 
        allowNull: true 
      },
      disponibproducto: { 
        type: DataTypes.INTEGER, 
        allowNull: true 
      },
      fotosecund: {
        type: DataTypes.ARRAY(DataTypes.STRING), 
        allowNull: true, 
        defaultValue: [], 
      },
      borrador: { 
        type: DataTypes.BOOLEAN, 
        allowNull: true, 
        defaultValue: false 
      },
      calificacionproducto: {
        type: DataTypes.ARRAY(DataTypes.INTEGER)
      }
    });
  
    // Product.associate = (models) => {
    //   Product.belongsTo(models.Categoria, { foreignKey: 'categoriaId', allowNull: false });
    // };
  
    return Product;
  };