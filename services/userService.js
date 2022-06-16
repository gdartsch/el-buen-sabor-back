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

module.exports = {
  getAll,
  getById,
}
