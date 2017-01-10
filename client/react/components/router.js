import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import HomePage from '../containers/homeContainer';
import GuidedContainer from '../containers/guidedContainer';
import SummaryContainer from '../containers/summaryContainer';
import DownloadContainer from '../containers/downloadContainer';
import AdvancedContainer from '../containers/advancedContainer';
import RootComponent from './rootComponent';


import { createStore } from 'redux';
import allReducers from '../reducers';

import { Provider } from 'react-redux';

const store = createStore(allReducers);

const routes = (
  <Provider store={store}>
    <Router history ={browserHistory} >
      <Route path='/' component={RootComponent}>
        <IndexRoute component={HomePage}/>
        <Route path ='/guided' component={GuidedContainer}/>
        <Route path ='/advanced' component={AdvancedContainer}/>
        <Route path ='/checkout' component={SummaryContainer}/>
        <Route path ='/download' component={DownloadContainer}/>
      </Route>
    </Router>
  </Provider>
);


export default routes;