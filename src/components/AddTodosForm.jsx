const AddTodosForm = ({
  handleSubmit,
  updateState,
  puesto,
  empresa,
  ciudad,
  pais,
}) => {
  return (
    <form onSubmit={handleSubmit}>
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
        name="empresa"
        className="form-control"
        placeholder="Ingresa empresa"
        onChange={updateState}
        value={empresa}
      />
      <br />
      <input
        type="text"
        name="ciudad"
        className="form-control"
        placeholder="Ingresa ciudad"
        onChange={updateState}
        value={ciudad}
      />
      <br />
      <input
        type="text"
        name="pais"
        className="form-control"
        placeholder="Ingresa pais"
        onChange={updateState}
        value={pais}
      />
      <br />
      <button type="submit" className="btn btn-primary btn-block">
        Agregar
      </button>
    </form>
  );
};

export default AddTodosForm;
