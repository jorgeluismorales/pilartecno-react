import { useState, useEffect } from "react";
import TodosList from "./TodosList";
import AddTodosForm from "./AddTodosForm";
import axios from "axios";

export const Todos = () => {
  const [todo, setTodo] = useState({
    puesto: "",
    empresa: "",
    descripcion: ""
  });
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(false);
  const [companies, setCcompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [editionMode, setEditionMode] = useState(false);
  const [id, setId] = useState('');

  const { puesto, empresa, descripcion } = todo;

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get('https://api-fake-pilar-tecno.herokuapp.com/organizations?_expand=place')
      const jobs = await axios.get('https://api-fake-pilar-tecno.herokuapp.com/jobs?_expand=organization')
      setTodos(jobs.data)
      setCcompanies(res.data)
    }
    getData()
  }, []);

  useEffect(() => {
    const fetchCompany = async () => {
      const response = await axios.get(`https://api-fake-pilar-tecno.herokuapp.com/organizations/${empresa}`)
      setSelectedCompany(response.data.name)
    }
    fetchCompany()
  }, [empresa])

  const updateState = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      puesto.trim() === "" ||
      empresa.trim() === "" ||
      descripcion.trim() === ""
    ) {
      setError(true);
      return;
    }
    setError(false);
    const data = await axios.post('https://api-fake-pilar-tecno.herokuapp.com/jobs', {
      position: puesto,
      description: descripcion,
      organizationId: empresa
    })
    setTodos([
      ...todos,
      {
        position: data.data.position,
        description: data.data.description,
        id: data.data.id,
        organization: {
          name: selectedCompany
        }
      },
    ]);
    setTodo({
      puesto: "",
      empresa: "",
      descripcion: ""
    });
  };
  const handleDelete = (id) => {
    axios.delete(`https://api-fake-pilar-tecno.herokuapp.com/jobs/${id}`)
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const enableEdition = (td) => {
    setEditionMode(true)
    setTodo({
      puesto: td.position,
      empresa: td.organization.id,
      descripcion: td.description
    })
    setId(td.id)
    console.log(td)
  }

  const edit = async (e) => {
    e.preventDefault();
    if (puesto.trim() === "" || empresa.trim() === "" || descripcion.trim() === "") {
      setError(true);
      return;
    }
    const data = await axios.patch(`https://api-fake-pilar-tecno.herokuapp.com/jobs/${id}`, {
      position: puesto,
      description: descripcion,
      organizationId: empresa
    })
    setTodos(todos.map(job => (job.id === id ? {
      id: data.data.id, position: data.data.position, description: data.data.description, organization: {
        name: selectedCompany
      }

    } : job)))
    setEditionMode(false)
    setTodo({
      puesto: "",
      empresa: "",
      descripcion: ""
    });
    setId('')
  }
  return (
    <div className="row">
      <div className="col-6">
        {error && (
          <div className="alert alert-danger text-center" role="alert">
            Todos los campos son obligatorios
          </div>
        )}
        <AddTodosForm editionMode={editionMode} edit={edit} handleSubmit={handleSubmit} updateState={updateState} puesto={puesto} descripcion={descripcion} companies={companies} />
      </div>
      <div className="col-6">
        {todos.map((td) => (
          <TodosList td={td} handleDelete={handleDelete} enableEdition={enableEdition} key={td.id} />
        ))}
      </div>
    </div>
  );
};