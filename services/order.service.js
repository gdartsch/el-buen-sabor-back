const db = require('../db')

const getAll = async () => {
  return await db.connection
    .promise()
    .query('SELECT * FROM pedido')
    .then(([rows, fields]) => {
      return rows
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

const insertOrder = async (datos) => {
  await db.connection
    .promise()
    .query('call crearPedido(?,?,?,?)', 
    [datos.idUsuario, 
     datos.numero,
     datos.delivery,
     datos.domicilio
    ])
    
  const idpedido = await db.connection
    .promise()
    .query('SELECT LAST_INSERT_ID() AS id')
    .then(([rows, fields]) => {
      return rows[0].id
    })
  
  const detalles = datos.detalles
    
  setProductos(idpedido,detalles)
}


const setProductos = async (id, detalles) => {
  detalles.forEach(async (producto) => {
    return await db.connection
      .promise()
      .query(
        'insert into detalle_pedido (fk_id_pedido, fk_id_producto, cantidad) values (?, ?, ?)',
        [id, producto.idProducto, producto.cantidad]
      )
  })
}


module.exports = {
  getAll,
  getById,
  getByUser,
  getByDate,
  insertOrder
}
