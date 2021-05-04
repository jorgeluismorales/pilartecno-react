import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="navbar-nav">
            <Link className="nav-link active" aria-current="page" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/addcountry">
              Agregar Pais
            </Link>
            <Link className="nav-link" to="/addcity">
              Agregar Ciudad
            </Link>
            <Link className="nav-link" to="/addcompany">
              Agregar Compañia
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
