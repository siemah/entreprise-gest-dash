import React, { Component } from 'react';
import { Container, Row, Col, Preloader } from 'react-materialize';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { IntputSection, FileUI } from '../../Layout/SharedUI';
import { ColButton, ErrorCollection } from '../../Layout/SharedUI';
import { addAlert, add, update } from '../../../store/actions/materialActions';

//import '../../../assets/css/project.css'

class Add extends Component {
  
  constructor(props) {
    super(props);
    let { editMaterial } = props;
    this.state = {
      name: !editMaterial? null : props.editMaterial.name,
      unit: !editMaterial? null : props.editMaterial.unit,
      image: null,
      threshold: !editMaterial ? null : editMaterial.threshold,
      currency: !editMaterial ? null : editMaterial.currency,
    }
  }
  

  /**
   * change event 
   */
  onChange = ({ target }) => this.setState({[target.name]: target.value })

  /**
   * set component state of image 
   * @param {DOMEvent}
   */
  onChangeFile = ({target}) => this.setState({image: target.files[0]})

  /**
   * submit form & this fire an action to store
   */
  onSubmit = e => {
    e.preventDefault();
    let { state, props } = this;
    let { editMaterial } = this.props;
    for (let inx in state) 
      if ( (!state[inx] || !state[inx].toString().trim().length) && inx !== 'image' ) {
        props.addAlert( 
          'Check Field/s value there is (one/more than one) is empty :(',
          'POST_ADD_MATERIAL_ERROR',
        );
        return;
      }
    if (!editMaterial && state.image === null) {
      props.addAlert(
        'Choose image of material :(',
        'POST_ADD_MATERIAL_ERROR'
      );
      return;
    }
    !editMaterial?
      props.add({
        material: {...state},
        component: {
          target: e.target,
          push: this.props.history.push,
        }
      }) : 
      props.update({
        material: {
          ...state,
          currentDoc: this.props.editMaterial.id
        },
      });
  }

  /**
   * render error alert when there is one to show
   * @return {React.Component || null}
   */
  renderErrorAlertUI = () => {
    let errorMessage = this.props.editMaterial ? 
      this.props.updateMaterialError : 
      this.props.addMaterialError;
    return errorMessage && <ErrorCollection errorMessage={errorMessage} />
  }

  /**
   * render a title UI depend on adding/editing material
   * @return {React.Component}
   */
  renderTitleUI = () => {
    return (<Row>
      <h1 className='col s12'>
        {this.props.editMaterial ? `Edit Material ${this.props.editMaterial.name}` : 'Add New Material'}
      </h1>
    </Row> )
  }
  
  /**
   * render activity indicator when user submit a form
   * @return {React.Component}
   */
  renderLoadingUI = () => {
    let { addMaterialLaoding, updateMaterialLaoding } = this.props;
    return (addMaterialLaoding || updateMaterialLaoding) && (<Row className='preloader-container'>
        <Preloader flashing />
      </Row>);
  }

  /**
   * render form fields
   * @return {React.Component}
   */
  renderFormFieldUI = () => {
    let { editMaterial } = this.props;
    return (
      <Col s={12}>
        <Row>
          <IntputSection onChange={this.onChange} defaultValue={!editMaterial ? '' : editMaterial.name} name='name' label='Material Name' s={12} m={6} />
          <IntputSection onChange={this.onChange} defaultValue={!editMaterial ? '' : editMaterial.unit} name='unit' label='Material Qantity Unit' s={12} m={6} xl={4} />
          <IntputSection onChange={this.onChange} defaultValue={!editMaterial ? '' : editMaterial.threshold} name='threshold' label='Treshold To Notify' s={12} m={6} xl={4} />
          <IntputSection onChange={this.onChange} defaultValue={!editMaterial ? '' : editMaterial.currency} name='currency' label='Currency' s={12} m={6} xl={4} />
        </Row>
      </Col>
    );
  }
  
  /**
   * update current state when passed a editMaterial prop
   * @param {Object} prevProps React.Component props
   */
  componentDidUpdate = (prevProps) => {
    let {editMaterial} = this.props;
    if(prevProps.editMaterial !== editMaterial ) {
      this.setState({
        name: editMaterial.name,
        currentQuantity: !editMaterial ? '0' : editMaterial.currentQuantity,
        unit: editMaterial.unit,
        image: null,
        threshold: editMaterial.threshold,
        price: editMaterial.price,
        currency: editMaterial.currency,
      });
    }
  }
  
  render() {
    let { addMaterialLaoding, isLoggedIn } = this.props;
    let editMaterial = this.props.editMaterial || null;
    if (!isLoggedIn) return <Redirect to='/login' />
    return (
      <form method='POST' action='/' onSubmit={this.onSubmit}>
        <Container>
          { this.renderTitleUI() }  
          { this.renderErrorAlertUI() }        
          { 
            this.props.updateMaterialSuccess &&
            <ErrorCollection errorMessage={this.props.updateMaterialSuccess} className='green white-text' />
          }        
          <Row className='main-row'>
            { this.renderLoadingUI()}
            { this.renderFormFieldUI() }
          </Row>
          {
            !editMaterial && 
            <FileUI onChange={this.onChangeFile} name='image' label='Choose Image Of Material' />
          }
          <Row className='submit-section'>
            <ColButton label={!editMaterial? 'Save Material' : 'Save changes'} disabled={addMaterialLaoding} iconName='add' className='pink darken-2' />
          </Row>
        </Container>
      </form>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  let _return = {isLoggedIn: state.firebase.auth.uid || false}
  if (ownProps.editMaterial){
    let { updateMaterialLaoding, updateMaterialError, updateMaterialSuccess } = state.material;
    _return = {
      ..._return,
      updateMaterialLaoding, updateMaterialError, updateMaterialSuccess
    }
  }else {
    let { addMaterialLaoding, addMaterialError, addMaterialSuccess } = state.material;
    _return = {
      ..._return,
      addMaterialLaoding, addMaterialError, addMaterialSuccess
    }
  }
  return _return;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  let _return = {
    addAlert: (msg, type) => dispatch(addAlert(msg, type))
  };
  _return = ownProps.editMaterial?
    {
      ..._return,
      update: details => dispatch(update(details)),
    }:
    {
      ..._return,
      add: details => dispatch(add(details)),
    };
  return _return;
}

export default connect(mapStateToProps, mapDispatchToProps)(Add);