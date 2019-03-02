import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Container, Row, } from 'react-materialize'; 

import { ProjectsList } from '../../Layout/SharedUI';
import Preloader from 'react-materialize/lib/Preloader';

const List = ({isLoggedIn, projects}) => {
  
  if (!isLoggedIn) return <Redirect to='/' />;
  return (
    <Container>
      <Row><h1>Projects List</h1></Row>
      <Row className='center'>
      {
        !projects.length?
          <Preloader flashing /> :
          <ProjectsList projects={projects} />
      }
      </Row>
    </Container>
  );

}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.firebase.auth.uid || false,
    projects: state.firestore.ordered.projects || []
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'projects', orderBy: ['createdAt', 'desc'] },
  ])
)(List)