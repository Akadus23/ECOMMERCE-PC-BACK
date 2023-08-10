const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const PORT = process.env.PORT || 3001;

// Para registrar info que entra
server.use((req, res, next) => {
  console.log("Recibiendo solicitud:", req.body);
  next();
})
// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is listening on port ${PORT}`);
  });
  
});    