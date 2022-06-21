const express = require('express')
const router = express.Router()
const orderService = require('../services/order.service')
const db = require('../db')

router.get('/', async (req, res) => {
  const ordenes = await orderService.getAll()
  res.json(ordenes)
})

router.post('/', async (req, res) => {
  const orden = req.body
  const result = await orderService.insertOrder(orden)
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const orden = await orderService.getById(id)
  res.json(orden)
})

router.get('/user/:id', async (req, res) => {
  const id = req.params.id
  const ordenes = await orderService.getByUser(id)
  res.json(ordenes)
})

router.get('/date/:fecha', async (req, res)=>{
  const fecha = req.params.fecha
  const ordenes = await orderService.getByDate(fecha)
  res.json(ordenes)
})

module.exports = router
