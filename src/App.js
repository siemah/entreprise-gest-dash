import React, { Component, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ProgressBar } from 'react-materialize'

import MainNavbar from './components/Layout/MainNavbar'


import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';

/** register & login components */
//import Login from './components/Auth/Login';
const Login = lazy( () => import('./components/Auth/Login') ) ;
//import Register from './components/Auth/Register';
const Register = lazy( () => import('./components/Auth/Register'));
/** dashbaord components */
//import Dashboard from './components/Dash/Dashboard';
const Dashboard = lazy( () => import( './components/Dash/Dashboard' ) );
//import AddProject from './components/Dash/project/Add';  
const AddProject = lazy( () => import('./components/Dash/project/Add') );  
//import AddProjectEmployees from './components/Dash/project/AssignEmployees';  
const AddProjectEmployees = lazy ( () => import ('./components/Dash/project/AssignEmployees') );  
//import EditProject from './components/Dash/project/Edit'; 
const EditProject = lazy( () => import( './components/Dash/project/Edit' ) ); 
//import ListProject from './components/Dash/project/List'; 
const ListProject = lazy( () => import('./components/Dash/project/List')); 
/** Employee */
//import AddEmployee from './components/Dash/employees/Add'; 
const AddEmployee = lazy( () => import('./components/Dash/employees/Add')); 
//import EmployeesList from './components/Dash/employees/List'; 
const EmployeesList = lazy( () => import('./components/Dash/employees/List')); 
//import EditEmployee from './components/Dash/employees/Edit'; 
const EditEmployee = lazy( () => import('./components/Dash/employees/Edit')); 
/** propfile componenes */
//import Password from './components/Auth/Profile/Password';
const Password = lazy( () => import ('./components/Auth/Profile/Password'));
//import Details from './components/Auth/Profile/Details';
const Details = lazy( () => import ('./components/Auth/Profile/Details') );
//import AddMaterial from './components/Dash/stock/AddMaterial';
const AddMaterial = lazy( () => import ('./components/Dash/stock/AddMaterial'));
//import EditMaterial from './components/Dash/stock/EditMaterial';
const EditMaterial = lazy( () => import('./components/Dash/stock/EditMaterial'));
//import MaterialsList from './components/Dash/stock/MaterialsList';
const MaterialsList = lazy ( () => import ('./components/Dash/stock/MaterialsList'));

//import ProjectsAnalytic from './components/Dash/Analytics/projects';
const ProjectsAnalytic = lazy( () => import ('./components/Dash/Analytics/projects'));

const withLoadingIndicator = (Component) => {
  return props => <Suspense fallback={<ProgressBar />}><Component {...props} /></Suspense>
}

class App extends Component {
  render() {
   return (
    <BrowserRouter>
      <Switch>
      <>
        <MainNavbar />
        <div className='section'>
          <Route exact path='/dashboard' component={withLoadingIndicator(Dashboard)} />
          <Route component={withLoadingIndicator(Login)} path='/login' />
          <Route component={withLoadingIndicator(Register)} path='/register' />
          <Route component={withLoadingIndicator(Password)} path='/profile/password' />
          <Route component={withLoadingIndicator(Details)} path='/profile/details' />
          <Route component={withLoadingIndicator(AddProject)} path='/projects/add' />
          <Route component={withLoadingIndicator(AddProjectEmployees)} path='/projects/assign-employees' />
          <Route component={withLoadingIndicator(EditProject)} path='/projects/edit/:id' />
          <Route component={withLoadingIndicator(ListProject)} path='/projects/list' />
          <Route component={withLoadingIndicator(AddEmployee)} path='/employees/add' />
          <Route component={withLoadingIndicator(EmployeesList)} path='/employees/list' />
          <Route component={withLoadingIndicator(EditEmployee)} path='/employees/edit/:id' />
          <Route component={withLoadingIndicator(AddMaterial)} path='/materials/add' />
          <Route component={withLoadingIndicator(MaterialsList)} path='/materials/list' />
          <Route component={withLoadingIndicator(EditMaterial)} path='/materials/edit/:id' />
          <Route path='/dashboard/analytics/projects' component={withLoadingIndicator(ProjectsAnalytic)} />
        </div>
      </>
      </Switch>
    </BrowserRouter>
   )
  }
}

export default App;
