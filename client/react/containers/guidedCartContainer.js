import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { frontend, backend } from '../actions/actionhelper';
import { selectFramework, changeDisplayType, changeCheckoutFormat } from '../actions/index';

import { Nav, Navbar, Grid, Row, Col, Button, Jumbotron, PageHeader, Image } from 'react-bootstrap';

import FrontendCartView from '../components/frontendCartView';
import BackendCartView from '../components/backendCartView';
import TaskRunnerCartView from '../components/taskRunnerCartView';
import PluginsCartView from '../components/pluginsCartView';
import TasksCartView from '../components/tasksCartView';
import TestingCartView from '../components/testingCartView';

class GuidedCart extends React.Component {

  render() {
    return(
      <div className='cart'>
        <Navbar className='cartHeader'>
          <h4>Cart</h4>
        </Navbar>
        <FrontendCartView/>
        <BackendCartView/>
        <Link to='/checkout'>
          <Button>Build</Button>
        </Link>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    options: state.options,
    display: state.display
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    selectFramework: selectFramework,
    changeDisplayType: changeDisplayType,
    changeCheckoutFormat: changeCheckoutFormat
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(GuidedCart);