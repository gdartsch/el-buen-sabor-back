const db = require('../db')

const getAll = async () => {
  return await db.connection
    .promise()
    .query('SELECT * FROM productomanufacturado')
    .then(([rows, fields]) => {
      return rows
    })
}

module.exports = {
  getAll,
}
