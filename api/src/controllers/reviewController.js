const { Review } = require('../db.js');


async function createReview(req, res) {
    const { comentario, calificacion } = req.body;
  
    try {
      // Crea una nueva reseña en la base de datos
      const review = await Review.create({
        comentario,
        calificacion,
      });
  
      res.status(201).json({ message: "Reseña creada exitosamente", review });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }

  
  async function getReviews(req, res) {
    try {
      // Obtén todas las reseñas de la base de datos
      const reviews = await Review.findAll();
  
      res.json({ reviews });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }
  

module.exports = { createReview, getReviews }