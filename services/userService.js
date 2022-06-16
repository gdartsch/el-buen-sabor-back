const db = require('../db')

const getAll = async () => {
  return await db.connection
    .promise()
    .query('SELECT * FROM usuario')
    .then(([rows, fields]) => {
      return rows
    })
}

const getById = async (id) => {
  return await db.connection
    .promise()
    .query('SELECT * FROM usuario WHERE idUsuario = ?', [id])
    .then(([rows, fields]) => {
      return rows[0]
    })
}

const getOrdersByUser = async (userId) => {
  return await db.connection
    .promise()
    .query('SELECT * FROM pedido WHERE idUsuario = ?', [userId])
    .then(([rows, fields]) => {
      return rows
    })
  }

module.exports = {
  getAll,
  getById,
}
