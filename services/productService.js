const db = require('../db')

const getAll = async () => {
  return await db.connection
    .promise()
    .query('SELECT * FROM productomanufacturado')
    .then(([rows, fields]) => {
      return rows
    })
}

const getById = async (id) => {
  return await db.connection
    .promise()
    .query(
      'SELECT * FROM productomanufacturado WHERE idProductoManufacturado = ?',
      [id]
    )
    .then(([rows, fields]) => {
      return rows[0]
    })
}

const getByTerm = async (term) => {
  return await db.connection
    .promise()
    .query('SELECT * FROM productomanufacturado WHERE denominacion LIKE ?', [
      `%${term}%`,
    ])
    .then(([rows]) => {
      return rows
    })
}

const getByRubro = async (rubro) => {
  return await db.connection
    .promise()
    .query('SELECT * FROM productomanufacturado WHERE rubroGeneral LIKE ?', [
      `%${rubro}%`,
    ])
    .then(([rows, fields]) => {
      return rows
    })
}

module.exports = {
  getAll,
}
