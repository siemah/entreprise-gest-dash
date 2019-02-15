import React from 'react';
import EditForm from './Add';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Preloader } from 'react-materialize'
import Container from 'react-materialize/lib/Container';

const Edit = (props) => {
  console.log("editProject", props);
  return (
    <div>
    {
      !props.project ? 
        <Container className='center'>
          <Preloader flashing /> 
        </Container>:
          <EditForm editProject={props.project} {...props} />
    }
    </div>
  )
  
}

const mapStateToProps = (state, ownProps) => {
  let { status, ordered } = state.firestore
  let project = status.requested.projects?
    ordered.projects.find(project => project.id===ownProps.match.params.id):
    null;
  return {
    isLoading: false,
    project
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'projects', }])
)(Edit);