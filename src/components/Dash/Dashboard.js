import React from 'react'
import { connect } from 'react-redux';
import { Redirect, } from 'react-router-dom';
import { Link } from 'react-router-dom'//
//import MaterialsChart from './stock/MaterialsChart';


class Dashboard extends React.Component {
  render() {
    let { isLoggedIn } = this.props;
    if(!isLoggedIn) return <Redirect to='/login' />
    return (
      <>
        <h1>Dashboard</h1>
        <Link to='/dashboard/analytic/projects'>Projects</Link>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.firebase.auth.uid || false,
  }
}

export default connect(mapStateToProps)(Dashboard);