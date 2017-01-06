import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { taskRunner, changeDisplayType, changeCheckoutFormat } from '../actions/index';
import { Grid, Row, Col, Button, Jumbotron, PageHeader, Image } from 'react-bootstrap';

class TaskRunnerOptions extends React.Component {

  render() {
    return(
      <Grid>
        <Row>
          <Col>
            <Button
              bsStyle='warning'
              onClick={()=> this.props.taskRunner('Grunt')}>Grunt</Button>
          </Col>
          <Col>
            <Button
              bsStyle='warning'
              onClick={()=> this.props.taskRunner('Gulp')}>Gulp</Button>
          </Col>
        </Row>
        <Row>
          Tasks component goes here
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

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    taskRunner: taskRunner,
    changeDisplayType: changeDisplayType,
    changeCheckoutFormat: changeCheckoutFormat
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(TaskRunnerOptions);