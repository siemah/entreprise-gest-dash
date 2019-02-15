import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { ChartCard } from '../../../Layout/SharedUI';

class MaterialsChart extends Component {
  
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    materials: PropTypes.array.isRequired,
  }

  getFormatedDate(timestamp) {
    let date = new Date(timestamp);
    let d = date.getDate();
    let m = date.getMonth()+1;
    let y = date.getFullYear();
    return `${d}/${m}/${y}`;
  }

  render() {
    let {materials} = this.props;
    
    if(!this.props.isLoggedIn) return <Redirect to='/login' />
    return (
      <div>
        <h1>Materials Quantities</h1>
        {
          materials.map( material => {
            return (
              <ChartCard 
                key={material.id} 
                data={material} 
               />
            )
          })
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
      isLoggedIn: (state.firebase.auth.uid && true) || false,
      materials: state.firestore.ordered.materials || [],
    }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'materials', orderBy: ['name', 'asc'] },
  ])
)(MaterialsChart);