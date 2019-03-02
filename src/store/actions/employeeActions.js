import {addAlert as addMessage} from '../tools/shareActions'
/** Employee actions */

/**
 * 
 * @param {Object} object contain 2 outher 
 */
export const addEmployee = ({employee, component}) => (dispatch, getState, {getFirebase, getFirestore}) => {
  dispatch({type: 'POST_ADD_EMPLOYEE_START'})
  getFirestore().collection('employees').add({
    ...employee,
    image: 'default.png',
    addedAt: Date.now(),
  }).then( (docRef) => {
    // upload image
    let {image} = employee;
    let imageName = `${docRef.id.toString()}${image.name}`;
    let uploadImageRef = getFirebase().storage().ref(`images/employees/${imageName}`);
    let uploadFileTask = uploadImageRef.put(image);
    uploadFileTask.on(
      'state_changed',
      snapshoot => {
        if (snapshoot.bytesTransferred / snapshoot.totalBytes === 1) 
          ;
      }, 
      err => {
        dispatch({ type: 'POST_ADD_EMPLOYEE_ERROR', message: err.message })
      },
      async () => {
        try {
          // get image link for download image
          let image = await getFirebase().storage().ref('images/employees/')
            .child(`${imageName}`)
            .getDownloadURL();
          // update employees collection with image link
          await getFirestore().collection('employees').doc(docRef.id)
            .update({ image })
          // dispatch an action of success 
          dispatch({ type: 'POST_ADD_EMPLOYEE_SUCCESS' });
          component.push('/employees/list');
        } catch (err) {
          dispatch({ type: 'POST_ADD_EMPLOYEE_ERROR', message: err.message })
        }

      }
    )
  }).catch(err => {
    dispatch({type: 'POST_ADD_EMPLOYEE_ERROR', message: err.message})
  })
}

/**
 * add error 
 * @see ../tools/shareActions
 */
export const addAlert = addMessage;

/**
 * @param {Object} contain 2 item
 */
export const updateEmployee = ({employee, component}) => async (dispatch, getState, {getFirestore}) => {
  dispatch({ type: 'UPDATE_EMPLOYEE_START'});
  try {
    await getFirestore().collection('employees').doc(employee.id).update({
      ...employee,
      updatedAt: Date.now(),
      updatedBy: getState().firebase.auth.uid,
    });
    dispatch({ 
      type: 'UPDATE_EMPLOYEE_SUCCESS', 
      message: `Updated ${employee.fname} ${employee.lname} with success ;)`
    });
  } catch (error) {
    dispatch({ type: 'UPDATE_EMPLOYEE_ERROR', message: error.message })
  }
}