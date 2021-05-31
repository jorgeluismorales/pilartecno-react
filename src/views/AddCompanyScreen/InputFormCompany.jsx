import React from 'react'

const InputFormCompany = ({ editionMode, edit, handleSubmit, selectedCompany, handleInput, cities }) => {
    return (
        <form onSubmit={editionMode ? edit : handleSubmit}>
            <div className="row">
                <div className="col-6">
                    <label htmlFor="city" className="form-label">
                        Agregar Compañia
            </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ingresa una compañia"
                        id="city"
                        value={selectedCompany}
                        onChange={(e) => handleInput(e)}
                        name="selectedCompany"
                    />
                </div>
                <div className="col-6">
                    <label className="form-label">Seleccionar ciudad</label>
                    <br />
                    <select
                        className="form-control"
                        onChange={(e) => handleInput(e)}
                        name="selectedCity"
                    >
                        <option defaultValue>Ciudades</option>
                        {cities.map((city) => (
                            <option value={city.id} key={city.id}>
                                {city.name}
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

export default InputFormCompany
