import React from 'react';
import { Container, Row, Col, Button, Icon, Preloader,Collection, CollectionItem } from 'react-materialize';
import { IntputSection } from '../Layout/SharedUI'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../store/actions/authActions';


class Login extends React.Component {
  
  state = {
    email: null,
    password: null,
  }

  /**
   * onchange event to save the fields value
   */
  _onChange = ({ target }) => this.setState({ [target.name]: target.value });
  
  /**
   * onsubmit event 
   */
  _onSubmit = (e) => {
    e.preventDefault();
    this.props.login({
      user: this.state,
      component: {
        push: this.props.history.push,
      },
    })
  }

  render() {
    let {error, loading, isLoggedIn} = this.props;
    if( isLoggedIn ) return <Redirect to='/' />
    return (
      <form onSubmit={this._onSubmit} className='login'>
        <Container>
          <Row >
            <Col s={12} m={3}></Col>
            <Col s={12} m={6}>
              <Row className='main-row'>
                {
                  loading &&
                  <Row className='preloader-container'>
                    <Preloader flashing />
                  </Row>
                }
                <Col s={12}>
                  <h1 className='header-title center'>Login</h1>            
                </Col>
                {
                  error &&
                  <Collection>
                    <CollectionItem className='red darken-3 white-text'>{this.props.error}</CollectionItem>
                  </Collection>
                }
                <IntputSection onChange={this._onChange} name='email' s={12} type='email' label='Your email address'/>
                <IntputSection onChange={this._onChange} name='password' s={12} type='password' label='Your password'/>
                <Col s={12}>
                  <Button waves='light' disabled={loading} className='pink darken-2 col s12'>
                    <Icon right>exit_to_app</Icon>
                    Login
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

const mapStateToProps = ({auth, firebase}, ownProps) => {
  return ({
    error: auth.loginError,
    isLoggedIn: firebase.auth.uid || false,
    loading: auth.loginLoading,
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: data => dispatch(login(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
