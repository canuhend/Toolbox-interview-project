const csv = require('csvtojson')
const externalApi = require('./models/externalApi')

/**
 * @param {String} file
 * @returns {Array.<Object>}
 */
async function csvToJson (file) {
  const result = await csv().fromString(file)
  return result
}

/**
 * Valida que la linea ingresada contenga los campos y valores deseados.
 * @param {Object} fileLine
 * @returns {Boolean}
 */
function hasValidFields (fileLine) {
  return (fileLine.file && fileLine.text && fileLine.number?.match(/^[0-9]+$/) && validateHexLength(fileLine.hex))
}

/**
 * Valida que el String contenga solo caracteres validos de hexadecimal y un length de 32.
 * @param {String} hex
 * @returns {Array.<string>} OR NULL
 */
function validateHexLength (hex) {
  return hex?.match(/^[0-9A-Fa-f]{32}$/)
}

/**
 * Consigue el CSV con el nombre indicado, lo formatea a Json, valida cada una de sus lineas y devuelve un Array con las validas.
 * @param {String} fileName
 * @returns {Array.<Object>}
 */
async function formattedLinesForFile (fileName) {
  const lines = await csvToJson(await externalApi.getFileContents(fileName))
  const formattedLines = []
  lines.forEach(line => {
    if (hasValidFields(line)) {
      formattedLines.push(line)
    }
  })
  return formattedLines
}

/**
 * Consigue y valida cada uno de los archivos indicados. Devuelve un Array con el formato solicitado.
 * @param {Array.<String>} filesNames
 * @returns {Array.<Object>}
 */
async function formattedFiles (filesNames) {
  const formattedFiles = []
  for (const fileName of filesNames) {
    try {
      const fileToPush = { file: fileName, lines: await formattedLinesForFile(fileName) }
      formattedFiles.push(fileToPush)
    } catch (err) {
      // INVALID FILE, SKIP THIS FILE
    }
  }
  return formattedFiles
}

module.exports = {
  formattedFiles
}
