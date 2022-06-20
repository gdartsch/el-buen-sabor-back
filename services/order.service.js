const db = require('../db')

const getAll = async () => {
  return await db.connection
    .promise()
    .query('SELECT * FROM pedido')
    .then(([rows, fields]) => {
      return rows
    })
}

const getById = async (id) => {
  return await db.connection
    .promise()
    .query('SELECT * FROM pedido WHERE ID_PEDIDO = ?', [id])
    .then(([rows, fields]) => {
      return rows[0]
    })
}

const getByUser = async (userId) => {
  return await db.connection
    .promise()
    .query('SELECT * FROM pedido WHERE idUsuario = ?', [userId])
    .then(([rows, fields]) => {
      return rows
    })
}

const getByDate = async (fecha) => {
  return await db.connection
    .promise()
    .query('SELECT * FROM pedido WHERE Fecha = ?', [fecha])
    .then(([rows, fields]) => {
      return rows
    })
}

module.exports = {
  getAll,
  getById,
  getByUser,
  getByDate
}
