const express = require('express')
const router = express.Router()
const mysql = require('mysql2')
// router products
router.get('/', async (req, res) => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })
  const productos = await connection
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
