const db = require('../db')

const getAll = async () => {
  return await db.connection
    .promise()
    .query('SELECT * FROM usuario')
    .then(([rows, fields]) => {
      return rows
    })
}

const insertUser = async (user) => {
  return await db.connection
    .promise()
    .query(
      `INSERT INTO usuario (nombres, apellidos, telefono, email, fk_id_domicilio, activo, fecha_modificacion, fk_id_rol_usuario') VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.nombres,
        user.apellidos,
        user.telefono,
        user.email,
        user.fk_id_domicilio,
        user.activo,
        user.fecha_modificacion,
        user.fk_id_rol_usuario,
      ]
    )
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
