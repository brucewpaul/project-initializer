import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { frontend, backend } from '../actions/actionhelper';
import { selectFramework, changeDisplayType } from '../actions/index';

import { Nav, Navbar, Grid, Row, Col, Button, Jumbotron, PageHeader, Image } from 'react-bootstrap';

import FrontendCartView from '../components/cartViews/frontendCartView';
import BackendCartView from '../components/cartViews/backendCartView';
import TaskRunnerCartView from '../components/cartViews/taskRunnerCartView';
import PluginsCartView from '../components/cartViews/pluginsCartView';
import TasksCartView from '../components/cartViews/tasksCartView';
import TestingCartView from '../components/cartViews/testingCartView';

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
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(GuidedCart);