// Importar los módulos necesarios
const conexion = require("./conexion.js");

const ProductosDb = {};

// FUNCIONES PARA EL ADMINISTRADOR
ProductosDb.mostrarEnAdmin = function mostrarEnAdmin() {
  return new Promise((resolve, reject) => {
    conexion.query(
      "SELECT * FROM Productos WHERE Eliminado = 0",
      function (error, res, campos) {
        if (error) {
          reject(error);
        } else {
          resolve(res);
        }
      }
    );
  });
};


ProductosDb.agregarProducto = function agregarProducto(producto) {
  return new Promise((resolve, reject) => {
    var sqlConsulta = "INSERT INTO Productos SET ?";
    conexion.query(sqlConsulta, producto, function (err, res) {
      if (err) {
        console.log("Surgió un error: " + err.message);
        reject(err);
      } else {
        resolve({
          Marca: producto.Marca,
          Modelo: producto.Modelo,
          Capacidad: producto.Capacidad,
          Precio: producto.Precio,
          Cantidad: producto.Cantidad,
          Imagen: producto.Imagen,
          Estado: producto.Estado,
        });
      }
    });
  });
};

ProductosDb.actualizarProducto = function actualizarProducto(datoActualizar,columa, ID) {
  return new Promise((resolve, reject) => {
    var sqlConsulta = `UPDATE Productos SET ${columa} = ? WHERE ID = ?`;
    conexion.query(sqlConsulta, [datoActualizar, ID], function (err, res) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(`${columa} actualizad@ con exito`);
      }
    });
  });
};

ProductosDb.eliminarProducto = function eliminarProducto(ID) {
  return new Promise((resolve, reject) => {
    var sqlConsulta = "UPDATE Productos SET Eliminado = true WHERE ID = ?";
    conexion.query(sqlConsulta, [ID], function (err, res) {
      if (err) {
        console.log("Surgió un error: ", err);
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

ProductosDb.activarDesactivar = function activarDesactivar(ID) {
  return new Promise((resolve, reject) => {
    var sqlConsulta = "UPDATE Productos SET Estado = 1 - Estado WHERE ID = ?";
    conexion.query(sqlConsulta, [ID], function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

//

module.exports = ProductosDb; //ESTE SIEMPRE AL FINAL Y NO SE BORRA
