let initState = {
    loading: false,
    editProjectError: null,
    addProjectError: null,

    assignEmployeesLoading: false, 
    assignEmployeesSuccess: null, 
    assignEmployeesError: null,

    declineEmployeesLoading: false,
  }

export const projectReducer = (state=initState, action) => {
  switch(action.type){
    case 'POST_ADD_PROJECT_START': 
      return {
        ...state,
        loading: true,
        addProjectError: null,
      }
    case 'POST_ADD_PROJECT_SUCCESS':
      return {
        ...state,
        loading: false,
        addProjectError: null,
      }
    case 'POST_ADD_PROJECT_ERROR':
      return {
        ...state,
        loading: false,
        addProjectError: action.err,
      }
    case 'POST_UPDATE_PROJECT_SUCCESS':
      return {
        ...state,
        loading: false,
        editProjectError: null,
        addProjectError: null,
      }
    case 'POST_UPDATE_PROJECT_ERROR':
      return {
        ...state,
        loading: false,
        addProjectError: null,
        editProjectError: action.err,
      }

    case 'POST_ASSIGN_EMPLOYEES_TO_PROJECT_START':
      return {
        ...state,
        assignEmployeesLoading: true,
        assignEmployeesError: null,
        assignEmployeesSuccess: null,
      }
    case 'POST_ASSIGN_EMPLOYEES_TO_PROJECT_SUCCESS':
      return {
        ...state,
        assignEmployeesLoading: false,
        assignEmployeesError: null,
        assignEmployeesSuccess: action.message,
      }
    case 'POST_ASSIGN_EMPLOYEES_TO_PROJECT_ERROR':
      return {
        ...state,
        assignEmployeesLoading: false,
        assignEmployeesError: action.err,
        assignEmployeesSuccess: null,
      }

    case 'DELETE_EMPLOYEE_FROM_PROJECT_START':
      return {
        ...state,
        declineEmployeesLoading: true,
        declineEmployeesError: null,
        declineEmployeesSuccess: null,
      }
    case 'DELETE_EMPLOYEE_FROM_PROJECT_SUCCESS':
      return {
        ...state,
        declineEmployeesLoading: false,
        declineEmployeesError: null,
        declineEmployeesSuccess: action.message,
      }
    case 'DELETE_EMPLOYEE_FROM_PROJECT_ERROR':
      return {
        ...state,
        declineEmployeesLoading: false,
        declineEmployeesError: action.err,
        declineEmployeesSuccess: null,
      }

    default: return {...state};
  }
}