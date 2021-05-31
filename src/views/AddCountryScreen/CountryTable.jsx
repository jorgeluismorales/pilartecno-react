import React from 'react'

const CountryTable = ({ countries, enableEdition, deleteCountry }) => {
  return (
    <table className="table mt-3">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Pais</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {countries &&
          countries.map(pais => (
            <tr key={pais.id}>
              <th scope="col">{pais.id}</th>
              <th scope="col">{pais.name}</th>
              <th scope="col"><button onClick={() => enableEdition(pais)} className="btn btn-warning btn-sm mr-3">Editar</button>
                <button onClick={() => deleteCountry(pais.id)} className="btn btn-danger btn-sm">Borrar</button></th>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default CountryTable
