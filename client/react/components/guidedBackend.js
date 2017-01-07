import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { frontend, taskRunner } from '../actions/actionhelper';
import { selectDatabase, changeDisplayType, changeCheckoutFormat } from '../actions/index';

import { Grid, Row, Col, Button, Jumbotron, PageHeader, Image } from 'react-bootstrap';

class GuidedBackend extends React.Component {

  render() {
    return (
      <Grid>
        <Row>
          <div className='guidedButtons'>
            <Col xs={3} xsOffset={0}>
              <Button
               bsStyle='primary'
               onClick={
                ()=> {
                  this.props.selectDatabase('Mongo');
                  }
                }
               block> Mongo </Button>
            </Col>
            <Col xs={3}>
              <Button
                bsStyle='danger'
                onClick={
                ()=> {
                  this.props.selectDatabase('Sqlite');
                  // this.props.changeCheckoutFormat(taskRunner);
                  }
                }
                block> SQlite3 </Button>
            </Col>
            <Col xs={3}>
              <Button
                bsStyle='warning'
                onClick={
                ()=> {
                  this.props.selectDatabase('Mysql');
                  // this.props.changeCheckoutFormat(taskRunner);
                  }
                }
                block disabled> MySQL </Button>
            </Col>
          </div>
          <div className='navButtons'>
            <Col xs={3} xsOffset={1}>
              <Button
              	bsSize='large'
              	className='navButtons'
              	onClick={()=> this.props.changeCheckoutFormat(frontend)}
              	block>
              Back
              </Button>
            </Col>
            <Col xs={3} xsOffset={1}>
              <Link to='/checkout'>
                <Button
                	bsSize='large'
                	block>
                  Next
                </Button>
              </Link>
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
    selectDatabase: selectDatabase,
    changeDisplayType: changeDisplayType,
    changeCheckoutFormat: changeCheckoutFormat
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(GuidedBackend);