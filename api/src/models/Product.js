const { DataTypes, Sequelize } = require("sequelize");

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
      dispoboleano: { 
        type: DataTypes.BOOLEAN, 
        allowNull: true 
      },
      borrador: { 
        type: DataTypes.BOOLEAN, 
        allowNull: true, 
        defaultValue: false 
      },
      calificacionproducto: {
        type: DataTypes.ARRAY(DataTypes.INTEGER) 
      },
      categoria: {
        type: DataTypes.STRING, 
        allowNull: true 
      },
      marca: {
        type: DataTypes.STRING, 
        allowNull: true 
      }
    });
  
    // Product.associate = (models) => {
    //   Product.belongsTo(models.Categoria, { foreignKey: 'categoriaId', allowNull: false });
    // };
  
    return Product;
  };