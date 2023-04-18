// Importar los módulos necesarios ucademy
const http = require("http");
const express = require("express");
const bodyparser = require("body-parser");
const fs = require("fs");
const cors = require("cors"); // Importar el paquete cors

// Importar las rutas definidas en el archivo index.js dentro de la carpeta router
const misRutas = require("./router/index");
const path = require("path");

// Crear una instancia de Express
const app = express();

// Habilitar CORS para todas las rutas y orígenes
app.use(cors());

// Configurar body-parser para analizar el cuerpo del mensaje en formato JSON
app.use(bodyparser.json());

// Establecer el motor de plantillas como EJS
app.set("view engine", "ejs");

// Establecer la carpeta pública para servir archivos estáticos
app.use(express.static(path.join(__dirname, "/public")));
// Establecer la carpeta pública para servir archivos estáticos (imágenes)
// const directorioImagenes = path.join(__dirname, "public", "uploads");
// app.use(express.static(directorioImagenes));

// Analizar los cuerpos de las solicitudes HTTP
app.use(bodyparser.urlencoded({ extended: true }));

// Registrar el motor de plantillas EJS para la extensión html
app.engine("html", require("ejs").renderFile);

// Usar las rutas definidas en misRutas
app.use(misRutas);

// Agregar un middleware para manejar solicitudes no encontradas (404)
app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + "/public/error.html");
});

// Iniciar el servidor en el puerto 3000 y mostrar un mensaje en la consola
const puerto = 3030;
app.listen(puerto, () => {
  console.log("Iniciando Puerto Proyecto Final");
});

