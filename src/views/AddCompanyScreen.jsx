import { useEffect, useState } from "react";

const AddCompanyScreen = () => {
  const [company, setCompany] = useState({
    selectedCompany: "",
    selectedCity: "",
  });
  const [companies, setCcompanies] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(false);

  const { selectedCompany, selectedCity } = company;

  useEffect(() => {
    if (localStorage.getItem("cities") != null) {
      setCities(JSON.parse(localStorage.getItem("cities")));
    }
  }, []);

  const handleInput = (e) => {
    setCompany({
      ...company,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      selectedCompany.trim() === "" ||
      selectedCity.trim() === "Ciudades" ||
      selectedCity.trim() === ""
    ) {
      setError(true);
      return;
    }
    setError(false);
    setCcompanies([
      ...companies,
      {
        selectedCompany,
        selectedCity,
      },
    ]);
    setCompany({
      selectedCompany: "",
      selectedCity: "",
    });
  };

  const saveToLocalStorage = () => {
    if (cities.length > 0) {
      localStorage.setItem("companies", JSON.stringify(companies));
    }
  };
  return (
    <>
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          Todos los campos son obligatorios
        </div>
      )}

      <form onSubmit={handleSubmit}>
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
                <option value={city.selectedCity} key={city.selectedCity}>
                  {city.selectedCity}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3 mr-3">
          Agregar
        </button>
        <button
          type="button"
          className="btn btn-warning mt-3 mr-3"
          onClick={saveToLocalStorage}
        >
          Guardar
        </button>
      </form>
    </>
  );
};

export default AddCompanyScreen;
