const db = require('../db')
const addressService = require('./address.service')

const getAll = async () => {
  return await db.connection
    .promise()
    .query('SELECT * FROM usuario')
    .then(([rows, fields]) => {
      return rows
    })
}

const insertUser = async (user, address, rol) => {
  const addressId = await addressService.insertAddress(address)
  const rolId = await db.connection
    .promise()
    .query('SELECT * FROM rol_usuario WHERE denominacion = ?', [rol])
    .then(([rows, fields]) => {
      return rows[0].id_rol_usuario
    })
  await db.connection.promise().query(
    `INSERT INTO usuario (nombres, apellidos, telefono, email, password, fk_id_domicilio, activo, fecha_modificacion, fk_id_rol_usuario)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      user.nombres,
      user.apellidos,
      user.telefono,
      user.email,
      user.password,
      addressId,
      user.activo,
      user.fecha_modificacion,
      rolId,
    ]
  )
}

const updateUser = async (user) => {
  await db.connection.promise().query(
    `UPDATE usuario SET nombres=?, apellidos=?, telefono=?, email=?, password=?, activo=?, fecha_modificacion=?
      WHERE id_usuario = ?`,
    [
      user.nombres,
      user.apellidos,
      user.telefono,
      user.email,
      user.password,
      user.activo,
      user.fecha_modificacion,
      user.id_usuario,
    ]
  )
}

const getById = async (id) => {
  return await db.connection
    .promise()
    .query('SELECT * FROM usuario WHERE id_usuario = ?', [id])
    .then(([rows, fields]) => {
      return rows[0]
    })
}

module.exports = {
  getAll,
  getById,
  insertUser,
}
