import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { backend, testing } from '../../actions/actionhelper';
import { taskRunner, changeDisplayType, changeGuidedPage } from '../../actions/index';

import { Grid, Row, Col, Button, Jumbotron, PageHeader, Image } from 'react-bootstrap';

class GuidedTaskRunner extends React.Component {

  render() {
    return (
      <Grid>
        <Row >
          <div className='guidedButtons'>
            <Col xs={3} xsOffset={0}>
              <Button
               bsStyle='primary'
               onClick={
                ()=> {
                  this.props.taskRunner('Gulp');
                  this.props.changeGuidedPage(testing);
                  }
                }
               block> Gulp </Button>
            </Col>
            <Col xs={3}>
              <Button
                bsStyle='danger'
                onClick={
                ()=> {
                  this.props.taskRunner('Grunt');
                  this.props.changeGuidedPage(testing);
                  }
                }
                block> Grunt </Button>
            </Col>
            <Col xs={3}>
              <Button
                bsStyle='warning'
                onClick={
                ()=> {
                  this.props.taskRunner('Gulp');
                  this.props.changeGuidedPage(testing);
                  }
                }
                block> Gulp </Button>
            </Col>
          </div>
          <div className='navButtons'>
            <Col xs={3} xsOffset={1}>
              <Button
              	bsSize='large'
              	className='navButtons'
              	onClick={()=> this.props.changeGuidedPage(backend)}
              	block>
              Back
              </Button>
            </Col>
            <Col xs={3} xsOffset={1}>
              <Button
              	bsSize='large'
              	onClick={()=> this.props.changeGuidedPage(testing)}
              	block>
                Next
              </Button>
            </Col>
          </div>
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
    changeGuidedPage: changeGuidedPage
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(GuidedTaskRunner);