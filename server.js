// Modulos necesarios.
const express = require('express');
const app = express();
const path = require('path');
const process = require('process');
const fs = require('fs');
const ip = require('ip');

// Obtenemos la ruta del proyecto y su apk.
const proyecto = process.argv[2];
console.log(`\nPROYECTO: ${proyecto}\n`);

const rutaProyecto = `C:/Users/aacoa/OneDrive/Escritorio/Aldo/CETIs/Practias-de-Android-Studio/${proyecto}/app/build/outputs/apk/app-debug.apk`;
const apk = path.resolve(rutaProyecto);
console.log(`RUTA:\n${apk}`);

// Configuracion del servidor de express.
const port = 5000;
const direccionIP = ip.address();

app.listen(port, ip, () => {
  console.log(`\nDescarga el apk ingresando a: ${direccionIP}:${port}`);
});

//Ruta del servidor para descargar el apk desde el dispositivo.
app.get('/descargar-apk', (req, res) => {
  res.download(apk);
  console.log("\nEl archivo ha sido descargado!");
});
//Ruta principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  console.log("\nEl dispositivo ha ingresado a la pagina");
});
//Detecta cambios en el apk
fs.watchFile(rutaProyecto, (curr, prev) => {
  console.log('\nEl apk ha sido modificado');
});