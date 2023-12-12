const fs = require('node:fs');
const chokidar = require('chokidar');
const path = require('node:path');

const carpeta = process.argv[2] || '.'

function listarArchivos(carpeta) {
  const watcher = chokidar.watch(carpeta, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    ignoreInitial: true
  });

  watcher
    .on('add', (filename) => generateLog(path.basename(filename), 'creado'))
    .on('change', (filename) => generateLog(path.basename(filename), 'modificado'))
    .on('unlink', (filename) => generateLog(path.basename(filename), 'eliminado'))
}

function generateLog(name, action) {
  let fecha = new Date().toLocaleString();
  let mensajeLog = `${fecha} - accion: archivo ${action} - nombre del archivo: ${name}\n`;

  fs.appendFile('registro.log', mensajeLog, (error) => {
    if (error) console.error(`error al escribir en el archivo: ${error}`)
  })
}

listarArchivos(carpeta);