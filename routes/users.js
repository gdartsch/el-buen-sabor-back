const express = require('express')
const router = express.Router()
const userService = require('../services/userService')
const db = require('../db')

router.get('/', async (req, res) => {
  const usuarios = await userService.getAll()
  res.json(usuarios)
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const usuario = await userService.getById(id)
  res.json(usuario)
})

module.exports = router
