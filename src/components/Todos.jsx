import { useState, useEffect } from "react";

import { nanoid } from "nanoid";
import TodosList from "./TodosList";
import AddTodosForm from "./AddTodosForm";

export const Todos = () => {
  const [todo, setTodo] = useState({
    puesto: "",
    empresa: "",
    ciudad: "",
    pais: "",
  });
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(false);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [companies, setCcompanies] = useState([]);

  const { puesto, empresa, ciudad, pais } = todo;

  let filteredCities = []

  useEffect(() => {
    if (localStorage.getItem("countries") != null) {
      setCountries(
        JSON.parse(localStorage.getItem("countries"))
      )
    }

    if (localStorage.getItem("cities") != null) {
      filteredCities = JSON.parse(localStorage.getItem("cities"))

    }

    if (localStorage.getItem("companies") != null) {
      setCcompanies(
        JSON.parse(localStorage.getItem("companies"))
      )
    }
  }, [filteredCities])

  useEffect(() => {

    if (pais !== "") {
      setCities(filteredCities.filter(city => city.selectedCountry === pais))
    }
  }, [pais])

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

  console.log(ciudad);
  console.log(pais);
  console.log(cities);
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
          cities={cities}
          companies={companies}
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
