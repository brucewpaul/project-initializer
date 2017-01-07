import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { plugins, testing } from '../actions/actionhelper';
import { addTask, changeDisplayType, changeCheckoutFormat } from '../actions/index';

import { Grid, Row, Col, Button, Jumbotron, PageHeader, Image } from 'react-bootstrap';

class GuidedTaskCreation extends React.Component {

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
                  // this.props.taskRunner('Gulp');
                  this.props.changeCheckoutFormat(testing);
                  }
                }
               block> Task1 </Button>
            </Col>
            <Col xs={3}>
              <Button
                bsStyle='danger'
                onClick={
                ()=> {
                  // this.props.taskRunner('Grunt');
                  this.props.changeCheckoutFormat(testing);
                  }
                }
                block> Task2 </Button>
            </Col>
            <Col xs={3}>
              <Button
                bsStyle='warning'
                onClick={
                ()=> {
                  // this.props.taskRunner('Gulp');
                  this.props.changeCheckoutFormat(testing);
                  }
                }
                block> Task3 </Button>
            </Col>
          </div>
          <div className='navButtons'>
            <Col xs={3} xsOffset={1}>
              <Button
              	bsSize='large'
              	className='navButtons'
              	onClick={()=> this.props.changeCheckoutFormat(plugins)}
              	block>
              Back
              </Button>
            </Col>
            <Col xs={3} xsOffset={1}>
              <Button
              	bsSize='large'
              	onClick={()=> this.props.changeCheckoutFormat(testing)}
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
  	addTask: addTask,
    changeDisplayType: changeDisplayType,
    changeCheckoutFormat: changeCheckoutFormat
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(GuidedTaskCreation);