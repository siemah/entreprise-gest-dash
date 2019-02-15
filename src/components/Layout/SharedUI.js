import React from 'react';
import { Link } from 'react-router-dom'
import { Input, Button, Row, Col, Icon, Collection, CollectionItem, } from 'react-materialize';
import { Line } from 'react-chartjs-2';
import Table from 'react-materialize/lib/Table';
//import { Line } from 'react-chartjs-2';
import DATACHARTSTRUCTURE from '../../config/lineChartDataStructure';

export const CollectionItemAvatar = ({ projectId, emplID, title, iconName, iconClass, imgSource, first, second, onDelete}) => {
  return (
    <li className="collection-item avatar">
      {iconName && <i className={"material-icons circle " + iconClass}>{iconName}</i> }
      { imgSource && <img src={imgSource} alt={title} className='circle'/> }
      <span className={"title "}>{title}</span>
      <p>{first}<br/>
        {second}
      </p>
      {
        onDelete && (<button className="close" onClick={e => onDelete(projectId, emplID)}>
          <Icon className='pink-text' >delete</Icon>
        </button>)
      }
    </li>
  );
}

export const CustomTable = ({thead, tbody}) => (
  <Table>
    <thead>
      <tr>
        {
          thead.map((td, i) => <td key={i}>{td}</td>)
        }
      </tr>
    </thead>
    <tbody>
      {
        tbody.map((tr, i) => (
          <tr key={i}>
            {
              tr.map((td, i) => <td key={i}>{td}</td>)
            }
          </tr>
        ))
      }
    </tbody>
  </Table>
)

export const ChartCard = ({data, title, id, ...props}) => {
  const getLineChartData = (inventoryHistory, name, unit) => {
    let labels = [], data = [];
    inventoryHistory.map(inventory => {
      labels = [...labels, inventory.dateOfInventory];
      data = [...data, inventory.quantity];
      return true;
    });
    return {
      ...DATACHARTSTRUCTURE,
      labels,
      datasets: [{
        ...DATACHARTSTRUCTURE.datasets,
        label: `${name} quantity per ${unit}`,
        data,
      }],
    };
  }
  let tbody = data.inventoryHistory.map( invnt => (
    [
      `${invnt.quantity} ${data.unit}`,
      `${invnt.price} ${data.currency}`,
      `${invnt.dateOfInventory}`,
    ]
  ));
  //console.log(dataChart)
  return (
    <div className="card z-depth-0">
      <div className="card-image waves-effect waves-block waves-light lighten-1">
        <h4 className='card-image'>{data.name}</h4>
        <div>
          <Line
            data={getLineChartData(data.inventoryHistory, data.name, data.unit)} 
            height={100}
          />
        </div>
      </div>
      <div className="card-content">
        <span className="card-title activator grey-text text-darken-4">
          See {data.name} Details 
          <a href='#1'
            style={{ position: 'relative', top: 0, right: 0 }}
           className='btn-floating halfway-fab waves-effect waves-light red right'>
            <i className="material-icons" style={{ lineHeight: 'inherit' }} >more_vert</i>
          </a>
        </span>
        <p><Link to={`/materials/edit/${id}`}>Mpdify {data.name}</Link></p>
      </div>
      <div className="card-reveal">
        <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
          <CustomTable 
            thead={['Quantity', 'Price', 'Date']}
            tbody={tbody} />
        </div>
    </div>
  );
}


export const MaterialItem = ({material, onClick}) => {
  let inventoryDetail ={ id: material.id, name: material.name, unit: material.unit, };
  return (
    <tr>
      <td>{material.name}</td>
      <td>{material.currentQuantity} {material.unit}</td>
      <td>
        <Button waves='light' onClick={e => onClick(e, inventoryDetail)} className='pink darken-3'>
          add quantity
          <Icon left>add</Icon>
        </Button>
      </td>
      <td>
        <Link to={`/materials/edit/${material.id}`}>
          Edit material
          <Icon left>edit</Icon>
        </Link>
      </td>
      <td></td>
    </tr>
  );
}

export const FileUI = ({ name, label, onChange, ...props}) => (<Row>
  <IntputSection
    name={name || 'image'} 
    type='file' label={label || 'Choose File'} 
    onChange={onChange} s={12} 
    {...props} />
</Row>) 

export const AvatarItem = ({employee, isLink, ...props}) => {
  let {id, image:src, lname, fname, job, mobile} = employee;
  let content = (<>
    <img src={src} alt={lname + ' ' + fname} className="circle" />
    <strong className="title-name">
      {lname + ' ' + fname}
    </strong>
    <p>
      Post: {job}<br />
      Mobile: {mobile}
    </p>
    <div className="secondary-content">
      <Icon className='pink-text' medium>keyboard_arrow_right</Icon>
    </div>
  </>);

  return (
    <li className="collection-item avatar" style={{cursor: 'pointer'}} {...props}>
      {
        isLink?
          <Link to={`/employees/edit/${id}`}>
            {content}
          </Link> : 
          content
      }
    </li>
  )
}

export const IntputSection = ({ name, label, type, ...props }) => {
  if( type === 'file' ){
    return (
      <Input
        name={name}
        s={12}
        label={label}
        type={type || 'text'}
        {...props}
      />
    )
  }
  // focus event 
  const onFocus = e => e.target.nextElementSibling.className = 'active';
  // abort event 
  const onBlur = e => {
    let _target = e.target;
    if (!_target.value.trim().length)
      _target.nextElementSibling.className = ''
  }
  
  return (
    <Input
      name={name}
      s={12}
      label={label}
      type={type || 'text'}
      onFocus={onFocus}
      onBlur={onBlur}
      {...props}
    />
  )
}

export const ColButton = ({ disabled, label, block, iconName, ...props }) => (
  <Col s={12}>
    <Button waves='light' style={{ width: block? '100%' : 'initial'}} disabled={disabled} {...props}>
      <Icon right>{iconName}</Icon>
      {label}
    </Button>
  </Col>
);

export const ProjectsList = ({ projects }) => {
  const ProjectsCollections = projects.map( ({ id, name, address, client }) => {
    return (
    <CollectionItem className={`project-summary project-${id} left-text`} key={id}>
      <div className="right">
        <Link to={'/projects/edit/' + id} >
          <Icon small className='grey-text'>edit</Icon>
        </Link>&nbsp;
        <Link to={'/projects/' + id} >
          <Icon small className='grey-text'>remove_red_eye</Icon>
        </Link>
      </div>
      <span><Icon className='red-text' tiny>build</Icon>&nbsp; {name}</span><br/>
      <span><Icon className='blue-text' tiny>location_on</Icon>&nbsp; {address}</span><br /> 
      <span><Icon className='green-text' tiny>business</Icon>&nbsp; {client}</span>
    </CollectionItem>
    )}
  );
  return (
  <Collection className='projects-list'>
    { ProjectsCollections }
  </Collection>
)};

export const ErrorCollection = ({ errorMessage, ...props }) => {
  return(
    <Collection>
      <CollectionItem className='red darken-3 white-text'  {...props}>
        {errorMessage}
      </CollectionItem>
    </Collection>
  )
}
