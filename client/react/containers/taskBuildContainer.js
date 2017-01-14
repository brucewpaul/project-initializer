import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CfSelection from '../components/advanced/cfSelections';
import TaskDisply from '../components/advanced/taskDisplay';


import { Grid, Row, Col } from 'react-bootstrap';

class TaskBuildContainer extends React.Component {
  render() {
    return (
      <Grid>
        <CfSelection />
        <TaskDisply />
      </Grid>
    )
  }
}

export default TaskBuildContainer;