import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import Homepage from './homepage';
import RootComponent from './rootComponent';
import Serverpage from './serverpage';
import Checkout from './checkout';

const routes = (
			<Router history ={browserHistory} >
				<Route path='/' component={RootComponent}>
					<IndexRoute component={Homepage}/>
					<Route path ='/server' component={Serverpage}/>
					<Route path ='/checkout' component={Checkout}/>
				</Route>
			</Router>
);


export default routes ;