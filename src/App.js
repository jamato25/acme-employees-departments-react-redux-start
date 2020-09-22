import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Provider, connect} from 'react-redux';
import {fetchEmployees, fetchDepartments} from './store'
import Departments from './Departments';
import Stats from './Stats';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      departments: [],
      employees: []
    };
  }

  async componentDidMount(){
    this.props.loadEmployees();
    this.props.loadDepartments();
  }
  render(){
    const { departments, employees } = this.state;
    const { destroyEmployee, removeFromDepartment } = this;
    return (
      <div>
        <h1>Acme Employees And Departments</h1>
        <Stats employees={ employees }/>
        <Departments
          departments={ departments }
          employees={ employees }
          destroyEmployee = { destroyEmployee }
          removeFromDepartment = { removeFromDepartment }
      />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    loadEmployees: () => dispatch(fetchEmployees()),
    loadDepartments: () =>dispatch(fetchDepartments())
  }
}

export default connect(null, mapDispatchToProps)(App)

