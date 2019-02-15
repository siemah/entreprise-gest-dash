import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';

/** register & login components */
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
/** dashbaord components */
import MainNavbar from './components/Layout/MainNavbar'
import Dashboard from './components/Dash/Dashboard';
import AddProject from './components/Dash/project/Add';  
import AddProjectEmployees from './components/Dash/project/AssignEmployees';  
import EditProject from './components/Dash/project/Edit'; 
import ListProject from './components/Dash/project/List'; 
/** Employee */
import AddEmployee from './components/Dash/employees/Add'; 
import EmployeesList from './components/Dash/employees/List'; 
import EditEmployee from './components/Dash/employees/Edit'; 
/** propfile componenes */
import Password from './components/Auth/Profile/Password';
import Details from './components/Auth/Profile/Details';
import AddMaterial from './components/Dash/stock/AddMaterial';
import EditMaterial from './components/Dash/stock/EditMaterial';
import MaterialsList from './components/Dash/stock/MaterialsList';

import ProjectsAnalytic from './components/Dash/Analytics/projects';

class App extends Component {
  render() {
   return (
    <BrowserRouter>
      <Switch>
      <>
        <MainNavbar />
        <div className='section'>
          <Route exact path='/dashboard' component={Dashboard} />
          <Route component={Login} path='/login' />
          <Route component={Register} path='/register' />
          <Route component={Password} path='/profile/password' />
          <Route component={Details} path='/profile/details' />
          <Route component={AddProject} path='/projects/add' />
          <Route component={AddProjectEmployees} path='/projects/assign-employees' />
          <Route component={EditProject} path='/projects/edit/:id' />
          <Route component={ListProject} path='/projects/list' />
          <Route component={AddEmployee} path='/employees/add' />
          <Route component={EmployeesList} path='/employees/list' />
          <Route component={EditEmployee} path='/employees/edit/:id' />
          <Route component={AddMaterial} path='/materials/add' />
          <Route component={MaterialsList} path='/materials/list' />
          <Route component={EditMaterial} path='/materials/edit/:id' />
          <Route path='/dashboard/analytics/projects' component={ProjectsAnalytic} />
        </div>
      </>
      </Switch>
    </BrowserRouter>
   )
  }
}

export default App;
