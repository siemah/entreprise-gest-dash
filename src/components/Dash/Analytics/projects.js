import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom'
import { Preloader, Col } from 'react-materialize';
import { deleteEmployees } from '../../../store/actions/projectActions'
import Row from 'react-materialize/lib/Row';
import EmployeesListUI from './widgets/EmployeesListUI';
import MaterialsChart from './widgets/MaterialsChart';

class ProjectsDash extends Component {

  /**
   * delete an employee from a defined project
   * @param {String} projectId id of project
   * @param {String} employeeId id of employee to delete from project
   * @see __dirname/store/action/projectActions.js
   */
  _onDelete = (projectId, employeId) => {
    this.props.declineEmployees(projectId, employeId, this.props.history.push);
  }

  /**
   * render list of employees work on each project
   */
  _renderProjectsEmployeesListUI() {
    let { projectsList, employeesList } = this.props;
    if (projectsList && employeesList) {
      return projectsList.map(project => (
        <Col s={12} m={6} key={project.id} >
          <EmployeesListUI onDelete={this._onDelete}currentProject={project} employees={employeesList} />
        </Col>
      ))
    }
    return <div className='center'> <Preloader flashing /> </div>
  }

  render() {
    let { isLoggedIn } =  this.props;
    if( !isLoggedIn ) return <Redirect to='/login' />
    return (
      <div className='section dashboard-projects'>
        <h1>Project Analytic</h1>
        <div style={{margin: 10}}>
          <Row>
            {this._renderProjectsEmployeesListUI()}
          </Row>
          <Row>
            <MaterialsChart />
          </Row>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  let { status, ordered } = state.firestore;
  return {
    projectsList:  status.requested.projects? ordered.projects : null,
    employeesList: status.requested.employees? ordered.employees : null,
    materialsList: status.requested.materials? ordered.materials : null,
    isLoggedIn: state.firebase.auth.uid || false,
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    declineEmployees: (projectId, employeId, push) => dispatch(deleteEmployees(projectId, employeId, push))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'projects', orderBy: ['name', "asc"] },
    { collection: 'employees', orderBy: ['fname', "asc"] },
    { collection: 'materials', orderBy: ['name', "asc"] },
  ])
)(ProjectsDash);