import React from 'react';
import Employees from './Employees';
import { connect } from 'react-redux';

const Department = ({ department, employees})=> {
    return (
      <li>
        <span className='department-title'>
          { department ? department.name : 'No Department' } ({
            employees.filter( employee => employee.departmentId === (department ? department.id : null) ).length
          })
        </span>
        <Employees department={ department } />
      </li>
    );
};

const mapStateToProps = (state)=>{
  return {
    employees: state.employees
  }
}

export default connect(mapStateToProps)(Department);
