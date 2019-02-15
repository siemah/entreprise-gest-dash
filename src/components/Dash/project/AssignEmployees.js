import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Collection, } from 'react-materialize';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'
import { assignEmployees, addError as addAlert } from '../../../store/actions/projectActions';
import Input from 'react-materialize/lib/Input';
import Preloader from 'react-materialize/lib/Preloader';
import { AvatarItem, ErrorCollection, ColButton, } from '../../Layout/SharedUI';

import '../../../assets/css/project.css'

class AddEmployees extends Component {

  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
  }

  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    projects: PropTypes.array.isRequired,
    employees: PropTypes.array.isRequired,
    assignEmployeesLoading: PropTypes.bool.isRequired,
    assignEmployeesSuccess: PropTypes.string,
    assignEmployeesError: PropTypes.string    
  }
  
  state = {
    employees: [],
    projectId: null,
    projectName: null,
  }

  /**
   * submit event fired by form
   * @param {DOMEvent} domevent received from DOM
   */
  _onSubmit = e => {
    e.preventDefault();
    let { state, props } = this;
    let { addAlert, assignEmployeesToProject } = props; 
    let { employees, projectId } = state;
    if (!projectId || !employees.length ){
      addAlert(
        !projectId? 
          'You must select one project :(' :
          'You must add at least on employee :(',
        'POST_ASSIGN_EMPLOYEES_TO_PROJECT_ERROR'
      );
      return;
    }
    assignEmployeesToProject({
      ...state,
      target: e.target,
      redirectTo: props.history.push,
      resetComponentState: () => {
        this.setState({
          employees: [],
          projectId: null,
          projectName: null,
        });
      },
    })
  }

  /**
   * on change event callback when checkbox fired one
   * @param {DOMEvent} domevent received from dom
   */
  _onCheck = ({ target }) => {
    let { value, checked } = target;
    if (checked) {
      let employees = [...this.state.employees, value];
      this.setState({ employees });
    }
    else {
      let employees = this.state.employees.filter(elem => elem !== value );
      this.setState({employees});
    }
  }

  /**
   * change some state field when user select a project
   * @param {DOMEvent} domevent received from dom
   */
  _onSelect = ({target}) => {
    let {name: projectName } = this.props.projects.find(prj => prj.id === target.value);
    this.setState({ projectId: target.value, projectName });
  }

  /**
   * render error or success UI depend on state of project
   */
  _renderAlertUI = () => {
    let { assignEmployeesError, assignEmployeesSuccess } = this.props;
    
    if( assignEmployeesError) 
      return <ErrorCollection errorMessage={assignEmployeesError} />
    if(assignEmployeesSuccess) 
      return <ErrorCollection errorMessage={assignEmployeesSuccess} className='green white-text' /> 
  }

  _onChange({target}) {
    let {name, checked, value, type} = target;
    console.log(type, checked, name, value);
    this.setState({[name]: value})
  }

  render() {
    let { employees, projects, assignEmployeesLoading, } = this.props;
    return (
      <Container>
        <form action='/api/project/employees/add' onSubmit={this._onSubmit} className='main-row'>
          
          {
            assignEmployeesLoading &&
            <Row className='preloader-container' style={{marginBottom: 0}}>
              <Preloader flashing />
            </Row>
          }
          <h1>Assign Employees to projects</h1>
          { this._renderAlertUI()} 
          <Input name='projectId' type='select' label='Choose a project' onChange={this._onSelect} >
            {
              projects.map(prj => <option value={prj.id} key={prj.id}>{prj.name}</option>)
            }
          </Input>
          <Collection>
            {
              employees.length? 
                employees.map(emp => <label key={emp.id} htmlFor={emp.id}>
                  <input 
                    type='checkbox' id={emp.id} name='employees' 
                    className='hide checkbox-next' 
                    value={emp.id} onChange={this._onCheck}
                  />
                  <AvatarItem employee={emp} />
                </label> ) : 
                <ErrorCollection errorMessage='Please add some employees to your entreprise' />
             }
          </Collection>

          <ColButton label='Add Employees' className='pink' iconName="add" block disabled={assignEmployeesLoading} />
        </form>
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let { ordered, status } = state.firestore;
  let { assignEmployeesLoading, assignEmployeesSuccess, assignEmployeesError } = state.project;
  return {
    isLoggedIn: state.firebase.auth.uid? true : false, 
    projects: status.requested.projects ? ordered.projects : [],
    employees: status.requested.employees? ordered.employees : [],
    assignEmployeesLoading, 
    assignEmployeesSuccess, 
    assignEmployeesError
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    assignEmployeesToProject: (details) => {
      dispatch(assignEmployees(details))
    },
    addAlert: (msg, tp) => dispatch(addAlert(msg, tp)),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'employees', orderBy: ['fname', 'asc'] },
    { collection: 'projects', orderBy: ['name', 'asc'] },
  ])
)(AddEmployees);