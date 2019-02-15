import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import { authReducer } from './authReducer';
import { projectReducer } from './projectReducer';
import { employeeReducer } from './employeeReducer';
import { materialReducer } from './materialReducer';

const mainReducers = combineReducers({
	auth: authReducer,
	project: projectReducer,
	firebase: firebaseReducer,
	firestore: firestoreReducer,
	employee: employeeReducer,
	material: materialReducer,
});

export default mainReducers;