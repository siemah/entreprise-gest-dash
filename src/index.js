import React from 'react';
import ReactDOM from 'react-dom'; 
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase  } from 'react-redux-firebase';
import firebaseConfig from './config/firebaseConfig'
import mainReducer from './store/reducers/mainReducer';
import Splash from './components/Layout/Splash';

const store = createStore(
  mainReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reactReduxFirebase(
      firebaseConfig,
      {
        userProfile: 'users',
        useFirestoreForProfile: true,
        attachAuthIsReady: true,
      }
    ),
    reduxFirestore(firebaseConfig),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);  

ReactDOM.render(
  <Splash />,
  document.getElementById('root')
);
serviceWorker.unregister();

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <Provider store={store} >
      <App />
    </Provider>,
    document.getElementById('root')
  );
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA