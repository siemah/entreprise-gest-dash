import React, { Component } from 'react'
import { Container, Row, Col, Preloader } from 'react-materialize';
import { IntputSection, ColButton, ErrorCollection } from '../../Layout/SharedUI';
import { connect } from 'react-redux';
import { addMessage, setPassword } from '../../../store/actions/authActions'
import {Redirect} from 'react-router-dom'

class Password extends Component {
  
  state = {
    password: null,
    confirmation: null,
  }

  _onChange = ({target}) => this.setState({[target.name]: target.value})

  _onSubmit = e => {
    e.preventDefault();
    let {state, props} = this;
    for (let inx in state)
      if (!state[inx] || !state[inx].trim().length) {
        props.addAlert(
          'Check Field/s value there is (one/more than one) is empty :(',
          'UPDATE_PASSWORD_ERROR'
        );
        return;
      }
    
    if( state.password !== state.confirmation) {
      props.addAlert(
        'Passwor dont match to confirmation, please try again :(',
        'UPDATE_PASSWORD_ERROR'
      );
      return;
    }
    props.setPassword({
      password: state.password,
      component: {
        showSuccessAlert: props.addAlert,
        target: e.target,
      }
    });
  }

  render() {
    let { 
      updatePasswordError, 
      updatePasswordLoading, 
      isLoggedIn, 
      updatePasswordSuccess 
    } = this.props;

    if (!isLoggedIn) return <Redirect to ='/login' />
    return (
      <form method='post' onSubmit={this._onSubmit} action='/api/profile/details'>
        <Container>
          <Row className='main-row'>
            {
              updatePasswordLoading &&
              <Row className='preloader-container' style={{ marginBottom: 0 }}>
                <Col s={12}>
                  <Preloader flashing />
                </Col>
              </Row>
            }
            <Row>
              <Col s={12}><h1 className='row col s12 main-title'>Change Password</h1></Col>
              <Col s={12}>
                {
                  updatePasswordError &&
                  <Col s={12}><ErrorCollection errorMessage={updatePasswordError} /></Col>
                }
                {
                  updatePasswordSuccess &&
                  <Col s={12}><ErrorCollection errorMessage={updatePasswordSuccess} className='green white-text' /></Col>
                }
              </Col>
            </Row>
            <Row>
              <Col s={12}>
                <IntputSection onChange={this._onChange} s={12} m={6} type='password' name='password' label='New Password' />
                <IntputSection onChange={this._onChange} s={12} m={6} type='password' name='confirmation' label='Confitmation' />
              </Col>
            </Row>
            <Row>
              <Col s={12}>
                <ColButton label='update password' className='pink' iconName='save' disabled={updatePasswordLoading} />
              </Col>
            </Row>
          </Row>
        </Container>
      </form>
    
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let { updatePasswordError, updatePasswordLoading, updatePasswordSuccess } = state.auth;
  return {
    updatePasswordError,
    updatePasswordLoading,
    updatePasswordSuccess,
    isLoggedIn: state.firebase.auth.uid || false
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setPassword: data => dispatch(setPassword(data)),
    addAlert: (message, type) => dispatch(addMessage(message, type))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Password)