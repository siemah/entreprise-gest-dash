import React from 'react';
import { Container, Navbar } from 'react-materialize';
import { NavLink } from 'react-router-dom';
import { LoginMenu, LogoutMenu } from './NavbarMenus';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/authActions'
import '../../assets/css/navbar.css';

const MainNavbar = props =>  {

  return (
    <Navbar className='pink'>
      <Container>
        <NavLink to='/' className='brand-logo'>awid</NavLink>
        <ul className='right'>
          {
            props.isLoggedIn? 
              <LoginMenu logout={props.logout} /> :
              <LogoutMenu /> 
          }
        </ul>
      </Container>
    </Navbar>
  )
}

const mapStateToProps = (state, ownProps) => { 
  return {
    isLoggedIn: state.firebase.auth.uid || false,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainNavbar);