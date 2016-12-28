import React from 'react';
import ReactDom from 'react-dom';
import { createStore } from 'redux';
import allReducers from './reducers';
import { Provider } from 'react-redux';

import routes from './components/router.js';

ReactDom.render(routes, document.getElementById('app'));