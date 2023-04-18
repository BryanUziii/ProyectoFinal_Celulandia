// Importar el módulo body-parser y el framework Express
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const fs = require("fs");

// Crear una instancia de Router
const router = express.Router();

const ProductosDb = require("../models/productos.js");

// Configuración de Multer para guardar las imagenes en el proyecto
const multer = require("multer");
const { type } = require("express/lib/response.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/uploads/");
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split(".").pop();
    const nombreArchivo =
      req.body.Marca + req.body.Modelo.replace(/\s+/g, "-") + "." + extension;
    cb(null, nombreArchivo);
  },
});
const upload = multer({ storage: storage });

//RUTAS PARA RENDERIZAR LOS HTML
//Para el index
router.get("/", async (req, res) => {
 res.render("index.html");
});

//Para el administrador
router.get("/admin", async (req, res) => {
  res.render("administrador.html");
});



//METODOS PARA ADMINISTRADOR
router.get("/mostrarProductosAdmin", async (req, res) => {
  try {
    resultado = await ProductosDb.mostrarEnAdmin();
    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al cargar la lista de productos.");
  }
});

router.post("/agregarProducto", upload.single("imagen"), function (req, res) {
  const ArchivoImagen = req.file.filename;
  const Imagen = "/img/uploads/" + ArchivoImagen;

  const producto = {
    Marca: req.body.Marca,
    Modelo: req.body.Modelo,
    Capacidad: req.body.Capacidad,
    Precio: req.body.Precio,
    Cantidad: req.body.Cantidad,
    Imagen: Imagen,
    Estado: 0,
  };

  try {
    ProductosDb.agregarProducto(producto)
      .then((resultado) => {
        res.send(`<html><head><title>Respuesta del servidor</title></head><body>
                  <h3>El Producto Se Agrego Correctamente</h3>
        <script>
            setTimeout(function() {
              window.close();
            }, 1500);
          </script>
        </body></html>`);
      })
      .catch((error) => {
        res.status(500).send("Error al agregar el producto");
      });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al activar o desactivar el producto.");
  }
});

router.post("/actualizarProducto", async (req, res) => {
  const datoActualizar = req.body.datoActualizar;
  const columa = req.body.columa;
  const IDActualizar = req.body.IDActualizar;

;

  try {
    ProductosDb.actualizarProducto(datoActualizar, columa, IDActualizar).then(
      (resultado) => {
        res.json(resultado);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar el producto.");
  }
});

router.post("/eliminarProducto", (req, res) => {
  const id = req.body.IdEliminar;

  ProductosDb.eliminarProducto(id)
    .then((resultado) => {
      res.send(`<html><head><title>Respuesta del servidor</title></head><body>
        <script>
            setTimeout(function() {
              window.close();
            }, 1);
          </script>
        </body></html>`);
    })
    .catch((error) => {
      res.status(500).send("Error al eliminar el producto");
    });
});

router.post("/activarDesactivar", async (req, res) => {
  const ID = req.body.idActivarDesactivar;
  try {
    const resultado = await ProductosDb.activarDesactivar(ID);
    res.send(`<html><head><title>Respuesta del servidor</title></head><body>
        <script>
            setTimeout(function() {
              window.close();
            }, 1);
          </script>
        </body></html>`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al activar o desactivar el producto.");
  }
});

//


// Exportar el módulo Router para que pueda ser utilizado en otros archivos
module.exports = router;//ESTE SIEMPRE AL FINAL Y NO SE BORRA
