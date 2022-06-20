const express = require('express')
const app = express()
const router = express.Router()
const productService = require('../services/product.service')
const db = require('../db')
const bodyParser = require('body-parser')

router.get('/', async (req, res) => {
  const productos = await productService.getAll()
  res.json(productos)
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const producto = await productService.getById(id)
  res.json(producto)
})

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

router.put('/update', async (req,res)=> {
  const datos = req.body
  const result = await productService.updateProduct(datos)
  if(res.statusCode === 200) {
    res.json({
      message: 'Producto editado con exito',
      datos
    })
  } 
})

router.get('/:id/stock', async (req,res) => {
  const id = req.params.id
  const result = await productService.getStock(id)
  if(res.statusCode === 200) {
    res.json(result)
  } 
})

router.get('/:id/ingredientes', async (req,res) => {
  const id = req.params.id
  const result = await productService.getIngredientes(id)
  if(res.statusCode === 200) {
    res.json(result)
  } 
})

router.get('/:id/ventas', async (req,res) => {
  const id = req.params.id
  const result = await productService.getVentas(id)
  if(res.statusCode === 200) {
    res.json(result)
  } 
})

router.post('/:id/ingredientes', async (req,res) => {
  const id = req.params.id
  const datos = req.body
  const result = await productService.setIngredientes(id,datos)
  if(res.statusCode === 200) {
    res.json(message='ingredientes incorporados con exito')
  } 
})

router.put('/:id/addCarrito/:cantidad', async (req,res) => {
  const id = req.params.id
  const cantidad = req.params.cantidad
  const result = await productService.consumeIngredientes(id,cantidad)
  if(res.statusCode === 200) {
    res.json(message='se redujeron del stock '+cantidad+' unidades')
  } 
})

router.put('/:id/addCarrito', async (req,res) => {
  const id = req.params.id
  const cantidad = 1
  const result = await productService.consumeIngredientes(id,cantidad)
  if(res.statusCode === 200) {
    res.json(message='se redujeron del stock '+cantidad+' unidades')
  } 
})

router.put('/:id/removeCarrito/:cantidad', async (req,res) => {
  const id = req.params.id
  const cantidad = req.params.cantidad
  const result = await productService.recuperaIngredientes(id,cantidad)
  if(res.statusCode === 200) {
    res.json(message='se sumaron al stock '+cantidad+' unidades')
  } 
})

router.put('/:id/removeCarrito/', async (req,res) => {
  const id = req.params.id
  const cantidad = 1
  const result = await productService.recuperaIngredientes(id,cantidad)
  if(res.statusCode === 200) {
    res.json(message='se sumaron al stock '+cantidad+' unidades')
  } 
})

router.get('/:id/costo', async (req,res) => {
  const id = req.params.id
  const result = await productService.getCosto(id)
  if(res.statusCode === 200) {
    res.json(result)
  } 
})

router.put('/:id', (req, res) => {
  res.send('Actualizar producto ' + req.params.id)
})

router.delete('/:id', (req, res) => {
  res.send('Eliminar producto ' + req.params.id)
})

module.exports = router
