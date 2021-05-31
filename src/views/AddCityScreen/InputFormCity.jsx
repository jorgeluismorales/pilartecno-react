import React from 'react'

const InputFormCity = ({ editionMode, edit, handleSubmit, selectedCity, handleInput, countries }) => {
    return (
        <form onSubmit={editionMode ? edit : handleSubmit}>
            <div className="row">
                <div className="col-6">
                    <label htmlFor="city" className="form-label">
                        Agregar Ciudad
            </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ingresa una ciudad"
                        id="city"
                        value={selectedCity}
                        onChange={(e) => handleInput(e)}
                        name="selectedCity"
                    />
                </div>
                <div className="col-6">
                    <label className="form-label">Seleccionar pais</label>
                    <br />
                    <select
                        className="form-control"
                        onChange={(e) => handleInput(e)}
                        name="selectedCountry"
                    >
                        <option defaultValue>Paises</option>
                        {countries.map((country) => (
                            <option value={country.id} key={country.id}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <button type="submit" className={editionMode ? 'btn btn-warning mt-3 mr-3' : 'btn btn-primary mt-3 mr-3'}>
                {
                    editionMode ? 'Editar' : 'Agregar'
                }
            </button>
        </form>
    )
}

export default InputFormCity
