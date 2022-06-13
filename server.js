const express = require('express')
const app = express()
require('dotenv').config()

app.use(express.json())

const productosRouter = require('./routes/productos')
app.use('/productos', productosRouter)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
