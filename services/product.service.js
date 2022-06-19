const db = require('../db')

const getAll = async () => {
  return await db.connection
    .promise()
    .query('SELECT * FROM producto_manufacturado')
    .then(([rows, fields]) => {
      return rows
    })
}

const insertProducto = async (producto) => {
  return await db.connection.promise().query(
    `INSERT INTO producto_manufacturado (denominacion, imagen, minutos_estimados_elaboracion, descripcion, activo)
      VALUES (?, ?, ?, ?, ?)`,
    [
      producto.denominacion,
      producto.imagen,
      producto.minutos_estimados_elaboracion,
      producto.descripcion,
      producto.activo,
    ]
  )
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
  insertProducto,
}
