import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'

function App () {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState(null)
  const [filterInput, setFilterInput] = useState('')

  useEffect(() => {
    let url = 'http://localhost:8080/files/data'
    if (filter) {
      url = url + `?fileName=${filter}`
    }
    fetch(url)
      .then(response => response.json())
      .then(data => setData(data))
      .catch((err) => {
        setError(err)
      })
  }, [filter])

  const filterFiles = () => setFilter(filterInput)

  return (
    <>
      <div className='p-2'>
        <input value={filterInput} onChange={(e) => setFilterInput(e.target.value)} />
        <button onClick={() => filterFiles()} className='m-1'>Filtrar</button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Text</th>
            <th>Number</th>
            <th>Hex</th>
          </tr>
        </thead>
        <tbody>
          {!error && data &&
          data.map(fileData =>
            fileData.lines.map((line, i) =>
              <tr key={fileData.file + i}>
                <td>
                  {line.file}
                </td>
                <td>
                  {line.text}
                </td>
                <td>
                  {line.number}
                </td>
                <td>
                  {line.hex}
                </td>
              </tr>
            )
          )}

          {!error && !data &&
            <tr>
              <td colSpan={4}> LOADING </td>
            </tr>}

          {error &&
            <tr>
              <td colSpan={4}> ERROR </td>
            </tr>}
        </tbody>
      </Table>
    </>
  )
}

export default App
