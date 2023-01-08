const axios = require('axios')

// Abstracción de la API externa provista por toolbox.

class ExternalApi {
  async getFilesNames () {
    // En caso de exito se retorna la respuesta del backend.
    try {
      const response = await axios.get('https://echo-serv.tbxnet.com/v1/secret/files', {
        headers: {
          Authorization: 'Bearer aSuperSecretKey'
        }
      })
      return response.data.files
    } catch (err) {
      /* En caso de error se retorna un array vacio, el cual para el usuario de esta API, representa que no hay datos para mostrar.
      Debido a que el usuario es ajeno al consumo del endpoint de toolbox y a sus estados de respuesta. */
      return []
    }
  }

  async getFileContents (name) {
    const response = await axios.get(`https://echo-serv.tbxnet.com/v1/secret/file/${name}`, {
      headers: {
        Authorization: 'Bearer aSuperSecretKey'
      }
    })
    return response.data
  }
}

module.exports = new ExternalApi()
