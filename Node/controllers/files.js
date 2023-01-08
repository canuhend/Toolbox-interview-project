const { formattedFiles } = require('../helpers')
const externalApi = require('../models/externalApi')

async function getFilesData (req, res) {
  let filesNames = await externalApi.getFilesNames()

  const { fileName } = req.query
  if (fileName) {
    filesNames = filesNames.filter(name => name === fileName)
  }
  res.json(
    await formattedFiles(filesNames)
  )
}

async function getFilesList (req, res) {
  const filesNames = await externalApi.getFilesNames()
  res.json({
    files: filesNames
  })
}

module.exports = {
  getFilesData,
  getFilesList
}
