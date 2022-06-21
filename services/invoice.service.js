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
      `INSERT INTO factura (fecha, numero, monto_descuento, forma_de_pago, total_venta, total_costo, fk_id_pedido, activa) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
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

module.exports = {
  getAll,
  getByNumber,
  insertInvoice,
}
