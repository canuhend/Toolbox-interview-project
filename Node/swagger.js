const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const path = require('path')

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Files API', version: '1.0.0' }
  },
  apis: [path.join(__dirname, 'routes', 'files.js')]
}

const swaggerSpec = swaggerJSDoc(options)

// Function to setup our docs
const swaggerDocs = (app, port) => {
  // Route-Handler to visit our docs
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  console.log(
      `Version 1 Docs are available on http://localhost:${port}/api/docs`
  )
}

module.exports = { swaggerDocs }
