import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import CfSelection from '../components/advanced/cfSelections';
import TaskDisplay from '../components/advanced/taskDisplay';
import CurrentTaskDisply from '../components/advanced/currentTaskDisplay';

import NavButton from '../components/parts/navButton';

import { Grid, Row, Col } from 'react-bootstrap';

class TaskBuildContainer extends React.Component {
  componentWillMount() {
    if ( !this.props.options.frontEnd.framework || !this.props.options.backEnd.database || !this.props.options.devTools.taskRunner.name ) {
      browserHistory.push('/');
    }
  }
  render() {
    return (
      <Grid className='container-wrapper'>
        <Row>
          <Col xs={8}>
            <div className='guidedHeader'>
              <h4>Build Tasks</h4>
            </div>
            <CfSelection />
            <CurrentTaskDisply />
          </Col>
          <Col xs={3} xsOffset={1}>
            <TaskDisplay />
          </Col>
        </Row>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    options: state.options,
    display: state.display
  };
}

export default connect(mapStateToProps)(TaskBuildContainer);