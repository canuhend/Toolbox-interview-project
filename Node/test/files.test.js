const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = require('chai').expect
const sinon = require('sinon')
const externalAPI = require('../models/externalApi')
const server = require('../app')

chai.use(chaiHttp)

describe('Test GET /files/data', () => {
  it('Should return statusCode 200, not remove any lines and reformat them correctly when all of them are valid', (done) => {
    const stubList = sinon.stub(externalAPI, 'getFilesNames').callsFake(
      function () {
        const fakeResponse = [
          'test2.csv'
        ]

        return new Promise((resolve) => resolve(fakeResponse))
      }
    )
    const stubData = sinon.stub(externalAPI, 'getFileContents').callsFake(
      function () {
        const fakeResponse = `file,text,number,hex
test2.csv,zbiVDWioLtYIluTcn,667,f5420d46d46ca8e24f5fc38c0e98ab6d`

        return new Promise((resolve) => resolve(fakeResponse))
      }
    )
    chai.request(server)
      .get('/files/data')
      .then((res) => {
        expect(res.statusCode).to.be.equal(200)
        expect(res.body).to.be.deep.equal([
          {
            file: 'test2.csv',
            lines: [
              {
                file: 'test2.csv',
                text: 'zbiVDWioLtYIluTcn',
                number: '667',
                hex: 'f5420d46d46ca8e24f5fc38c0e98ab6d'
              }
            ]
          }
        ])
        stubList.restore()
        stubData.restore()
        done()
      })
      .catch((e) => done(e))
  })
  // ----------------------------------------------------------------------------------------------

  it('Should return statusCode 200 and remove the lines with NaN in the number column', (done) => {
    const stubList = sinon.stub(externalAPI, 'getFilesNames').callsFake(
      function () {
        const fakeResponse = [
          'test2.csv'
        ]

        return new Promise((resolve) => resolve(fakeResponse))
      }
    )
    const stubData = sinon.stub(externalAPI, 'getFileContents').callsFake(
      function () {
        const fakeResponse = `file,text,number,hex
    test2.csv,zbiVDWioLtYIluTcn,notANumber,f5420d46d46ca8e24f5fc38c0e98ab6d`
        return new Promise((resolve) => resolve(fakeResponse))
      }
    )
    chai.request(server)
      .get('/files/data')
      .then((res) => {
        expect(res.statusCode).to.be.equal(200)
        expect(res.body).to.be.deep.equal([
          {
            file: 'test2.csv',
            lines: []
          }
        ])
        stubList.restore()
        stubData.restore()
        done()
      })
      .catch((e) => done(e))
  })

  // ----------------------------------------------------------------------------------------------------------
  it('Should return statusCode 200 and remove the lines with less than 32 or invalid hex char in the hex column', (done) => {
    const stubList = sinon.stub(externalAPI, 'getFilesNames').callsFake(
      function () {
        const fakeResponse = [
          'test2.csv'
        ]

        return new Promise((resolve) => resolve(fakeResponse))
      }
    )
    const stubData = sinon.stub(externalAPI, 'getFileContents').callsFake(
      function () {
        const fakeResponse = `file,text,number,hex
    test2.csv,zbiVDWioLtYIluTcn,123,f5420d4
    test2.csv,zbiVDWioLtYIluTcn,123,Z5420d46d46ca8e24f5fc38c0e98ab6dw`
        return new Promise((resolve) => resolve(fakeResponse))
      }
    )
    chai.request(server)
      .get('/files/data')
      .then((res) => {
        expect(res.statusCode).to.be.equal(200)
        expect(res.body).to.be.deep.equal([
          {
            file: 'test2.csv',
            lines: []
          }
        ])
        stubList.restore()
        stubData.restore()
        done()
      })
      .catch((e) => done(e))
  })

  // --------------------------------------------------------------------------------------------------------------

  it('Should return statusCode 200 and an empty array when the backend exposes an empty file list', (done) => {
    const stubList = sinon.stub(externalAPI, 'getFilesNames').callsFake(
      function () {
        const fakeResponse = []

        return new Promise((resolve) => resolve(fakeResponse))
      }
    )
    chai.request(server)
      .get('/files/data')
      .then((res) => {
        expect(res.statusCode).to.be.equal(200)
        expect(res.body).to.be.deep.equal([])
        stubList.restore()
        done()
      })
      .catch((e) => done(e))
  })
})

