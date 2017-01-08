import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { backend } from '../actions/actionhelper';
import { selectFramework, changeDisplayType, changeCheckoutFormat } from '../actions/index';

import { Grid, Row, Col, Button, Jumbotron, PageHeader, Image } from 'react-bootstrap';

class GuidedFrontend extends React.Component {

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
                  this.props.selectFramework('React');
                  }
                }
               block> React </Button>
            </Col>
            <Col xs={3}>
              <Button
                bsStyle='danger'
                onClick={
                ()=> {
                  this.props.selectFramework('Angular');
                  }
                }
                block> Angular </Button>
            </Col>
            <Col xs={3}>
              <Button
                bsStyle='warning'
                onClick={
                ()=> {
                  this.props.selectFramework('Vue');
                  }
                }
                block disabled> Vue </Button>
            </Col>
          </div>
          <div className='navButtons'>
            <Col xs={3} xsOffset={1}>
              <Link to='/'>
              <Button bsSize='large' className='navButtons' block>
              Home
              </Button>
            </Link>
            </Col>
            <Col xs={3} xsOffset={1}>
              <Button
                bsSize='large'
                onClick={()=>this.props.changeCheckoutFormat(backend)}
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
    selectFramework: selectFramework,
    changeDisplayType: changeDisplayType,
    changeCheckoutFormat: changeCheckoutFormat
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(GuidedFrontend);