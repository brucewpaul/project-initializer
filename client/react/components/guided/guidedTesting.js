import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { taskCreation } from '../../actions/actionhelper';
import { addTesting, changeDisplayType, changeGuidedPage } from '../../actions/index';

import { Grid, Row, Col, Button, Jumbotron, PageHeader, Image } from 'react-bootstrap';

class GuidedTesting extends React.Component {

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
                  this.props.addTesting('Mocha');
                  // this.props.changeGuidedPage(testing);
                  }
                }
               block> Mocha </Button>
            </Col>
            <Col xs={3}>
              <Button
                bsStyle='danger'
                onClick={
                ()=> {
                  this.props.addTesting('Mocha');
                  // this.props.changeGuidedPage(testing);
                  }
                }
                block> Mocha </Button>
            </Col>
            <Col xs={3}>
              <Button
                bsStyle='warning'
                onClick={
                ()=> {
                  this.props.addTesting('Mocha');
                  // this.props.changeGuidedPage(testing);
                  }
                }
                block> Mocha </Button>
            </Col>
          </div>
          <div className='navButtons'>
            <Col xs={3} xsOffset={1}>
              <Button
              	bsSize='large'
              	className='navButtons'
              	onClick={()=> this.props.changeGuidedPage(taskCreation)}
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
  	addTesting: addTesting,
    changeDisplayType: changeDisplayType,
    changeGuidedPage: changeGuidedPage
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(GuidedTesting);