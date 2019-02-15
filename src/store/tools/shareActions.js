/**
 * add error 
 * @param {String} message the message error
 * @param {String} type the type of action to fire
 */
export const addAlert = (message, type) => (dispatch) => dispatch({ type, message })

/**
 * dispatch an action
 * @param {String} type type of action dispatched
 * @param {String} message the message payload if there is one
 */
export const dispatchAction = (type, message=null) => dispatch => dispatch({type, message});