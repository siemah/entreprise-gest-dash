/** Employee Reducer */
let initState = {
  addEmployeeLoading: false,
  addEmployeeError: null,
  addEmployeeSuccess: null,  
  editEmployeeSuccess: null,
  editEmployeeLoading: false,
  editEmployeeError: null,
}


export const employeeReducer = (state=initState, action) => {
  switch(action.type) {
    case 'POST_ADD_EMPLOYEE_START': 
      return {
        ...state,
        addEmployeeLoading: true,
        addEmployeeError: null,
        addEmployeeSuccess: null,
      };
    case 'POST_ADD_EMPLOYEE_SUCCESS': 
      return {
        ...state,
        addEmployeeLoading: false,
        addEmployeeError: null,
        addEmployeeSuccess: action.message,
      };
    case 'POST_ADD_EMPLOYEE_ERROR': 
      return {
        ...state,
        addEmployeeLoading: false,
        addEmployeeError: action.message,
        addEmployeeSuccess: null,
      };
    case 'UPDATE_EMPLOYEE_START':
      return {
        ...state,
        editEmployeeLoading: true,
        editEmployeeError: null,
        editEmployeeSuccess: null,
      };
    case 'UPDATE_EMPLOYEE_SUCCESS':
      return {
        ...state,
        editEmployeeLoading: false,
        editEmployeeError: null,
        editEmployeeSuccess: action.message,
      };
    case 'UPDATE_EMPLOYEE_ERROR':
      return {
        ...state,
        editEmployeeLoading: false,
        editEmployeeError: action.message,
        editEmployeeSuccess: null,
      };
    default: return {...state};
  }
}