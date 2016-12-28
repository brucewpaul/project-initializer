import { combineReducers } from 'redux';
import reduceOptions from './reduceOptions';

const allReducers = combineReducers({
  options: reduceOptions
});

export default allReducers;