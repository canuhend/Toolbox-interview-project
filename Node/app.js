const express = require('express')
const cors = require('cors')
const fileRouter = require('./routes/files')
const { swaggerDocs } = require('./swagger')

const app = express()
const port = 8080

// middlewares
app.use(express.json())
app.use(cors())
// routers
app.use('/files', fileRouter)

app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`)
  swaggerDocs(app, port)
})

module.exports = app
