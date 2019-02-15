import React from 'react';
import EditForm from './Add';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Preloader } from 'react-materialize'
import Container from 'react-materialize/lib/Container';

const Edit = (props) => {
  return (
    <>
    {
      !props.employee ? 
        <Container className='center'>
          <Preloader flashing /> 
        </Container>:
        <EditForm editEmployee={props.employee} {...props} />
    }
    </>
  )
  
}

const mapStateToProps = (state, ownProps) => {
  let { status, ordered } = state.firestore
  let employee = status.requested.employees?
    ordered.employees.find(employee => employee.id===ownProps.match.params.id):
    null;
  return {
    employee
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'employees', }])
)(Edit);