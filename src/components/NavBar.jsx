import { Link } from 'react-router-dom';

const NavBar = () => {


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="navbar-nav">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        <Link className="nav-link" to="/addcountry">Add Country</Link>
                        <Link className="nav-link" to="/addcity">Add City</Link>
                        <Link className="nav-link" to="/addcompany">Add Company</Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar
