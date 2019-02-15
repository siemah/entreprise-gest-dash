let initState = {
  loginError: null,
  registerError: null,
  registerLoading: false,
  updateProfileError: null,
  updateProfileLoading: false,
  updatePasswordError: null,
  updatePasswordLoading: false,
  updatePasswordSuccess: null,
  auth: null,

}

export const authReducer = (state=initState, action) => {
  switch (action.type) {
    case 'POST_REGISTER_START':
      return {
        ...state,
        registerLoading: true,
        registerError: null,
        updateProfileError: null,
        updateProfileLoading: false,
        updatePasswordError: null,
        updatePasswordLoading: false,
        updatePasswordSuccess: null,
      };
    case 'POST_REGISTER_SUCCESS':
      return {
        ...state,
        registerLoading: false,
        registerError: null,
        updateProfileError: null,
        updateProfileLoading: false,
        updatePasswordError: null,
        updatePasswordLoading: false,
        updatePasswordSuccess: null,
      };
    case 'POST_REGISTER_ERROR':
      return {
        ...state,
        updateProfileError: null,
        updateProfileLoading: false,
        registerLoading: false,
        registerError: action.err,
        updatePasswordError: null,
        updatePasswordLoading: false,
        updatePasswordSuccess: null,
      };
    case 'POST_LOGIN_START':
      return {
        ...state,
        updateProfileError: null,
        updateProfileLoading: false,
        loginLoading: true,
        loginError: null,
        updatePasswordError: null,
        updatePasswordLoading: false,
        updatePasswordSuccess: null,
      };
    case 'POST_LOGIN_SUCCESS':
      return {
        ...state,
        updateProfileError: null,
        updateProfileLoading: false,
        loginLoading: false,
        loginError: null,
        updatePasswordError: null,
        updatePasswordLoading: false,
        updatePasswordSuccess: null,
      };
    case 'POST_LOGIN_ERROR':
      return {
        ...state,
        updateProfileError: null,
        updateProfileLoading: false,
        loginLoading: false,
        loginError: action.err.message,
        updatePasswordError: null,
        updatePasswordLoading: false,
        updatePasswordSuccess: null,
      };
    case 'UPDATE_PROFILE_DETAILS_START':
      return {
        ...state,
        updateProfileError: null,
        updateProfileLoading: true,
        updatePasswordError: null,
        updatePasswordLoading: false,
        updatePasswordSuccess: null,
      };
    case 'UPDATE_PROFILE_DETAILS_SUCCESS':
      return {
        ...state,
        updateProfileError: null,
        updateProfileLoading: false,
        updatePasswordError: null,
        updatePasswordLoading: false,
        updatePasswordSuccess: null,
      };
    case 'UPDATE_PROFILE_DETAILS_ERROR':
      return {
        ...state,
        updateProfileError: action.err,
        updateProfileLoading: false,
        updatePasswordError: null,
        updatePasswordLoading: false,
        updatePasswordSuccess: null,
      };
    case 'UPDATE_PASSWORD_START':
      return {
        ...state,
        updateProfileError: null,
        updateProfileLoading: false,
        updatePasswordError: null,
        updatePasswordLoading: true,
      };
    case 'UPDATE_PASSWORD_SUCCESS':
      return {
        ...state,
        updatePasswordError: null,
        updatePasswordLoading: false,
        updatePasswordSuccess: action.message,
      }; 
    case 'UPDATE_PASSWORD_ERROR':
      return {
        ...state,
        updatePasswordError: action.err,
        updatePasswordLoading: false,
      };
    case 'POST_LOGOUT_SUCCESS':
      return {
        ...state,
      };
    case 'POST_LOGOUT_ERROR':
      return {
        ...state,
      };
    default: return state;
  }
};