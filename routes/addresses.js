const express = require('express')
const router = express.Router()
const addressService = require('../services/address.service')

router.get('/', async (req, res) => {
  const addresses = await addressService.getAll()
  res.json({
    addresses,
    status: res.statusCode,
  })
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const domicilio = await addressService.getById(id)
  res.json(domicilio)
})


module.exports = router
