import React from 'react';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { selectFramework } from '../actions/index';
import { Button } from 'react-bootstrap';


class HomePage extends React.Component {

  render() {
    return (
      <div>
        <h1>HomePage</h1>
        <h4> This is React</h4>
        <h5> {JSON.stringify(this.props.options)}</h5>
        <Button
        bsStyle='primary'
        bsSize='large'
        onClick={()=> this.props.selectFramework('React')}>React</Button>

        <Link to='/server'>To database</Link>
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
    selectFramework: selectFramework
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(HomePage);