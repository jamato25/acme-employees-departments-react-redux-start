import React from 'react';
import { connect } from 'react-redux';

const Stats = ({ employees })=> {
  return (
    <p>{ employees.length } Total Employees</p>
  );
};

const mapStateToProps = state =>{
  return {employees: state.employees, departments:state.departments}
}

export default connect(mapStateToProps)(Stats);
