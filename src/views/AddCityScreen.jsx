import { useEffect, useState } from "react"

const AddCityScreen = () => {

    const [city, setCity] = useState({
        selectedCity: "",
        selectedCountry: ""
    });
    const [cities, setCities] = useState([]);
    const [countries, setCountries] = useState([]);

    const { selectedCity, selectedCountry } = city;

    useEffect(() => {
        if (localStorage.getItem("countries") != null) {
            setCountries(
                JSON.parse(localStorage.getItem("countries"))
            )
        }
    }, [])


    const handleInput = (e) => {
        setCity({
            ...city,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedCity.trim() === "" || selectedCountry.trim() === "Paises") {
            console.log("error")
            return
        }
        setCities([
            ...cities,
            {
                selectedCity,
                selectedCountry
            }
        ])
        setCity({
            selectedCity: "",
            selectedCountry: ""
        })

    }

    const saveToLocalStorage = () => {
        if (cities.length > 0) {
            localStorage.setItem('cities', JSON.stringify(cities))
        }

        setCities([])
    }

    return (
        <form onSubmit={handleSubmit}>

            <div className="row">
                <div className="col-6">
                    <label htmlFor="city" className="form-label">Agregar Ciudad</label>
                    <input type="text" className="form-control" placeholder="Ingresa una ciudad" id="city" value={selectedCity}
                        onChange={e => handleInput(e)} name="selectedCity" />
                </div>
                <div className="col-6">
                    <label className="form-label">Seleccionar pais</label>
                    <br />
                    <select className="form-control" onChange={e => handleInput(e)} name="selectedCountry">
                        <option defaultValue>Paises</option>
                        {
                            countries.map(country => (
                                <option value={country} key={country}>{country}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <button type="submit" className="btn btn-primary mt-3 mr-3">Agregar</button>
            <button type="button" className="btn btn-warning mt-3 mr-3" onClick={saveToLocalStorage}>Guardar</button>
        </form>
    )
}

export default AddCityScreen
