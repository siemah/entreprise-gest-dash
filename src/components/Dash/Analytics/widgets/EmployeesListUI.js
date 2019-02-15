import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Collection, } from 'react-materialize';
import { CollectionItemAvatar } from '../../../Layout/SharedUI';
import Row from 'react-materialize/lib/Row';
import ProgressBar from 'react-materialize/lib/ProgressBar';

class EmployeesListUI extends Component {

  uniqueEmployeesId = array => {
    let projectEmployees = [];
    array.forEach(empId => {
      if (!projectEmployees.includes(empId)) {
        projectEmployees = [...projectEmployees, empId];
      }
    });
    return projectEmployees;
  }

  render() {
    let { employees, onDelete, currentProject:project, declineEmployeesLoading } = this.props;
    let projectEmployees = this.uniqueEmployeesId(project.employees);
    return (
      <Collection className='projects-list z-depth-1'>
        {
          declineEmployeesLoading ?
            <Row style={{ marginBottom: 0 }} className='preloader-container'>
              <ProgressBar className='pink' />
            </Row>:
            <></>
        }
        <CollectionItemAvatar 
          title={project.name}
          iconName='card_travel' iconClass='cyan'
          first={`${project.client} at ${project.address}`}
        />

        {
          projectEmployees.map( emplID => {
            let { fname, lname, image, job, address, mobile, } = employees.find(empl => empl.id === emplID)
            return (
              <CollectionItemAvatar 
                key={emplID} 
                projectId={project.id} 
                emplID={emplID}
                title={`${fname} ${lname}`} 
                imgSource={image}
                first={`Job: ${job}, mobile: ${mobile}`} 
                second={`Address: ${address}`} 
                onDelete={onDelete} />
            )
          })
        }


      </Collection>

    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    declineEmployeesLoading: state.project.declineEmployeesLoading
  }
}
export default connect(mapStateToProps)(EmployeesListUI)    