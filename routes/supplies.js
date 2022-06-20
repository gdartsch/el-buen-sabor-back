const express = require('express')
const router = express.Router()
const suppliesService = require('../services/supplies.Service')

router.get('/', async (req, res) => {
  const articulos = await suppliesService.getAll()
  res.json(articulos)
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const artiuclo = await suppliesService.getById(id)
  res.json(articulo)
})

router.post('/insert', async (req, res) => {
  const articulo = req.body
  const result = await suppliesService.insertArticulo(articulo)
  if (res.statusCode === 200) {
    res.json({
      message: 'Articulo insertado correctamente',
      articulo
    })
  }
})

router.put('/edit', async (req,res)=> {
  const datos = req.body
  const result = await suppliesService.updateStock(datos)
  if(res.statusCode === 200) {
    res.json({
      message: 'Articulo editado con exito',
      datos
    })
  } 
})


module.exports = router
