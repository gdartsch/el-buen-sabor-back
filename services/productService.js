const connection = require('../db')

const getAll = async (req, res) => {
  const productos = await connection.query('SELECT * FROM productos')
  console.log(productos)
  res.json(productos)
}

module.exports = {
  getAll,
}
