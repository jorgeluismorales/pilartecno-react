import { useState } from "react";

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

  const { puesto, empresa, ciudad, pais } = todo;

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
      pais.trim() === ""
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
          empresa={empresa}
          ciudad={ciudad}
          pais={pais}
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
