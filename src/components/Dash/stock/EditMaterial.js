import React, { Component } from 'react'
import AddMaterial from './AddMaterial';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase'
import Preloader from 'react-materialize/lib/Preloader';
import { Row } from 'react-materialize';

class EditMaterial extends Component {
  render() {
    return (
      <div>
        {
          this.props.material?
            <AddMaterial editMaterial={this.props.material} /> :
            <Row className='section center'>
              <Preloader flashing />
            </Row>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let materialID = ownProps.match.params.id;
  let { status, ordered } = state.firestore;
  let material = status.requested.materials? ordered.materials.find(m => m.id === materialID) : null;
  return {
    material,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {collection: 'materials', orderBy: ['name', 'desc']}
  ])
)(EditMaterial);
