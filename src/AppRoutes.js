import { Switch, Route } from 'react-router-dom';
import AddCityScreen from './views/AddCityScreen';
import AddCompanyScreen from './views/AddCompanyScreen';
import AddCountryScreen from './views/AddCountryScreen';
import {Todos} from "./components/Todos"

const AppRoutes = () => (
    <Switch>
        <Route exact path="/">
            <Todos />
        </Route>
        <Route exact path="/addcity">
            <AddCityScreen />
        </Route>
        <Route exact path="/addcompany">
            <AddCompanyScreen />
        </Route>
        <Route exact path="/addcountry">
            <AddCountryScreen />
        </Route>
    </Switch>
)

export default AppRoutes;