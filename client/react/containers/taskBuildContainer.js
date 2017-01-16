import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CfSelection from '../components/advanced/cfSelections';
import TaskDisply from '../components/advanced/taskDisplay';
import CurrentTaskDisply from '../components/advanced/currentTaskDisplay';

import NavButton from '../components/parts/navButton';

import { Grid, Row, Col } from 'react-bootstrap';

class TaskBuildContainer extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <CfSelection />
        </Row>
        <Row>
          <Col xs={3}>
            <CurrentTaskDisply />
          </Col>
          <Col xs={3} xsOffset={6}>
            <TaskDisply />
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default TaskBuildContainer;