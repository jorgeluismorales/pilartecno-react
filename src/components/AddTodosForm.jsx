const AddTodosForm = ({
  handleSubmit,
  updateState,
  puesto,
  descripcion,
  companies,
  editionMode,
  edit
}) => {
  return (
    <form onSubmit={editionMode ? edit : handleSubmit}>
      <input
        type="text"
        name="puesto"
        className="form-control"
        placeholder="Ingresa nombre del puesto"
        onChange={updateState}
        value={puesto}
      />
      <br />

      <input
        type="text"
        name="descripcion"
        className="form-control"
        placeholder="Ingresa descripción del puesto"
        onChange={updateState}
        value={descripcion}
      />
      <br />

      <select className="form-control" onChange={updateState} name="empresa">
        <option defaultValue>Empresas</option>
        {
          companies.map(company => (
            <option value={company.id} key={company.id}>{company.name}</option>
          ))
        }
      </select>
      <br />
      <button type="submit" className={editionMode ? 'btn btn-warning mt-3 mr-3' : 'btn btn-primary mt-3 mr-3'}>
        {
          editionMode ? 'Editar' : 'Agregar'
        }
      </button>
    </form>
  );
};

export default AddTodosForm;
