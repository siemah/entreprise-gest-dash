import React from 'react'
import { NavLink } from 'react-router-dom';
import { NavItem, } from 'react-materialize';

export const LoginMenu = props => { 
  return (
    <>
      <li className='dropdown-container'>
        <a href="#!">Projects</a>
        <ul className='dropdown-menu pink darken-2 projects'>
          <LinkItem to='/projects/add' label='Add Project' />
          <LinkItem to='/projects/list' label='Projects List' />          
          <LinkItem to='/projects/assign-employees' label='Assign Employees' />       
          <LinkItem to='/dashboard/analytics/projects' label='Projecs State' />       
        </ul>
      </li>
      <li className='dropdown-container'>
        <a href="#!">Employees</a>
        <ul className='dropdown-menu pink darken-2 projects'>
          <LinkItem to='/employees/add' label='Add Employee' />
          <LinkItem to='/employees/list' label='Employees List' />
        </ul>
      </li>
      <li className='dropdown-container'>
        <a href="#!">Inventory</a>
        <ul className='dropdown-menu pink darken-2 projects'>
          <LinkItem to='/materials/add' label='Add New Material' />
          <LinkItem to='/materials/list' label='Materials List' />
          <LinkItem to='/profile/password' label='Change password' />
        </ul>
      </li>
      <li className='dropdown-container'>
        <a href="#!">Profile</a>
        <ul className='dropdown-menu pink darken-2 projects'>
          <LinkItem to='/profile/details' label='Edit Infos' />
          <LinkItem to='/profile/password' label='Change password' />
          <NavItem onClick={props.logout}>logout</NavItem>
        </ul>
      </li>
    </>
  )
};

export const LogoutMenu = props => {
  return (
    <>
      <li>
        <NavLink to='/login' className=''>Login</NavLink>
      </li>
      <li>
        <NavLink to='/register' className=''>Register</NavLink>
      </li>
    </>
  )
};

const LinkItem = ({ to, label }) => (
  <li>
    <NavLink to={to}>{ label }</NavLink> 
  </li>
);
