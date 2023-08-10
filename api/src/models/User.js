const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true,
      unique: true,
      //primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rol: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    fechaNacimiento: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    direccion:{
      type:DataTypes.STRING,
      allowNull: true,
    },
    telefono:{
      type:DataTypes.STRING,
      allowNull:true,
    },
    sub: {
      type: DataTypes.STRING,
      primaryKey: true,

    },
  });
  


  return User;
};