import { useHistory } from "react-router-dom";
import Animation from "./Animation";


const NotFound = () => {
    const history = useHistory();

    return (
        <div>
            <h1 className="text-center">Error 404 - Página no encontrada</h1>
            <div>
                <Animation />
            </div>
            <p className="text-center" onClick={() => history.push("/")} style={{ cursor: "pointer" }}>Volver al inicio</p>
        </div>
    )
}

export default NotFound
