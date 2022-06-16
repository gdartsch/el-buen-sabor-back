const express = require('express')
const app = express()
const invoiceService = require('../services/invoiceService')
const db = require('../db')

app.get('/', async (req, res) => {
  const facturas = await invoiceService.getAll()
  res.json(facturas)
})
