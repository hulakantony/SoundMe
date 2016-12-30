import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RootContainer from './containers/Home.js';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import rootReducer from './reducers/';
import { routes } from './routes.js'

const store = createStore(rootReducer, applyMiddleware(thunk));

window.store = store;

ReactDOM.render(
<Provider store={store}>
  <Router history={browserHistory} routes={routes} /> 
</Provider>, document.querySelector('.app'));










