import React, { Component } from 'react'
import { Container, Row, Preloader, Col } from 'react-materialize';
import { connect } from 'react-redux'
import { IntputSection, ColButton, ErrorCollection } from '../../Layout/SharedUI'
import { Redirect } from 'react-router-dom'
import { addEmployee, addAlert, updateEmployee } from '../../../store/actions/employeeActions'

class Add extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fname: props.editEmployee? props.editEmployee.fname : null,
      lname: props.editEmployee? props.editEmployee.lname : null,
      address: props.editEmployee? props.editEmployee.address : null,
      mobile: props.editEmployee? props.editEmployee.mobile : null,
      salary: props.editEmployee? props.editEmployee.salary : null,
      salaryPre: props.editEmployee? props.editEmployee.salaryPre : null,
      duration: props.editEmployee? props.editEmployee.duration : null,
      job: props.editEmployee? props.editEmployee.job : null,
      image: props.editEmployee? props.editEmployee.image : null,
    }

  }

  _onChange = ({ target }) => this.setState({ [target.name]: target.value })

  _onChangeFilePath = ({ target }) => {
    this.setState({ [target.name]: target.files[0] })
  }

  _onSubmit = e => {
    e.preventDefault();
    let { state, props } = this;
    let { editEmployee } = props;
    for (let inx in state)
      if ((!state[inx] || !state[inx].toString().trim().length) && inx !== 'image') {
        props.addAlert(
          'Check Field/s value there is (one/more than one) is empty :(',
          !editEmployee ? 'POST_ADD_EMPLOYEE_ERROR' : 'UPDATE_EMPLOYEE_ERROR'
        );
        return;
      }
    if ( !editEmployee && state.image === null) {
      props.addAlert(
        'Choose image of employee :(',
        'POST_ADD_EMPLOYEE_ERROR'
      );
      return;
    }
    if( !editEmployee )
      props.add({
        employee: state,
        component: {
          push: props.history.push,
        }
      });
    else props.update({
      employee: { ...state, id: props.match.params.id },
    })
  }

  renderHeaderUI = () => {
    let { editEmployee } = this.props;
    return editEmployee ?
      <h1>Edit {editEmployee.fname + " " + editEmployee.lname}</h1> :
      <h1>Add Contract Employee</h1>
  }

  renderErrorAlertUI = () => {
    let { editEmployee, editEmployeeError, addEmployeeError } = this.props;
    return editEmployee ?
      editEmployeeError && <ErrorCollection errorMessage={editEmployeeError} /> :
      addEmployeeError && <ErrorCollection errorMessage={addEmployeeError} />
  }

  renderSuccessAlertUI = () => {
    let { editEmployeeSuccess } = this.props;
    return editEmployeeSuccess && <ErrorCollection errorMessage={editEmployeeSuccess} className='green white-text' />
  }

  renderLoadingUI = () => {
    let { addEmployeeLoading, editEmployeeLoading } = this.props;
    return (addEmployeeLoading || editEmployeeLoading) &&
      <Row className='preloader-container'>
        <Preloader flashing />
      </Row>
  }

  renderFileUI = isRender => (
    isRender && (<Row>
      <IntputSection
        onChange={this._onChangeFilePath}
        name='image' type='file' label='Employee Image' s={12} />
    </Row>)
  )

  render() {
    let { isLoggedIn, editEmployee } = this.props;

    if (!isLoggedIn) return <Redirect to='/login' />
    return (
      <form action='/api/employees/add' onSubmit={this._onSubmit}>
        <Container>
          <Row>{this.renderHeaderUI()} </Row>
          <Row className='main-row'>
            {this.renderLoadingUI()}
            {this.renderErrorAlertUI()}
            {this.renderSuccessAlertUI()}
            <Row style={{marginBottom: 0}}>
              <Col s={12} style={{ padding: 0 }}>
                {
                  editEmployee && 
                  <Col s={12} m={4} className='employee-photo' style={{ backgroundImage: `url(${editEmployee.image})`}}></Col>
                }
                <Col s={12} m={editEmployee && 8} style={{padding: 0}}>
                  <IntputSection defaultValue={editEmployee ? editEmployee.fname : ''} onChange={this._onChange} name='fname' label='Employee First Name' s={12} m={editEmployee? 12 : 6} />
                  <IntputSection defaultValue={editEmployee ? editEmployee.lname : ''} onChange={this._onChange} name='lname' label='Employee Last Name' s={12} m={editEmployee? 12 : 6} />
                </Col>
              </Col>
            </Row>
            <Row>
              <IntputSection defaultValue={editEmployee ? editEmployee.address : ''} onChange={this._onChange} name='address' type='' label='Address Of Employee' s={12} m={6} />
              <IntputSection defaultValue={editEmployee ? editEmployee.mobile : ''} onChange={this._onChange} name='mobile' type='tel' label='Mobile Of Employee' s={12} m={6} />
            </Row>
            <Row>
              <IntputSection defaultValue={editEmployee ? editEmployee.job : ''} onChange={this._onChange} name='job' label='Employee Job' s={12} m={6} />
              <IntputSection defaultValue={editEmployee ? editEmployee.duration : ''} onChange={this._onChange} name='duration' label='Contract Duration' s={12} m={6} />
            </Row>
            <Row>
              <IntputSection defaultValue={editEmployee ? editEmployee.salary : ''} onChange={this._onChange} name='salary' type='number' label='Salary Of Employee' s={8} />
              <IntputSection defaultValue={editEmployee ? editEmployee.salaryPre : ''} onChange={this._onChange} name='salaryPre' label='Salary Per' s={4} />
            </Row>
            <>{this.renderFileUI(!editEmployee)}</>
            <Row>
              <ColButton label='Add Employee' iconName='add' className='pink' />
            </Row>
          </Row>
        </Container>
      </form>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let _return = {
    isLoggedIn: state.firebase.auth.uid || false,
  };
  if (!ownProps.editEmployee) {
    let { addEmployeeLoading, addEmployeeError, addEmployeeSuccess, } = state.employee;
    _return = {
      ..._return,
      addEmployeeLoading,
      addEmployeeError,
      addEmployeeSuccess,
    }
  } else {
    let { editEmployeeLoading, editEmployeeError, editEmployeeSuccess, } = state.employee;
    _return = {
      ..._return,
      editEmployeeLoading,
      editEmployeeError,
      editEmployeeSuccess,
    }
  }

  return _return;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  let _return = {
    addAlert: (message, type) => dispatch(addAlert(message, type)),
  }
  _return = !ownProps.editEmployee ?
    {
      ..._return,
      add: (data) => dispatch(addEmployee(data)),
    } :
    {
      ..._return,
      update: (data) => dispatch(updateEmployee(data)),
    };
  return _return;
}

export default connect(mapStateToProps, mapDispatchToProps)(Add);