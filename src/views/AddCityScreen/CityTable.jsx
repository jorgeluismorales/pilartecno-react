import React from 'react'

const CityTable = ({ cities, enableEdition, deleteCity }) => {
  return (
    <table className="table mt-3">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Ciudad</th>
          <th scope="col">Pais</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>

        {cities &&
          cities.map(ciudad => (
            <tr key={ciudad.id}>
              <th scope="row">{ciudad.id}</th>
              <td>{ciudad.name}</td>
              <td>{ciudad.countrie.name}</td>
              <td><button onClick={() => enableEdition(ciudad)} className="btn btn-warning btn-sm mr-3">Editar</button>
                <button onClick={() => deleteCity(ciudad.id)} className="btn btn-danger btn-sm">Borrar</button></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default CityTable
