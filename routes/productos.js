const express = require('express')
const router = express.Router()
const db = require('../db')
// router products
router.get('/', async (req, res) => {
  const productos = await db.connection
    .promise()
    .query('SELECT * FROM productomanufacturado')
    .then(([rows, fields]) => {
      res.json(rows)
    })
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
