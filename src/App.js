import AppRoutes from "./AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <div className="container">
        <NavBar />
        <div className="mt-5">
          <AppRoutes />
        </div>
      </div>
    </Router>
  );
}

export default App;
