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
    `INSERT INTO producto_manufacturado (Denominacion, Imagen, MinutosEstimadosElaboracion, Descripcion, Activo)
      VALUES (?, ?, ?, ?, ?)`,
    [
      producto.denominacion,
      producto.imagen,
      producto.minutosEstimadosElaboracion,
      producto.descripcion,
      producto.activo,
    ]
  )
}

const getStock = async (id) => {
  return await db.connection
    .promise()
    .query(
      'select truncate( (select min(a.StockActual/r.CantidadArticulo) from articulo_insumo a '+
      'inner join producto__articulo r on a.ID_ARTICULO_INSUMO= r.FK_ID_ARTICULO_INSUMO '+
      'and r.FK_ID_PRODUCTO_MANUFACTURADO=?), 0) as MaximaProduccion',
      [id]
    )
    .then(([rows, fields]) => {
      return rows[0]
    })
}

const getIngredientes = async (id) => {
  return await db.connection
    .promise()
    .query(
      'select a.Denominacion, r.CantidadArticulo from articulo_insumo a'+
      ' inner join producto__articulo r on r.FK_ID_PRODUCTO_MANUFACTURADO = ?'+
      ' and r.FK_ID_ARTICULO_INSUMO = a.ID_ARTICULO_INSUMO',
      [id]
    )
    .then(([rows, fields]) => {
      return rows
    })
}

const getCosto = async (id) => {
  return await db.connection
    .promise()
    .query(
      'SELECT p.denominacion as Producto , sum(r.CantidadArticulo * a.CostoUnidad) as CostoProducto '+
      'from producto__articulo r '+ 
      'inner join articulo_insumo a '+
      'inner join producto_manufacturado p '+
      'on r.FK_ID_ARTICULO_INSUMO=a.ID_ARTICULO_INSUMO '+
      'and r.FK_ID_PRODUCTO_MANUFACTURADO = p.ID_PRODUCTO_MANUFACTURADO '+
      'where p.ID_PRODUCTO_MANUFACTURADO=?',
      [id]
    )
    .then(([rows, fields]) => {
      return rows[0]
    })
}

const getById = async (id) => {
  return await db.connection
    .promise()
    .query(
      'SELECT * FROM producto_manufacturado WHERE ID_PRODUCTO_MANUFACTURADO = ?',
      [id]
    )
    .then(([rows, fields]) => {
      return rows[0]
    })
}

const getByTerm = async (term) => {
  return await db.connection
    .promise()
    .query('SELECT * FROM productomanu_facturado WHERE Denominacion LIKE ?', [
      `%${term}%`,
    ])
    .then(([rows]) => {
      return rows
    })
}

const getByRubro = async (rubro) => {
  return await db.connection
    .promise()
    .query('SELECT * FROM producto_manufacturado WHERE rubroGeneral LIKE ?', [
      `%${rubro}%`,
    ])
    .then(([rows, fields]) => {
      return rows
    })
}

const updateProduct = async (datos) => {
  return await db.connection.promise().query(
    `UPDATE INTO producto_manufacturado denominacion=?, imagen=?, minutos_estimados_elaboracion=?, descripcion=?, activo=?
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

module.exports = {
  getAll,
  getById,
  insertProducto,
  getStock,
  getIngredientes,
  getCosto
}
