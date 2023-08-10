const express = require('express');
const router = express.Router();
const {getProducts, obtenerProductoPorId, crearProducto, buscarProductos, getProductsAvailable, getProductsUnavailable, editarProducto, restarDisponibproducto } = require("../controllers/productControllers")
const {getUsers, obtenerUserPorId, crearUser, actualizarUser, obtenerUserPorSub} = require("../controllers/userControllers")
const { createPaymentPreference, receiveWebhook, sendMail } = require("../controllers/payamentContoller");
const { getOrder } = require('../controllers/orderController');
const { getReviews, createReview } = require('../controllers/reviewController');


router.get("/users" , getUsers)
router.get("/users/:sub" , obtenerUserPorSub)
router.post("/users", crearUser)
router.put('/users/:id', actualizarUser);

router.get("/products" , getProducts)
router.get("/products/:id" , obtenerProductoPorId)
router.post("/products", crearProducto)
router.get("/buscarProductos" , buscarProductos)
router.get("/disponible", getProductsAvailable)
router.get("/nodisponible", getProductsUnavailable)
router.put("/editarProducto/:id", editarProducto)
router.put("/restar/:id", restarDisponibproducto)

router.post('/create-order', createPaymentPreference);
router.post("/webhook", receiveWebhook);
router.get("/success", sendMail);

router.get("/ordenes" , getOrder)

router.get("/calificacion" , getReviews)
router.post("/calificacion" , createReview)

module.exports = router;