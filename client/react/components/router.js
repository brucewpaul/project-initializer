import React from 'react';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import HomePage from '../containers/homeContainer';
import GuidedContainer from '../containers/guidedContainer';
import SummaryContainer from '../containers/summaryContainer';
import DownloadContainer from '../containers/downloadContainer';
import BundleErrorContainer from '../containers/bundleErrorContainer';
import AdvancedContainer from '../containers/advancedContainer';
import BundleViewContainer from '../containers/bundleViewContainer';
import AccountContainer from '../containers/accountContainer';
import RootComponent from './rootComponent';
import GuidedFrontend from '../components/guided/guidedFrontend';
import GuidedBackend from '../components/guided/guidedBackend';
import GuidedTaskRunner from '../components/guided/guidedTaskRunner';
import AdvancedSelection from '../components/advanced/advancedSelections';
import TaskBuildContainer from  '../containers/taskBuildContainer';
import { createStore } from 'redux';
import allReducers from '../reducers';
import { Provider } from 'react-redux';

const store = createStore(allReducers);

const routes = (
  <Provider store={store}>
    <Router history ={browserHistory} >
      <Route path='/' component={RootComponent}>
        <IndexRoute component={HomePage}/>
        <Route path='/account' component={AccountContainer}/>
        <Route path='/guided' component={GuidedContainer}>
          <IndexRoute component={GuidedFrontend}/>
          <Route path='/backend' component={GuidedBackend}/>
          <Route path='/taskrunner' component={GuidedTaskRunner}/>
        </Route>
        <Route path='/advanced' component={AdvancedContainer}>
          <IndexRoute component={AdvancedSelection}/>
        </Route>
        <Route path='/task' component={TaskBuildContainer} />
        <Route path ='/checkout' component={SummaryContainer}/>
        <Route path ='/view' component={BundleViewContainer}/>
        <Route path ='/view/:userName/:bundleId' component={BundleViewContainer}/>
        <Route path ='/download' component={DownloadContainer}/>
        <Route path ='/bundle-error' component={BundleErrorContainer}/>
      </Route>
    </Router>
  </Provider>
);

export default routes;