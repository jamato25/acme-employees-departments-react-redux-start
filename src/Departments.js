import React from 'react';
import Department from './Department';
import {connect} from 'react-redux';


const Departments = ({ departments })=> {
  return (
    <ul className='departments'>
      <Department />
      {
        departments.map( department => {
          return (
            <Department
              key = { department.id }
              department = { department } />
          );
        })
      }
    </ul>
  );
}

const mapStateToProps = (state)=>{
  return {
    departments: state.departments
  }
}

export default connect(mapStateToProps)(Departments);
