const express = require('express')
const app = express()
require('dotenv').config()

app.use(express.json())

const productosRouter = require('./routes/products')
app.use('/productos', productosRouter)

const usersRouter = require('./routes/users')
app.use('/usuarios', usersRouter)

const ordersRouter = require('./routes/orders')
app.use('/pedidos', ordersRouter)

const addressesRouter = require('./routes/addresses')
app.use('/direcciones', addressesRouter)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
