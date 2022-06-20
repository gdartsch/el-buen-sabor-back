const db = require('../db')

const getAll = async () => {
  return await db.connection
    .promise()
    .query('SELECT * FROM domicilio')
    .then(([rows, fields]) => {
      return rows
    })
}

const insertAddress = async (address) => {
  await db.connection.promise().query(
    `INSERT INTO domicilio (calle, numero, localidad, geolocalizacion, activo)
                        VALUES (?, ?, ?, ?, ?)`,
    [
      address.calle,
      address.numero,
      address.localidad,
      address.geolocalizacion,
      address.activo,
    ]
  )
  return await db.connection
    .promise()
    .query('SELECT LAST_INSERT_ID() AS id')
    .then(([rows, fields]) => {
      return rows[0].id
    })
}

module.exports = {
  getAll,
  insertAddress,
}
