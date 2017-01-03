import { combineReducers } from 'redux';
import reduceOptions from './reduceOptions';
import reduceDisplay from './reduceDisplay'

const allReducers = combineReducers({
  options: reduceOptions,
  display: reduceDisplay
});

export default allReducers;