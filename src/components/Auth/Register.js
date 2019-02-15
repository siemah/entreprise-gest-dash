import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Icon, Preloader, Collection, CollectionItem } from 'react-materialize';
import { IntputSection } from '../Layout/SharedUI';
import { register } from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom';

import '../../assets/css/auth.css';

class Register extends React.Component {
  
  state = {
    email: null,
    password: null,
    fullname: null,
    mobile: null,
  }

  /**
   * onchange event to save the fields value
   */
  _onChange = ({ target }) => this.setState({ [target.name]: target.value });
  
  /**
   * empty all fields of components
   */
  emptyAllFields = (_formNode) => {
    let inputs = _formNode.querySelectorAll('input');
    inputs.forEach( inpElm => {
      inpElm.value = '';
    });
    this.setState({
      email: null,
      password: null,
      fullname: null,
      mobile: null,
    })
  }

  /**
   * onsubmit event 
   */
  _onSubmit = (e) => {
    e.preventDefault();
    this.props.signup({
      user: this.state,
      component: {
        elemNode: e.target,
        push: this.props.history.push,
        empty: this.emptyAllFields,
      }
    })
  }

  render() {
    if( this.props.isLoggedIn ) return <Redirect to='/' />
    return (
      <form onSubmit={this._onSubmit} className='login'>
        <Container>
          <Row>
            <Col s={12} m={3}></Col>
            <Col s={12} m={6}>
              <Row className='main-row'>
                {
                  this.props.loading &&
                  <Row className='preloader-container'>
                    <Preloader flashing/>
                  </Row>
                }
                <Col s={12}>
                  <h1 className='header-title center'>Register</h1>            
                </Col>
                {
                  this.props.error &&
                  <Collection>
                    <CollectionItem className='red darken-3 white-text'>{this.props.error}</CollectionItem>
                  </Collection>
                }
                <IntputSection onChange={this._onChange} name='fullname' s={12} label='Fullname'/> 
                <IntputSection onChange={this._onChange} name='mobile' s={12} type='tel' label='Mobile number'/>
                <IntputSection onChange={this._onChange} name='email' s={12} type='email' label='Email address'/>
                <IntputSection onChange={this._onChange} name='password' s={12} type='password' label='Password'/>
                <Col s={12}>
                  <Button 
                    waves='light' 
                    disabled={this.props.loading} 
                    className='pink darken-2 col s12'>
                    <Icon right>exit_to_app</Icon>
                    Register
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col s={12} m={3}></Col>
          </Row>
        </Container>
      </form>
    );
  }

}

/**
 * get state from store & pass them
 * like a props to this component
 */
const mapStateToProps = ({ auth, firebase }, ownProps) => {
  let { registerLoading: loading, registerError: error } = auth;
  console.log(firebase.auth.uid)
  return {
    isLoggedIn: firebase.auth.uid || false,
    loading, 
    error,
  }
}

/**
 * dispatch an action from Register
 * component to change some state in store
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signup: data => dispatch(register(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);



