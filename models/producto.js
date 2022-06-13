class Producto {
  constructor(
    id,
    idRubro,
    denominacion,
    imagen,
    tiempoCocina,
    receta,
    descripcion
  ) {
    this.id = id
    this.idRubro = idRubro
    this.denominacion = denominacion
    this.imagen = imagen
    this.tiempoCocina = tiempoCocina
    this.receta = receta
    this.descripcion = descripcion
  }
}

module.exports = Producto