// ---------------------------------------------------------------------------------------------------------------------------
// GET files/data?query
describe('Test GET /files/data?QueryString', () => {
  it('Should return statusCode 200 and an empty array when the file don\'t exist', (done) => {
    const stubList = sinon.stub(externalAPI, 'getFilesNames').callsFake(
      function () {
        const fakeResponse = []

        return new Promise((resolve) => resolve(fakeResponse))
      }
    )
    chai.request(server)
      .get('/files/data?fileName=test2.csv')
      .then((res) => {
        expect(res.statusCode).to.be.equal(200)
        expect(res.body).to.be.deep.equal([])
        stubList.restore()
        done()
      })
      .catch((e) => done(e))
  })

  // ----------------------------------------------------------------------------------------------------------------
  it('Should return statusCode 200 and only the data of the explicit file', (done) => {
    const stubList = sinon.stub(externalAPI, 'getFilesNames').callsFake(
      function () {
        const fakeResponse = [
          'test2.csv'
        ]

        return new Promise((resolve) => resolve(fakeResponse))
      }
    )
    const stubData = sinon.stub(externalAPI, 'getFileContents').callsFake(
      function () {
        const fakeResponse = `file,text,number,hex
test2.csv,zbiVDWioLtYIluTcn,667,f5420d46d46ca8e24f5fc38c0e98ab6d`
        return new Promise((resolve) => resolve(fakeResponse))
      }
    )
    chai.request(server)
      .get('/files/data?fileName=test2.csv')
      .then((res) => {
        expect(res.statusCode).to.be.equal(200)
        expect(res.body).to.be.deep.equal([
          {
            file: 'test2.csv',
            lines: [
              {
                file: 'test2.csv',
                text: 'zbiVDWioLtYIluTcn',
                number: '667',
                hex: 'f5420d46d46ca8e24f5fc38c0e98ab6d'
              }
            ]
          }
        ]
        )
        stubList.restore()
        stubData.restore()
        done()
      })
      .catch((e) => done(e))
  })
})

// ----------------------------------------------------------------------------------------------------------------
// GET files/lists
describe('Test GET /files/lists', () => {
  it('Should return statusCode 200 and an empty array when the backend list is empty', (done) => {
    const stubList = sinon.stub(externalAPI, 'getFilesNames').callsFake(
      function () {
        const fakeResponse = []

        return new Promise((resolve) => resolve(fakeResponse))
      }
    )
    chai.request(server)
      .get('/files/lists')
      .then((res) => {
        expect(res.statusCode).to.be.equal(200)
        expect(res.body).to.be.deep.equal({
          files: []
        })
        stubList.restore()
        done()
      })
      .catch((e) => done(e))
  })

  // ----------------------------------------------------------------------------------------------------------------
  it('Should return statusCode 200 and the same list than backend when it has content', (done) => {
    const stubList = sinon.stub(externalAPI, 'getFilesNames').callsFake(
      function () {
        const fakeResponse = [
          'test2.csv'
        ]

        return new Promise((resolve) => resolve(fakeResponse))
      }
    )
    const stubData = sinon.stub(externalAPI, 'getFileContents').callsFake(
      function () {
        const fakeResponse = `file,text,number,hex
test2.csv,zbiVDWioLtYIluTcn,667,f5420d46d46ca8e24f5fc38c0e98ab6d`
        return new Promise((resolve) => resolve(fakeResponse))
      }
    )
    chai.request(server)
      .get('/files/lists')
      .then((res) => {
        expect(res.statusCode).to.be.equal(200)
        expect(res.body).to.be.deep.equal({
          files: [
            'test2.csv'
          ]
        })
        stubList.restore()
        stubData.restore()
        done()
      })
      .catch((e) => done(e))
  })
})
