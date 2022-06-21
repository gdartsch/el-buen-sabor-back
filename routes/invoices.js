const express = require('express')
const router = express.Router()
const invoiceService = require('../services/invoice.service')
const db = require('../db')

router.get('/', async (req, res) => {
  const facturas = await invoiceService.getAll()
  res.json(facturas)
})

router.get('/:number', async (req, res) => {
  const id = req.params.number
  const factura = await invoiceService.getByNumber(id)
  res.json(factura)
})

router.post('/', async (req, res) => {
  const factura = req.body
  const pedido = req.body.pedido
  const result = await invoiceService.insertInvoice(factura, pedido)
  if (res.statusCode === 200) {
    res.json({
      message: 'Factura insertada correctamente',
      factura,
    })
  }
})

router.get('/ganancias/:fechadesde/:fechahasta', async(req,res) => {
  const fechaDesde = req.params.fechadesde
  const fechaHasta = req.params.fechahasta
  const result = await invoiceService.getGananciasFechas(fechaDesde, fechaHasta)
  if (res.statusCode === 200) {
    res.json({
      message: 'Factura insertada correctamente',
      factura,
    })
  }
})

module.exports = router
