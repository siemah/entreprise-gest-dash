import React from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { Container, Input, Row, Table, ProgressBar, Col, Collection, CollectionItem, Preloader } from 'react-materialize';
import { MaterialItem, IntputSection, ColButton, } from '../../Layout/SharedUI';
import { modifyInventory } from '../../../store/actions/materialActions';
import { dispatchAction } from '../../../store/tools/shareActions';

import '../../../assets/css/materials.css';

class MaterialsList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      showModal: false,
      currentMaterialName: '',
      currentMaterialId: null,
      unit: '',
      material: {
        quantityToAdd: '0',
        price: '',
        addedAt: null,
        projectId: null,
      }
    }
    this.modalRef = React.createRef();
  }

  renderMaterialsListUI = () => {
    return this.props.materials.map(material => (
      <MaterialItem onClick={this._onShowBottomModel} material={material} key={material.id}/>
    ));
  }

  _onChange = ({ target }) => {
    let material = { [target.name]: target.value };
    this.setState((prevState) => ({ material: { ...prevState.material, ...material} }));
  }

  _onShowBottomModel = (e, { id: currentMaterialId, name: currentMaterialName, unit }) => {
    if (this.modalRef.current.quantityToAdd) {
      this.modalRef.current.quantityToAdd.autofocus = true;
    }
    this.modalRef.current.classList.add('show');
    this.setState({ currentMaterialId, currentMaterialName, unit });
  }

  hideBottomModal = e => {
    this.modalRef.current.classList.remove('show');
    this.props.dispatchAction('UPDATE_MATERIAL_INVENTORY_INIT');
  }

  _onSubmit = e => {
    e.preventDefault();
    let { state, props } = this;
    for (let inx in state.material){
      if( !state.material[inx] || !state.material[inx].trim().length ){
        props.dispatchAction(
          'UPDATE_MATERIAL_INVENTORY_ERROR',
          'You should fill all fields :('
        );
        return ;
      }
    }
    this.props.modifyInventory({
      ...state.material,
      currentMaterialId: state.currentMaterialId,
      currentMaterialName: state.currentMaterialName,
      unit: state.unit,
    });
  }

  _renderActivityIndicator = () => {
    return (
      this.props.updateMaterialInventoryLaoding &&
      <Row className='preloader-container'>
        <Preloader flashing />
      </Row>
    );
  }

  _renderErrorAlertUI = () => {
    let { updateMaterialInventoryError:errMsg} = this.props;
    return errMsg && <Collection s={12}>
      <CollectionItem className='red darken-4 white-text'>{errMsg}</CollectionItem>
    </Collection>    
  }

  render() {
    let { isLoggedIn, updateMaterialInventoryLaoding, updateMaterialInventorySuccess, projects } = this.props;
    if(!isLoggedIn) return <Redirect to='/login' />
    return (<Container>
      <Table className='responsive-table striped'>
        <thead>
          <tr>
            <td>Material</td>
            <td>Quantity</td>
            <td>Add New Quantity</td>
            <td>Modify Material</td>
          </tr>
        </thead>
        <tbody>
          { 
            this.props.materials.length?
              this.renderMaterialsListUI() :
              <tr><td colSpan={'4'}><ProgressBar className='pink' /></td></tr>
          }
        </tbody>
      </Table>
      <form onSubmit={this._onSubmit} ref={this.modalRef} id="modal1" className="modal bottom-sheet">
        { this._renderActivityIndicator() }
        <div className="modal-content" style={{paddingBottom: 0}}>
          <h6>Add New Quantity Of {this.state.currentMaterialName} </h6>
          <Row>
            {
              updateMaterialInventorySuccess?
              <Collection s={12}>
                <CollectionItem className='green darken-4 white-text'>{updateMaterialInventorySuccess}</CollectionItem>
              </Collection> :
              <>
                { this._renderErrorAlertUI() }
                <IntputSection name='quantityToAdd' type='number' label={`New Quantity per ${this.state.unit}`} onChange={this._onChange} s={12} m={6} l={3} />
                <IntputSection name='price' type='number' label='Price' onChange={this._onChange} s={12} m={6} l={3} />
                <IntputSection name='addedAt' type='date' label='Added At' onChange={this._onChange} s={12} m={6} l={3} />
                <Col s={12} m={6} l={3}>
                  <Input s={12} type='select' label="Choose Project" name='projectId' defaultValue={projects.length && projects[0].id} onChange={this._onChange}>
                    {
                      projects.map(prj=>(<option key={prj.id} value={prj.id}>{prj.name}</option>))
                    }
                  </Input>
                </Col>
                <input type='hidden' name='materialId' value={this.state.currentMaterialId || ''} />
                <ColButton s={12} m={6} l={3} className='pink' iconName='add' label='Add Quantity' disabled={updateMaterialInventoryLaoding}></ColButton>
              </>
            }
          </Row>
        </div>
      </form>
      <div className="modal-overlay" onClick={this.hideBottomModal}></div>
    </Container>)
  }

}

const mapStateToProps = (state, ownProps) => {
  let { status, ordered } = state.firestore;
  return {
    materials: status.requested.materials ? ordered.materials : [],
    projects: status.requested.projects? ordered.projects : [],
    isLoggedIn: state.firebase.auth.uid || false,
    updateMaterialInventoryLaoding: state.material.updateMaterialInventoryLaoding,
    updateMaterialInventoryError: state.material.updateMaterialInventoryError,
    updateMaterialInventorySuccess: state.material.updateMaterialInventorySuccess,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    modifyInventory: (details) => dispatch(modifyInventory(details)),
    dispatchAction: (type, message) => dispatch(dispatchAction(type, message)),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'materials', orderBy: ['name', 'asc'] },
    { collection: 'projects', orderBy: ['name', 'asc'] },
  ])
)(MaterialsList);