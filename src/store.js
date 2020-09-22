import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger'
import axios from 'axios'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devTools-extension'


const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware,createLogger({collapse:true}))
);

const REMOVE_FROM_DEPARTMENT = "REMOVE_FROM_DEPARTMENT"
const DESTROY_EMPLOYEE = "DESTROY_EMPLOYEE"
const SET_EMPLOYEES = "SET_EMPLOYEES"
const SET_DEPARTMENTS = "SET_DEPARTMENTS"

const initialState ={
  departments: [],
  employees: []
};

//action creators
export const removeFromDepartment = (employee) =>{
  return async (dispatch)=>{
    try{
      await axios.put(`/api/employees/${employee.id}`, { departmentId: null});
      const {data} = await axios.get('/api/employees')
      dispatch(setEmployees(data))
    }
    catch(err){
      console.log(err)
    }
  }
}

export const destroyEmployee = (employee) =>{
  return async (dispatch)=>{
    try{
      await axios.delete(`/api/employees/${employee.id}`);
      const {data} = await axios.get('/api/employees')
      dispatch(setEmployees(data))
    }
    catch(err){
      console.log(err)
    }
  }
}


export const setEmployees = (employees)=>{
  return {
    type: SET_EMPLOYEES,
    employees

  }
}

export const fetchEmployees = () => {
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

export const setDepartments = (departments)=>{
  return {
    type: SET_DEPARTMENTS,
    departments
  }
}
export const fetchDepartments = () => {
  return async (dispatch)=>{
    try{
      const {data} = await axios.get('/api/departments')
      dispatch(setDepartments(data))
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
      return {...state, employees: action.employees};
    case SET_DEPARTMENTS:
      return {...state, departments: action.departments};
    case REMOVE_FROM_DEPARTMENT:
      console.log("remove")
      return state;
    case DESTROY_EMPLOYEE:
      console.log("destroy")
      return state;

    default: return state;
  }
}

const store = createStore(reducer, middleware);

export default store;
