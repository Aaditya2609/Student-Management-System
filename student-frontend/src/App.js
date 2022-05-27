import './App.css';
import Login from './Components/Login';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminMainPage from './Components/AdminMainPage';
import FacultyMainPage from './Components/FacultyMainPage';
function App() {
  return (<>

    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route exact path='/adminMainPage'>
          <AdminMainPage />
        </Route>
        <Route exact path='/facultyMainPage'>
          <FacultyMainPage />
        </Route>
      </Switch>
    </BrowserRouter>
  </>
  );
}

export default App;
