import axios from "axios";
import { useEffect, useState } from "react";
import CompanyTable from "./CompanyTable";
import InputFormCompany from "./InputFormCompany";

const AddCompanyScreen = () => {
  const [company, setCompany] = useState({
    selectedCompany: "",
    selectedCity: "",
  });
  const [companies, setCcompanies] = useState([]);
  const [cities, setCities] = useState([]);
  const [cityFiltered, setCityFiltered] = useState("");
  const [error, setError] = useState(false);
  const [editionMode, setEditionMode] = useState(false);
  const [id, setId] = useState('');

  const { selectedCompany, selectedCity } = company;

  useEffect(() => {

    const getData = async () => {
      const res = await axios.get('https://api-fake-pilar-tecno.herokuapp.com/organizations?_expand=place')
      const places = await axios.get('https://api-fake-pilar-tecno.herokuapp.com/places?_expand=countrie')
      setCcompanies(res.data)
      setCities(places.data)
    }

    getData()
  }, []);

  useEffect(() => {
    const fetchCity = async () => {
      const response = await axios.get(`https://api-fake-pilar-tecno.herokuapp.com/places/${selectedCity}`)
      setCityFiltered(response.data.name)
    }

    fetchCity()
  }, [selectedCity])

  const handleInput = (e) => {
    setCompany({
      ...company,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
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

    const data = await axios.post('https://api-fake-pilar-tecno.herokuapp.com/organizations', {
      name: selectedCompany,
      placeId: selectedCity
    })
    setCcompanies([
      ...companies,
      {
        id: data.data.id,
        name: selectedCompany,
        placeId: selectedCity,
        place: {
          name: cityFiltered
        }
      },
    ]);
    setCompany({
      selectedCompany: "",
      selectedCity: "",
    });
  };

  const deleteCompany = (id) => {
    axios.delete(`https://api-fake-pilar-tecno.herokuapp.com/organizations/${id}`)
    setCcompanies(companies.filter(empresa => empresa.id !== id))
  }

  const enableEdition = (empresa) => {
    setEditionMode(true)
    setCompany({
      selectedCompany: empresa.name,
      selectedCity: empresa.placeId
    })
    setId(empresa.id)
    console.log(empresa)
  }

  const edit = async (e) => {
    e.preventDefault();
    if (selectedCompany.trim() === "") {
      setError(true);
      return;
    }
    const data = await axios.patch(`https://api-fake-pilar-tecno.herokuapp.com/organizations/${id}`, {
      name: selectedCompany
    })

    setCcompanies(companies.map(empresa => (empresa.id === id ? {
      id: data.data.id, name: data.data.name, placeId: data.data.placeId, place: {
        name: cityFiltered
      }
    } : empresa)))
    setEditionMode(false)
    setCompany({
      selectedCompany: "",
      selectedCity: ""
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

      <InputFormCompany editionMode={editionMode} edit={edit} handleSubmit={handleSubmit} selectedCompany={selectedCompany} handleInput={handleInput} cities={cities} />
      <CompanyTable companies={companies} enableEdition={enableEdition} deleteCompany={deleteCompany} />
    </>
  );
};

export default AddCompanyScreen;
