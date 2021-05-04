import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import TodosList from "./TodosList";
import AddTodosForm from "./AddTodosForm";

let initialsToDos = JSON.parse(localStorage.getItem("todos"));
if (!initialsToDos) {
  initialsToDos = [];
}

export const Todos = () => {
  const [todo, setTodo] = useState({
    puesto: "",
    empresa: "",
    ciudad: "",
    pais: "",
  });
  const [todos, setTodos] = useState(initialsToDos);
  const [error, setError] = useState(false);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [companies, setCcompanies] = useState([]);
  const [filteredCompanies, setFilteredCcompanies] = useState([]);

  const { puesto, empresa, ciudad, pais } = todo;

  useEffect(() => {
    let initialsToDos = JSON.parse(localStorage.getItem("todos"));

    if (initialsToDos) {
      localStorage.setItem("todos", JSON.stringify(todos));
    } else {
      localStorage.setItem("todos", JSON.stringify([]));
    }
  }, [todos]);

  useEffect(() => {
    if (localStorage.getItem("countries") != null) {
      setCountries(JSON.parse(localStorage.getItem("countries")));
    }

    if (localStorage.getItem("cities") != null) {
      setCities(JSON.parse(localStorage.getItem("cities")));
    }

    if (localStorage.getItem("companies") != null) {
      setCcompanies(JSON.parse(localStorage.getItem("companies")));
    }
  }, []);

  useEffect(() => {
    if (pais !== "") {
      setFilteredCities(cities.filter((city) => city.selectedCountry === pais));
    }
  }, [pais, cities]);

  useEffect(() => {
    if (ciudad !== "") {
      setFilteredCcompanies(
        companies.filter((company) => company.selectedCity === ciudad)
      );
    }
  }, [ciudad, companies]);

  const updateState = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      puesto.trim() === "" ||
      empresa.trim() === "" ||
      ciudad.trim() === "" ||
      pais.trim() === "Paises"
    ) {
      setError(true);
      return;
    }
    setError(false);
    setTodos([
      ...todos,
      {
        id: nanoid(),
        puesto,
        empresa,
        ciudad,
        pais,
      },
    ]);
    setTodo({
      puesto: "",
      empresa: "",
      ciudad: "",
      pais: "",
    });
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="row">
      <div className="col-6">
        {error && (
          <div className="alert alert-danger text-center" role="alert">
            Todos los campos son obligatorios
          </div>
        )}
        <AddTodosForm
          handleSubmit={handleSubmit}
          updateState={updateState}
          puesto={puesto}
          countries={countries}
          filteredCities={filteredCities}
          filteredCompanies={filteredCompanies}
        />
      </div>
      <div className="col-6">
        {todos.map((td) => (
          <TodosList td={td} handleDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};
