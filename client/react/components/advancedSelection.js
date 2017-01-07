import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { backend } from '../actions/actionhelper';
import { selectFramework, selectDatabase, taskRunner, addTask, addTesting, changeDisplayType, changeCheckoutFormat } from '../actions/index';

import { Grid, Row, Col, Button, Jumbotron, PageHeader, Image } from 'react-bootstrap';

class AdvancedSelection extends React.Component {
	render() {
			return <div> Advanced selection</div>
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
    selectDatabase: selectDatabase,
    taskRunner: taskRunner,
    addTask: addTask,
    addTesting: addTesting,
    changeDisplayType: changeDisplayType,
    changeCheckoutFormat: changeCheckoutFormat
  }, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(AdvancedSelection);