const express = require('express')
const router = express.Router()
const userService = require('../services/invoice.service')
const db = require('../db')

router.get('/', async (req, res) => {
  const facturas = await userService.getAll()
  res.json(facturas)
})

router.get('/:number', async (req, res) => {
  const id = req.params.number
  const factura = await userService.getByNumber(id)
  res.json(factura)
})

router.post('/', async (req, res) => {
  const factura = req.body
  const pedido = req.body.pedido
  const result = await userService.insertInvoice(factura, pedido)
  if (res.statusCode === 200) {
    res.json({
      message: 'Factura insertada correctamente',
      factura,
    })
  }
})

module.exports = router
