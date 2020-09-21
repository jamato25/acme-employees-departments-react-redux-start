import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Provider, connect} from 'react-redux';
import store from './store'
import {getEmployees} from './store'
import Departments from './Departments';
import Stats from './Stats';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      departments: [],
      employees: []
    };
    this.destroyEmployee = this.destroyEmployee.bind(this);
    this.removeFromDepartment = this.removeFromDepartment.bind(this);
  }
  async destroyEmployee(employee){
    await axios.delete(`/api/employees/${employee.id}`);
    const employees = this.state.employees.filter(_employee => employee.id !== _employee.id);
    this.setState({ employees });
  }
  async removeFromDepartment(employee){
    employee = (await axios.put(`/api/employees/${employee.id}`, { departmentId: null})).data;
    const employees = this.state.employees.map(_employee => employee.id === _employee.id ? employee : _employee);
    this.setState({ employees });
  }
  async componentDidMount(){
    this.props.loadEmployees();
    // const responses = await Promise.all([
    //   axios.get('/api/employees'),
    //   axios.get('/api/departments'),
    // ]);
    // this.setState({
    //   employees: responses[0].data,
    //   departments: responses[1].data
    // });
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
    loadEmployees: () => dispatch(getEmployees())
  }
}

export default connect(null, mapDispatchToProps)(App)

ReactDOM.render(<Provider store = {store}> <App /></Provider>, document.querySelector('#root'));
