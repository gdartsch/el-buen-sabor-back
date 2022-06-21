const db = require('../db')

const getAll = async () => {
  return await db.connection
    .promise()
    .query('SELECT * FROM pedido')
    .then(([rows, fields]) => {
      return rows
    })
}

const insertOrder = async (pedido) => {
  await db.connection
    .promise()
    .query(
      `INSERT INTO pedido (fecha, numero, fk_id_estado, hora_estimada_fin, es_delivery, total, fk_id_domicilio, fk_id_usuario, activo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        pedido.fecha,
        pedido.numero,
        pedido.fk_id_estado,
        pedido.hora_estimada_fin,
        pedido.es_delivery,
        pedido.total,
        pedido.fk_id_domicilio,
        pedido.fk_id_usuario,
        pedido.activo,
      ]
    )
  return await db.connection
    .promise()
    .query('SELECT LAST_INSERT_ID() AS id')
    .then(([rows, fields]) => {
      return rows[0].id
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
    .query('SELECT * FROM pedido WHERE FK_ID_USUARIO = ?', [userId])
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
  getByDate,
  insertOrder,
}
