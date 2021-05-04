const AddTodosForm = ({
  handleSubmit,
  updateState,
  puesto,
  countries,
  cities,
  companies
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="puesto"
        className="form-control"
        placeholder="Ingresa nombre del puesto"
        onChange={updateState}
        value={puesto}
      />
      <br />

      <select className="form-control" onChange={updateState} name="empresa">
        <option defaultValue>Paises</option>
        {
          countries.map(country => (
            <option value={country} key={country}>{country}</option>
          ))
        }
      </select>
      <br />

      <select className="form-control" onChange={updateState} name="ciudad">
        <option defaultValue>Ciudades</option>
        {
          cities.map(city => (
            <option value={city.selectedCity} key={city.selectedCity}>{city.selectedCity}</option>
          ))
        }
      </select>
      
      <br />
      <select className="form-control" onChange={updateState} name="empresa">
        <option defaultValue>Empresas</option>
        {
          companies.map(company => (
            <option value={company.selectedCompany} key={company.selectedCompany}>{company.selectedCompany}</option>
          ))
        }
      </select>
      <br />
      <button type="submit" className="btn btn-primary btn-block">
        Agregar
      </button>
    </form>
  );
};

export default AddTodosForm;
