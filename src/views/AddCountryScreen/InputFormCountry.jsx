import React from 'react'

const InputFormCountry = ({ editionMode, edit, handleSubmit, country, handleInput }) => {
  return (
    <form onSubmit={editionMode ? edit : handleSubmit}>
      <label htmlFor="country" className="form-label">
        Agregar pais
        </label>
      <input
        type="text"
        className="form-control"
        placeholder="Ingresa un pais"
        id="country"
        value={country}
        onChange={(e) => handleInput(e)}
      />
      <button type="submit" className={editionMode ? 'btn btn-warning mt-3 mr-3' : 'btn btn-primary mt-3 mr-3'}>
        {
          editionMode ? 'Editar' : 'Agregar'
        }
      </button>
    </form>
  )
}

export default InputFormCountry
