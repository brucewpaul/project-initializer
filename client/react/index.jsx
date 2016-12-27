import React from 'react';
import ReactDom from 'react-dom';
import { createStore } from 'redux';
import allReducers from './reducers';

import routes from './components/router.js';

const store = createStore(allReducers);

ReactDom.render(routes, document.getElementById('app'));