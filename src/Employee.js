import React from 'react';
import { connect } from 'react-redux';
import {destroyEmployee, removeFromDepartment} from './store'

const Employee = ({ employee, destroyEmployee, removeFromDepartment })=> {
  return (
    <li key={ employee.id }>
      { employee.name }
      <button onClick={ ()=> destroyEmployee(employee)}>x</button>
      {
        !!removeFromDepartment && (
          <button onClick={ ()=> removeFromDepartment(employee)}>Remove From Department</button>
        )
      }
    </li>
  );
};

const mapDispatchToProps = (dispatch)=>{
  return {
    destroyEmployee: (employee)=>dispatch(destroyEmployee(employee)),
    removeFromDepartment: (employee)=>dispatch(removeFromDepartment(employee))
  }
}

export default connect(null,mapDispatchToProps)(Employee);
