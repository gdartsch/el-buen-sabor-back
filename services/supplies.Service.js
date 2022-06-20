const db = require('../db')

const getAll = async () => {
  return await db.connection
    .promise()
    .query('SELECT * FROM articulo_insumo')
    .then(([rows, fields]) => {
      return rows
    })
}

const getById = async (id) => {
  return await db.connection
    .promise()
    .query('SELECT * FROM articulo_insumo WHERE ID_ARTICULO_INSUMO = ?', [id])
    .then(([rows, fields]) => {
      return rows[0]
    })
}

const insertArticulo = async (articulo) => {
  return await db.connection.promise().query(
    `INSERT INTO articulo_insumo (Denominacion, FK_ID_UNIDAD_DE_MEDIDA, StockActual, StockMinimo, CostoUnidad, Activo)
      VALUES (?, ?, ?, ?, ?, ?)`,
    [
      articulo.denominacion,
      articulo.idUnidadDeMedida,
      articulo.stockActual,
      articulo.stockMinimo,
      articulo.costoUnidad,
      articulo.activo
    ]
  )
}

const updateStock = async (datos) => {
  return await db.connection.promise().query(
    `UPDATE articulo_insumo SET StockActual=?, CostoUnidad=?
     WHERE ID_ARTICULO_INSUMO = ?`,
    [
      datos.stockActual,
      datos.costoUnidad,
      datos.id
    ]
  )
}

module.exports = {
    getAll,
    getById,
    insertArticulo,
    updateStock
  }
  