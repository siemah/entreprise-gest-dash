import React, { Component } from 'react';
import { Container, Row, Col, Preloader } from 'react-materialize';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { IntputSection } from '../../Layout/SharedUI';
import { ColButton, ErrorCollection } from '../../Layout/SharedUI';
import { addError, addProject, updateProject } from '../../../store/actions/projectActions';

import '../../../assets/css/project.css'

class Add extends Component {
  
  constructor(props) {
    super(props);
    let { editProject } = props;
    this.state = {
      name: !editProject? null : props.editProject.name,
      address: !editProject? null : props.editProject.address,
      client: !editProject? null : props.editProject.client,
      clientAddress: !editProject? null : props.editProject.clientAddress,
      clientCardNumber: !editProject? null : props.editProject.clientCardNumber,
      description: !editProject? null : props.editProject.description,
    }
  }
  

  /**
   * change event 
   */
  onChange = ({ target }) => this.setState({[target.name]: target.value })

  /**
   * sublit event
   */
  onSubmit = e => {
    e.preventDefault();
    let { state } = this;
    let { editProject } = this.props;
    for (let inx in state) 
      if( !state[inx] || !state[inx].trim().length ) {
        this.props.setError( 
          'Check Field/s value there is (one/more than one) is empty :(',
          editProject && 'POST_UPDATE_PROJECT_ERROR'
        );
        return;
      }
    !editProject?
      this.props.addProject({
        project: {...state},
        component: {
          target: e.target,
          push: this.props.history.push,
        }
      }) : 
      this.props.update({
        project: { ...state },
        currentDoc: this.props.match.params.id,
        component: {
          push: this.props.history.push,
        }
      });
  }
  
  render() {
    let { addProjectError, editProjectError, loading, isLoggedIn } = this.props;
    let editProject = this.props.editProject ? this.props.editProject : null;
    if (!isLoggedIn) return <Redirect to='/login' />
    return (
      <form method='POST' action='/' onSubmit={this.onSubmit}>
        <Container>
          <Row>
            <h1 className='col s12'>
              {editProject ? `Edit Project ${editProject.name}` : 'Add New Project'}
            </h1>            
          </Row>  
          {
            editProject? 
              editProjectError && <ErrorCollection errorMessage={editProjectError} /> :
              addProjectError && <ErrorCollection errorMessage={addProjectError} /> 
          }        
          <Row className='main-row'>
            {
              loading &&
              <Row className='preloader-container'>
                <Preloader flashing />
              </Row>
            }
            <Col s={12}>
              <Row>
                <IntputSection onChange={this.onChange} defaultValue={!editProject? '' : editProject.name} name='name' label='Project Name' s={12} m={6} />
                <IntputSection onChange={this.onChange} defaultValue={!editProject? '' : editProject.address} name='address' label='Project Address' s={12} m={6} />
                <IntputSection onChange={this.onChange} defaultValue={!editProject? '' : editProject.client} name='client' label='Client Entreprise name' s={12} m={6} xl={4} />
                <IntputSection onChange={this.onChange} defaultValue={!editProject? '' : editProject.clientAddress} name='clientAddress' label='Client address' s={12} m={6} xl={4} />
                <IntputSection onChange={this.onChange} defaultValue={!editProject? '' : editProject.clientCardNumber} name='clientCardNumber' label='Client Money Card Number' s={12} m={6} xl={4} />
                <IntputSection onChange={this.onChange} defaultValue={!editProject? '' : editProject.description} name='description' label='Description' s={12} m={6} xl={4} />
              </Row>
            </Col>
          </Row>
          <Row className='submit-section'>
            <ColButton label={!editProject? 'Save project' : 'Save changes'} disabled={loading} iconName='add' className='pink darken-2' />
          </Row>
        </Container>
      </form>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  //console.log('ownProps', ownProps.isEdit);
  let _return = {
    isLoggedIn: state.firebase.auth.uid || false,
  };
  if (!ownProps.editProject) {
    let { loading, addProjectError } = state.project;
    _return = {
      ..._return,
      loading,
      addProjectError,
    };
  } else {
    let { loading, editProjectError } = state.project;
    _return = {
      ..._return,
      loading,
      editProjectError,
    };
  }
  
  return _return
} 

const mapDispatchToProps = (dispatch, ownProps) => {
  let _return = {
    setError: (message, type) => dispatch(addError(message, type)),
  }
  if( ownProps.editProject ) 
    _return = {
      ..._return,
      update: details => dispatch(updateProject(details)),
    }
  else 
    _return = {
      ..._return,
      addProject: (details) => dispatch(addProject(details)),
    }
  return _return;
}

export default connect(mapStateToProps, mapDispatchToProps)(Add);