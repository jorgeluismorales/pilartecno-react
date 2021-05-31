const TodosList = ({ td, handleDelete, enableEdition }) => {
  return (
    <ul className="list-group" key={td.id}>
      <li className="list-group-item mb-3">
        <p>
          <b>Posición</b>: {td.position} - <b>Descripción</b>: {td.description}
        </p>
        <p>
          <b>Empresa</b>: {td.organization.name}
        </p>

        <button onClick={() => enableEdition(td)} className="btn btn-warning btn-sm mr-3">Editar</button>
         <button onClick={() => handleDelete(td.id)} className="btn btn-danger btn-sm">Borrar</button>
      
      </li>
    </ul>
  );
};

export default TodosList;
