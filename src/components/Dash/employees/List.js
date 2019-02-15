import React from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { AvatarItem } from '../../Layout/SharedUI'
import { Container, Row, Preloader } from 'react-materialize'
import { Redirect } from 'react-router-dom';
import '../../../assets/css/employees.css'

const List = ({employees, isLoggedIn}) => {
  if(!isLoggedIn) return <Redirect to='/login' />
  
  let _render = employees.map(empl => {
      return <AvatarItem employee={empl} key={empl.id} isLink />
    });

  return (
    <Container className='employees-list'>
        { 
          employees.length?
            <ul className="collection"> {_render} </ul> : 
            <Row className='center'>
              <Preloader flashing />
            </Row>
        }
    </Container>
  )
};

const mapStateToProps = (state) => {
  let { status, ordered } = state.firestore;
  let employees = status.requested.employees? ordered.employees : [];
  return {
    employees,
    isLoggedIn: state.firebase.auth.uid || false,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([ 
    { collection: 'employees', orderBy: ['addedAt', 'desc'] } 
  ])
)(List);
