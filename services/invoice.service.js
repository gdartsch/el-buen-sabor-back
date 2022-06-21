const db = require('../db')
const orderService = require('../services/order.service')

const getAll = () => {
  return db.connection
    .promise()
    .query('SELECT * FROM factura')
    .then(([rows]) => {
      return rows
    })
}

const getByNumber = (number) => {
  return db.connection
    .promise()
    .query('SELECT * FROM factura WHERE numero = ?', [number])
    .then(([rows]) => {
      return rows[0]
    })
}

const insertInvoice = async (invoice, pedido) => {
  const orderId = await orderService.insertOrder(pedido)
  return db.connection
    .promise()
    .query(
      `INSERT INTO factura (fecha, numero, montodescuento, fk_id_tipo_pago, TotalVenta, totalcosto, fk_id_pedido, activo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        invoice.fecha,
        invoice.numero,
        invoice.monto_descuento,
        invoice.forma_de_pago,
        invoice.total_venta,
        invoice.total_costo,
        orderId,
        invoice.activa,
      ]
    )
    .then(([rows]) => {
      return rows[0]
    })
}

const getGananciasFechas = async (fechaDesde, fechaHasta) => {
  return db.connection
    .promise()
    .query(
      `select sum(TotalVenta) from factura f where f.fecha between ? and ?`,
      [
        fechaDesde,
        fechaHasta
      ]
    )
}

module.exports = {
  getAll,
  getByNumber,
  insertInvoice,
  getGananciasFechas,
}
