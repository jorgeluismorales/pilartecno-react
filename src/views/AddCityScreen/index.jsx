import axios from "axios";
import { useEffect, useState } from "react";
import CityTable from "./CityTable";
import InputFormCity from "./InputFormCity";

const AddCityScreen = () => {
  const [city, setCity] = useState({
    selectedCity: "",
    selectedCountry: ""
  });
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [countryFiltered, setCountryFiltered] = useState({})
  const [error, setError] = useState(false);
  const [editionMode, setEditionMode] = useState(false);
  const [id, setId] = useState('');

  const { selectedCity, selectedCountry } = city;

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get('https://api-fake-pilar-tecno.herokuapp.com/countries')
      const places = await axios.get('https://api-fake-pilar-tecno.herokuapp.com/places?_expand=countrie')
      setCountries(res.data)
      setCities(places.data)
    }
    getData()
  }, [])

  useEffect(() => {
    const fetchCountry = async () => {
      const response = await axios.get(`https://api-fake-pilar-tecno.herokuapp.com/countries/${selectedCountry}`)
      setCountryFiltered(response.data.name)
    }

    fetchCountry()
  }, [selectedCountry])

  const handleInput = (e) => {
    setCity({
      ...city,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedCity.trim() === "" || selectedCountry.trim() === "Paises") {
      setError(true);
      return;
    }
    const data = await axios.post('https://api-fake-pilar-tecno.herokuapp.com/places', {
      name: selectedCity,
      countrieId: selectedCountry
    })

    setError(false);

    setCities([
      ...cities,
      {
        id: data.data.id,
        name: selectedCity,
        countrieId: selectedCountry,
        countrie: {
          name: countryFiltered
        }
      },
    ]);
    setCity({
      selectedCity: "",
      selectedCountry: ""
    });
  };

  const deleteCity = (id) => {
    axios.delete(`https://api-fake-pilar-tecno.herokuapp.com/places/${id}`)
    setCities(cities.filter(ciudad => ciudad.id !== id))
  }

  const enableEdition = (ciudad) => {
    setEditionMode(true)
    setCity({
      selectedCity: ciudad.name,
      selectedCountry: ciudad.countrieId
    })
    setId(ciudad.id)
  }

  const edit = async (e) => {
    e.preventDefault();
    if (selectedCity.trim() === "" || selectedCountry.trim() === "Paises") {
      setError(true);
      return;
    }
    const data = await axios.patch(`https://api-fake-pilar-tecno.herokuapp.com/places/${id}`, {

      name: selectedCity,
      countrieId: selectedCountry

    })
    setCities(cities.map(ciudad => (ciudad.id === id ? {
      id: data.data.id, name: data.data.name, countrieId: data.data.countrieId, countrie: {
        name: countryFiltered
      }
    } : ciudad)))
    setEditionMode(false)
    setCity({
      selectedCity: "",
      selectedCountry: ""
    });
    setId('')
  }

  return (
    <>
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          Todos los campos son obligatorios
        </div>
      )}
      <InputFormCity editionMode={editionMode} edit={edit} handleSubmit={handleSubmit} selectedCity={selectedCity} handleInput={handleInput} countries={countries} />
      <CityTable cities={cities} enableEdition={enableEdition} deleteCity={deleteCity} />
    </>
  );
};

export default AddCityScreen;