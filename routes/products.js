const express = require('express')
const app = express()
const router = express.Router()
const productService = require('../services/product.service')
const db = require('../db')
const bodyParser = require('body-parser')

router.get('/', async (req, res) => {
  const productos = await productService.getAll()
  res.json()
})

router.get('/:id', (req, res) => {})

router.get('/:term', (req, res) => {})

// Insert producto POST
router.post('/', async (req, res) => {
  const producto = req.body
  const result = await productService.insertProducto(producto)
  if (res.statusCode === 200) {
    res.json({
      message: 'Producto insertado correctamente',
      producto,
    })
  }
})

router.put('/:id', (req, res) => {
  res.send('Actualizar producto ' + req.params.id)
})

router.delete('/:id', (req, res) => {
  res.send('Eliminar producto ' + req.params.id)
})

module.exports = router
