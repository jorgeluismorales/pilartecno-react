import axios from "axios";
import { useEffect, useState } from "react";
import CountryTable from "./CountryTable";
import InputFormCountry from "./InputFormCountry";

const AddCountryScreen = () => {
  const [country, setcountry] = useState("");
  const [countries, setcountries] = useState([]);
  const [error, setError] = useState(false);
  const [editionMode, setEditionMode] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get('https://api-fake-pilar-tecno.herokuapp.com/countries')
      setcountries(res.data)
    }
    getData()
  }, [])

  const handleInput = (e) => {
    setcountry(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (country.trim() === "") {
      setError(true);
      return;
    }
    setError(false);
    const data = await axios.post('https://api-fake-pilar-tecno.herokuapp.com/countries', {
      name: country
    })
    setcountries([
      ...countries, { name: country, id: data.data.id }
    ])
    setcountry("");
  };

  const deleteCountry = (id) => {
    axios.delete(`https://api-fake-pilar-tecno.herokuapp.com/countries/${id}`)
    setcountries(countries.filter(pais => pais.id !== id))
  }

  const enableEdition = (pais) => {
    setEditionMode(true)
    setcountry(pais.name)
    setId(pais.id)
  }

  const edit = async (e) => {
    e.preventDefault();
    if (country.trim() === "") {
      setError(true);
      return;
    }
    const data = await axios.patch(`https://api-fake-pilar-tecno.herokuapp.com/countries/${id}`, {
      name: country
    })

    setcountries(countries.map(pais => (pais.id === id ? { id: pais.id, name: data.data.name } : pais)))
    setEditionMode(false)
    setcountry('')
    setId('')

  }

  return (
    <>
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          Campo obligatorio
        </div>
      )}
      <InputFormCountry editionMode={editionMode} edit={edit} handleSubmit={handleSubmit} country={country} handleInput={handleInput} />
      <CountryTable countries={countries} enableEdition={enableEdition} deleteCountry={deleteCountry} />
    </>
  );
};

export default AddCountryScreen;