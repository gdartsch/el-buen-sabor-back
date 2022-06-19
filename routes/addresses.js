const express = require('express')
const router = express.Router()
const addressService = require('../services/address.service')

router.get('/', async (req, res) => {
  const addresses = await addressService.getAll
  res.json({
    addresses,
    status: res.statusCode,
  })
})

module.exports = router
