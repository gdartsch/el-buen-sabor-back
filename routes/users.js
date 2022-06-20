const express = require('express')
const router = express.Router()
const userService = require('../services/user.service')
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

router.post('/insert', async (req, res) => {
  const usuario = req.body
  const address = req.body.address
  const rol = req.body.rol
  const result = await userService.insertUser(usuario, address, rol)
  if (res.statusCode === 200) {
    res.json({
      message: 'Usuario insertado correctamente',
      usuario,
    })
  }
})

module.exports = router
