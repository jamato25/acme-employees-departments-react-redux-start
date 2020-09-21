import {createStore} from 'redux';
import logger from 'redux-logger'
import{applyMiddleware} from 'redux'
import axios from 'axios'

const middleware = applyMiddleware(logger);

const REMOVE_FROM_DEPARTMENT = "REMOVE_FROM_DEPARTMENT"
const DESTROY_EMPLOYEE = "DESTROY_EMPLOYEE"
const SET_EMPLOYEES = "SET_EMPLOYEES"

const initialState ={
  departments: [],
  employees: []
};

//action creators
const removeFromDepartment = (employee) =>{
  return {
    type: REMOVE_FROM_DEPARTMENT,
    employee
  }
}

const destroyEmployee = (employee) =>{
  return {
    type: DESTROY_EMPLOYEE,
    employee
  }
}

const setEmployees = (employees)=>{
  return {
    type: SET_EMPLOYEES,
    employees
  }
}
const getEmployees = ()=>{
  return async (dispatch)=>{
    try{
      const {data} = await axios.get('/api/employees')
      dispatch(setEmployees(data))
    }
    catch(err){
      console.log(err)
    }
  }
}

//reducer
const reducer = (state = initialState, action) =>{
  switch(action.type){
    case SET_EMPLOYEES:
      return action.employees;
    case REMOVE_FROM_DEPARTMENT:
      console.log("remove")
      return state;
    case DESTROY_EMPLOYEE:
      console.log("destroy")
      return state;

    default: return state;
  }
}

const store= createStore(reducer, middleware);

export default store;
export {destroyEmployee, removeFromDepartment, getEmployees}
