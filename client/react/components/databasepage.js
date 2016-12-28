import React from 'react';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { selectDatabase } from '../actions/index';
import { Button } from 'react-bootstrap';


class DatabasePage extends React.Component {
  render() {
    return (
      <div>
        <h1>database page</h1>
        <h4> This is React</h4>
        <h5> {JSON.stringify(this.props.options)}</h5>
        <Button
        bsStyle='primary'
        bsSize='large'
        onClick={()=> this.props.selectDatabase('MongoDB')}>Mongo</Button>
        <Link to='/checkout'>To checkout</Link>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    options: state.options
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    selectDatabase: selectDatabase
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(DatabasePage);