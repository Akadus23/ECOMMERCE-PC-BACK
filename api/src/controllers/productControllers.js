const { Product } = require('../db.js');
const { Op } = require('sequelize');
//const db = require('./db');

async function getProducts(req, res) {
  try {
    const products = await Product.findAll();
    const totalProductos = products.length;
    res.json({
      totalProductos,
      productos: products,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
}


async function obtenerProductoPorId(req, res) {
  const { id } = req.params;

  try {
    const respuesta = await Product.findByPk(id);
    if (!respuesta) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    const {
      nombreproducto,
      descproducto,
      colorproducto,
      fotoprinc,
      precioproducto,
      disponibproducto,
      dispoboleano,
      borrador,
      calificacionproducto,
      categoria,
      marca
    } = respuesta;

    const producto = {
      id,
      nombreproducto,
      descproducto,
      colorproducto,
      fotoprinc,
      precioproducto,
      disponibproducto,
      dispoboleano,
      borrador,
      calificacionproducto,
      categoria,
      marca
    };

    res.json(producto);
    console.log(JSON.stringify(respuesta));
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el producto' });
  }
}

const crearProducto = async (req, res) => {
  try {
    const { id, nombreproducto,descproducto, fotoprinc, precioproducto, disponibproducto, dispoboleano, borrador, calificacionproducto, categoria, marca } = req.body;


    if (precioproducto <= 0) {
      return res.status(400).json({ error: 'precioproducto debe ser mayor a 0.' });
    }

    const newProduct = await Product.create({
      id, 
      nombreproducto,
      descproducto,
      fotoprinc, 
      precioproducto, 
      disponibproducto, 
      dispoboleano, 
      borrador, 
      calificacionproducto, 
      categoria, 
      marca
    });
    
    console.log(Object.keys(newProduct));
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error al crear un nuevo producto:', error);
    res.status(500).json({ error: 'Error al crear un nuevo producto' });
  }
};




const buscarProductos = async (req, res) => {
  try {
    const { prod, cate, marca, page, limit, minPrice, maxPrice } = req.query;
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const offset = (pageNumber - 1) * pageSize;
    const arrayCondiciones = [];
    let condicionCat = {};

    const orden = [];
    arrayCondiciones.push({ borrador: false });

    if (prod) {
      arrayCondiciones.push({ nombreproducto: { [Op.iLike]: `%${prod}%` } });
    }
    if (cate) {
      condicionCat = { categoria: { [Op.iLike]: `%${cate}%` } };
    }
    if (marca) {
      arrayCondiciones.push({ marca: { [Op.iLike]: `%${marca}%` } });
    }
    if (minPrice) {
      arrayCondiciones.push({ precioproducto: { [Op.gte]: parseFloat(minPrice) } });
    }
    if (maxPrice) {
      arrayCondiciones.push({ precioproducto: { [Op.lte]: parseFloat(maxPrice) } });
    }

    const { count, rows } = await Product.findAndCountAll({
      order: orden.length ? orden : [],
      where: { [Op.and]: arrayCondiciones, ...condicionCat },
      offset,
      limit: pageSize,
    });

    if (count === 0) {
      return res.json({
        message: 'No se encontraron los criterios de búsqueda especificados.',
      });
    }

    const totalPages = Math.ceil(count / pageSize);
    const arrayRespuesta = rows.map((producto) => {
      const {
        id,
        nombreproducto,
        descproducto,
        colorproducto,
        fotoprinc,
        precioproducto,
        disponibproducto,
        categoria,
        marca,
        calificacionproducto,
      } = producto;

      return {
        id,
        nombreproducto,
        descproducto,
        colorproducto,
        fotoprinc,
        precioproducto,
        disponibproducto,
        categoria,
        marca,
        calificacionproducto,
      };
    });

    res.json({
      totalProductos: count,
      totalPages,
      currentPage: pageNumber,
      pageSize,
      productos: arrayRespuesta,
    });
  } catch (error) {
    console.error('Error al buscar productos:', error);
    res.status(500).json({ error: 'Error al buscar productos' });
  }
};


const getProductsAvailable = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        dispoboleano: true,
      },
    });
    res.json(products);
  } catch (error) {
    console.error('Error al obtener los productos disponibles:', error);
    res.status(500).json({ error: 'Error al obtener los productos disponibles' });
  }
};

const getProductsUnavailable = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        dispoboleano: false,
      },
    });
    res.json(products);
  } catch (error) {
    console.error('Error al obtener los productos no disponibles:', error);
    res.status(500).json({ error: 'Error al obtener los productos no disponibles' });
  }
};


const editarProducto = async (req, res) => {
  const { id } = req.params;
  const { nombreproducto, descproducto, colorproducto, fotoprinc, precioproducto, disponibproducto, categoria, marca } = req.body;

  // Convert the id to an integer
  const productId = parseInt(id);

  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    // Update the product properties
    product.nombreproducto = nombreproducto;
    product.descproducto = descproducto;
    product.colorproducto = colorproducto;
    product.fotoprinc = fotoprinc;
    product.precioproducto = precioproducto;
    product.disponibproducto = disponibproducto;
    product.categoria = categoria;
    product.marca = marca;

    // Save the updated product to the database
    await product.save();

    res.json(product);
  } catch (error) {
    console.error('Error al editar el producto:', error);
    res.status(500).json({ mensaje: 'Error al editar el producto' });
  }
};




const restarDisponibproducto = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el producto existe en la base de datos
    const existingProduct = await Product.findByPk(id);
    if (!existingProduct) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    // Restar 1 a la propiedad dispoproducto
    existingProduct.disponibproducto = existingProduct.disponibproducto - 1;

    // Guardar los cambios en la base de datos
    await existingProduct.save();

    res.json(existingProduct);
  } catch (error) {
    console.error('Error al restar dispoproducto:', error);
    res.status(500).json({ error: 'Error al restar dispoproducto' });
  }
};




module.exports = {getProducts, obtenerProductoPorId, crearProducto, buscarProductos, getProductsAvailable, getProductsUnavailable, editarProducto, restarDisponibproducto}