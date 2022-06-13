const express = require('express')
const router = express.Router()
const productService = require('../services/productService')
const db = require('../db')

router.get('/', async (req, res) => {
  /*const productos = await db.connection
    .promise()
    .query('SELECT * FROM productomanufacturado')
    .then(([rows, fields]) => {
      res.json(rows)
    })*/

  const productos = await productService.getAll()
  console.log(productos)
  res.json(productos)
})

router.get('/:id', (req, res) => {})

router.post('/', (req, res) => {
  res.send('Crear producto')
})

router.put('/:id', (req, res) => {
  res.send('Actualizar producto ' + req.params.id)
})

router.delete('/:id', (req, res) => {
  res.send('Eliminar producto ' + req.params.id)
})

module.exports = router
