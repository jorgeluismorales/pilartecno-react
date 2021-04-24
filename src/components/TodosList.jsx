const TodosList = ({ td, handleDelete }) => {
  return (
    <ul class="list-group" key={td.id}>
      <li className="list-group-item mb-3">
        <p>
          <b>Puesto</b>: {td.puesto} - <b>Empresa</b>: {td.empresa}
        </p>
        <p>
          <b>Ciudad</b>: {td.ciudad} - <b>Pais</b>: {td.pais}
        </p>
        <button
          onClick={() => handleDelete(td.id)}
          className="btn btn-danger float-right"
        >
          Eliminar
        </button>
      </li>
    </ul>
  );
};

export default TodosList;
