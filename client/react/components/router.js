import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import HomePage from './homepage';
import RootComponent from './rootComponent';
import DatabasePage from './databasepage';
import Checkout from './checkout';

import { createStore } from 'redux';
import allReducers from '../reducers';

import { Provider } from 'react-redux';

const store = createStore(allReducers);

const routes = (
  <Provider store={store}>
    <Router history ={browserHistory} >
      <Route path='/' component={RootComponent}>
        <IndexRoute component={HomePage}/>
        <Route path ='/server' component={DatabasePage}/>
        <Route path ='/checkout' component={Checkout}/>
      </Route>
    </Router>
  </Provider>
);


export default routes;