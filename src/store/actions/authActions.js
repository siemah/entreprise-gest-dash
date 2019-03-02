/**
 * register action
 */
export const register = ({ user, component }) => (dispatch, getState, {getFirebase, getFirestore}) => {
  let { fullname, mobile, email, password } = user;
  let { push, empty, elemNode } = component;
  dispatch({type: 'POST_REGISTER_START'});
  getFirebase().auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async doc => {
      getFirestore().collection('users').doc(doc.user.uid)
        .set({
          fullname,
          mobile,
          userUid: doc.user.uid,
        })
        .then(() => {
          empty(elemNode);
          push('/');
          dispatch({type: 'POST_REGISTER_SUCCESS'});
        })
        .catch ((err) => {
          dispatch({type: 'POST_REGISTER_ERROR', err: err.message})
        });
    })
    .catch(err=>{ 
      dispatch({type: 'POST_REGISTER_ERROR', err: err.message})
    });
};

/**
 * login action
 */
export const login = ({user, component}) => (dispatch, getState, {getFirebase}) => {
  dispatch({type: 'POST_LOGIN_START'})
  getFirebase().auth().signInWithEmailAndPassword(user.email, user.password)
    .then(res => {
      dispatch({type: 'POST_LOGIN_SUCCESS'});
      component.push('/');
    })
    .catch(err => {dispatch({type: 'POST_LOGIN_ERROR', err})})
}

/**
 * logout user 
 */
export const logout = () => (dispatch, getState, {getFirebase}) => {
  getFirebase().auth().signOut()
    .then((res) => {
      dispatch({type: 'POST_LOGOUT_SUCCESS'})
    })
    .catch(err => dispatch({ type: 'POST_LOGOUT_ERROR' }));
}

/**
 * change some account details 
 */
export const updateDetails = ({details, component}) => (dispatch, getState, {getFirestore}) => {
  dispatch({type: 'UPDATE_PROFILE_DETAILS_START'})
  getFirestore().collection('users').doc(getState().firebase.auth.uid).update({
    ...details,
    fullname: `${details.fname} ${details.lname}`
  }).then(() => {
    dispatch({ type: 'UPDATE_PROFILE_DETAILS_SUCCESS' });
    component.push('/');
  }).catch(err => {
    dispatch({ type: 'UPDATE_PROFILE_DETAILS_ERROR', err: err.message });
  })
}

/**
 * dispatch some action to show message alerts
 * @param {String} message the text to show for user
 * @param {String} type type of action dispatched by reducer
 */

export const addMessage = (message, type) => (dispatch, getState) => dispatch({ type, err: message });

/**
 * change user password
 * @param {String} password thus new pasword
 */
export const setPassword = ({password, component}) => (dispatch, getState, {getFirebase}) => {
  dispatch({ type: 'UPDATE_PASSWORD_START' })
  getFirebase().auth().currentUser.updatePassword(password)
    .then(() => {
      dispatch({ type: 'UPDATE_PASSWORD_SUCCESS', message: 'Password changed with success ;)'})
      component.target.reset();
    })
    .catch(err => {
      dispatch({type: 'UPDATE_PASSWORD_ERROR', err: err.message})
    })
}