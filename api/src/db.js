require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_HOST,DB_NAME,DB_PASSWORD } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

// let sequelize =
//   process.env.NODE_ENV === "production"
//     ? new Sequelize({
//       database: DB_NAME,
//       dialect: "postgres",
//       host: DB_HOST,
//       port: DB_PORT,
//       username: DB_USER,
      
//       pool: {
//         max: 3,
//         min: 1,
//         idle: 10000,
//       },
//       dialectOptions: {
//         ssl: {
//           require: true,
//           // Ref.: https://github.com/brianc/node-postgres/issues/2009
//           rejectUnauthorized: false,
//         },
//         keepAlive: true,
//       },
//       ssl: true,
//     })
//     : new Sequelize(
      
//       { logging: false, native: false }
//     );

 const basename = path.basename(__filename);
 const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

 modelDefiners.forEach(model => model(sequelize));

  let entries = Object.entries(sequelize.models);
  let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
  
  //Define las relaciones entre los modelos
  sequelize.models = Object.fromEntries(capsEntries);
  
    const {  User, Product, Order, Review } = sequelize.models;
  
  User.belongsToMany(Product, { through: 'user_product' })
  Product.belongsToMany(User, {through: 'user_product'})

  User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Product.hasMany(Review, { foreignKey: 'productId', as: 'reviews' });
Review.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
  
// Oc.hasMany(Detalleoc, {
//   foreignKey: 'idoc',
// });
// Detalleoc.belongsTo(Oc, {
//   foreignKey: 'idoc',
// });
    
// //Sincroniza los modelos con la base de datos y establece las relaciones
// sequelize.sync({ force: false })
//   .then(() => {
//     console.log('Tablas sincronizadas correctamente');
//     //initializeRelations();
//     // Aquí puedes continuar con el resto de tu lógica de la aplicación
//   })
//   .catch(error => {
//     console.error('Error al sincronizar las tablas:', error);
//   });

module.exports = {...sequelize.models, conn: sequelize, sequelize};