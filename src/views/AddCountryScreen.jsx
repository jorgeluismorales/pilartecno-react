import { useState } from "react";

const AddCountryScreen = () => {
  const [country, setcountry] = useState("");
  const [countries, setcountries] = useState([]);
  const [error, setError] = useState(false);

  const handleInput = (e) => {
    setcountry(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (country.trim() === "") {
      setError(true);
      return;
    }
    setError(false);
    setcountries([...countries, country]);
    setcountry("");
  };

  const saveToLocalStorage = () => {
    if (countries.length > 0) {
      localStorage.setItem("countries", JSON.stringify(countries));
    }
  };

  return (
    <>
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          Campo obligatorio
        </div>
      )}

      <form onSubmit={handleSubmit}>
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

export default AddCountryScreen;
