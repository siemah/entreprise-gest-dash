/**
 * add nex project
 * 
 */
export const addProject = ({project, component}) => (dispatch, getState, {getFirestore}) => {
  dispatch({type: 'POST_ADD_PROJECT_START'});
  getFirestore().collection('projects').add({
    ...project,
    employees: [],
    createdAt: Date.now(),
  })
    .then(docRef => {
      dispatch({type: 'POST_ADD_PROJECT_SUCCESS'});
      component.target.reset();
      component.push('/projects/list');
    })
    .catch( err => {
      dispatch({type: 'POST_ADD_PROJECT_ERROR', err: err.message});
    });
};

/**
 * update some details content of current project
 * @param {Object} project contain new details of current project to update
 * @param {Object} component contain some functions of component
 */
export const updateProject = ({ project, currentDoc, component}) => (dispatch, getState, {getFirestore}) =>{
  dispatch({ type: 'POST_ADD_PROJECT_START' })
  getFirestore().collection('projects').doc(currentDoc).update({
    ...project
  })
  .then(() => {
    dispatch({type: 'POST_UPDATE_PROJECT_SUCCESS'})
    component.push('/projects/list')
  })
  .catch(err => {
    dispatch({ type: 'POST_UPDATE_PROJECT_SUCCESS', err: err.message })
  })
}

/**
 * add error 
 * @param {String} message the message error
 */
export const addError = (message, type = 'POST_ADD_PROJECT_ERROR') => (dispatch, getState) => dispatch({ type, err: message});

/**
 * add some employees work in project X 
 * @param {Object} param0 contain some detail about employees added to current project
 */
export const assignEmployees = (details) => async (dispatch, getState, {getFirestore, getFirebase}) => {
  let { redirectTo, employees, projectId, projectName, target, resetComponentState } = details;
  dispatch({type: 'POST_ASSIGN_EMPLOYEES_TO_PROJECT_START' });
  let firestore = getFirestore();
  let employeesList = await firestore.collection('projects').doc(projectId).get();
  employeesList = employeesList.data().employees || [];
  employeesList.push(...employees.filter(emp => !employeesList.includes(emp)))
  try {
    await firestore.collection('projects').doc(projectId).update({
      employees: employeesList,
    });
    dispatch({ 
      type: 'POST_ASSIGN_EMPLOYEES_TO_PROJECT_SUCCESS', 
      message: `You add some employees to ${projectName}`
    });
    resetComponentState();
    target.reset();
    redirectTo('/dashboard/analytics/projects/')
  } catch (error) {
    dispatch({ type: 'POST_ASSIGN_EMPLOYEES_TO_PROJECT_ERROR', err: error.message });    
  }
}

/**
 * delete employees list from current project
 * @package dgestentr
 * @param {String} project!Id the current project id
 * @param {String} employeeId Id of the employee de delete 
 * @param {Function} push function to redirect users to certain link
 */
export const deleteEmployees = (projectId, employeeId, push) => async (dispatch, getState, {getFirestore, getFirebase}) => {
 dispatch({type: 'DELETE_EMPLOYEE_FROM_PROJECT_START'})
  try {
    let prj = await getFirestore().collection('projects').doc(projectId).get();
    let { employees } = prj.data();
    employees = employees.filter(emplid => emplid !== employeeId);
    await getFirestore().collection('projects').doc(projectId).update({
      employees,
    });     
    dispatch({ 
      type: 'DELETE_EMPLOYEE_FROM_PROJECT_SUCCESS', 
      message: 'You decline an employee from project',
    });
    if (!employees.length) window.location.reload();
  } catch (error) {
    dispatch({ type: 'DELETE_EMPLOYEE_FROM_PROJECT_ERROR', message: 'Try again after a moment :('})
  }
}