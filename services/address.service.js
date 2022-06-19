const db = require('../db')

const getAll = async () => {
  return await db.connection
    .promise()
    .query('SELECT * FROM domicilio')
    .then(([rows, fields]) => {
      return rows
    })
}

const insertDomicilio = async (domicilio) => {
  return await db.connection
    .promise()
    .query(
      'INSERT INTO domicilio (calle, numero, localidad, geolocalizacion, activo) VALUES (?, ?, ?, ?, ?)',
      [
        domicilio.calle,
        domicilio.numero,
        domicilio.localidad,
        domicilio.geolocalizacion,
        domicilio.activo,
      ]
    )
}

module.exports = {
  getAll,
}
