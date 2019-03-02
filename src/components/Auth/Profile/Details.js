import React, { Component } from 'react'
import { Container, Row, Col, Preloader } from 'react-materialize';
import { IntputSection, ColButton, ErrorCollection } from '../../Layout/SharedUI';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { addMessage, updateDetails} from '../../../store/actions/authActions'

class Details extends Component {
  
  state = {
    fname: null,
    lname: null,
    address: null,
    mobile: null,
    bio: null,
  }

  /**
   * on change event for input fields & change the current value in state
   * @param {HTMLElement} target is destructed from DOMEvent is the current dom elemen
   */
  _onChange = ({target}) => this.setState({[target.name]: target.value})

  /**
   * submit event send a data to backend(server)
   * @param {DOMEvent} e event receive from DOM
   */
  _onSubmit = e => {
    e.preventDefault();
    let {state, props} = this;
    for (let inx in state)
      if (!state[inx] || !state[inx].trim().length) {
        props.addAlert(
          'Check Field/s value there is (one/more than one) is empty :(',
          'UPDATE_PROFILE_DETAILS_ERROR'
        );
        return;
      }
    props.update({
      details: state,
      component: {
        push: props.history.push,
      }
    })
  }

  componentDidUpdate = (prevProps, prevState) => {
    let { profile } = this.props;
    if( prevProps.profile !== profile ) {
      this.setState({
        fname: profile.fname || '',
        lname: profile.lname || '',
        address: profile.address || '',
        mobile: profile.mobile || '',
        bio: profile.bio || ''
      })
    }
  } 

  render() {
    let { updateProfileError, updateProfileLoading, isLoggedIn, profile} = this.props;
    if (!isLoggedIn) return <Redirect to='/login' />
    return (
      <form method='post' onSubmit={this._onSubmit} action='/api/profile/details'>
        <Container>
        {
          this.props.profile?
            <Row className='main-row'>
              {
                updateProfileLoading &&
                <Row className='preloader-container' style={{ marginBottom: 0 }}>
                  <Col s={12}>
                    <Preloader flashing />
                  </Col>
                </Row>
              }
              <Row>
                <Col s={12}><h1 className='row col s12 main-title'>Change Profile Details</h1></Col>
                <Col s={12}>
                  {
                    updateProfileError &&
                    <Col s={12}><ErrorCollection errorMessage={updateProfileError} /></Col>
                  }
                </Col>
              </Row>
              <Row>
                <Col s={12}>
                  <IntputSection onChange={this._onChange} s={12} m={6} defaultValue={profile.fname || ''} name='fname' label='First Name' />
                  <IntputSection onChange={this._onChange} s={12} m={6} defaultValue={profile.lname || ''} name='lname' label='Last Name' />
                </Col>
                <Col s={12}>
                  <IntputSection onChange={this._onChange} s={12} m={6} defaultValue={profile.address} name='address' label='Your Address' />
                  <IntputSection onChange={this._onChange} s={12} m={6} defaultValue={profile.mobile || ''} type='tel' name='mobile' label='Phone Number' />
                </Col>
              </Row>
              <Row>
                <Col s={12}>
                  <IntputSection onChange={this._onChange} s={12} type='textarea' defaultValue={profile.bio || ''} name='bio' label='Bio, about yourself' />
                </Col>
              </Row>
              <Row>
                <Col s={12}>
                  <ColButton label='Save changes' className='pink' iconName='save' disabled={updateProfileLoading} />
                </Col>
              </Row>
            </Row> : 
            <Row className='center'>
              <Preloader flashing />
            </Row>
        }  
        </Container>
      </form>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let { updateProfileError, updateProfileLoading, } = state.auth;
  return {
    updateProfileError,
    updateProfileLoading,
    isLoggedIn: state.firebase.auth.uid || false,
    profile: state.firebase.profile.isLoaded ? state.firebase.profile : null,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    update: (details) => dispatch(updateDetails(details)),
    addAlert: (message, type) => dispatch(addMessage(message, type)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details); 