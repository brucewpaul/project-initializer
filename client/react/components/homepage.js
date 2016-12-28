import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectFramework } from '../actions/index';
import { Grid, Row, Col, Button, Jumbotron, PageHeader, Image } from 'react-bootstrap';


class HomePage extends React.Component {

  render() {
    return (
      <Grid>
        <PageHeader className='projectTitle'>
          Project-Initializer<br/>
          <small>Your dream project is a click away</small>
        </PageHeader>
        <Row>
          <Col xs={12} className='choiceDirections'>
            <h4>Select a frontend framework</h4>
          </Col>
        </Row>
        <Row>
          <Col xs={6} className='selector'>
            <Button
              bsStyle='primary'
              onClick={()=> this.props.selectFramework('React')}
              block>
              <h2>React</h2>
              <Image src ="https://upload.wikimedia.org/wikipedia/commons/5/57/React.js_logo.svg" className="logo"></Image>
            </Button>
          </Col>
          <Col xs={6} className='selector'>
            <Button
              bsStyle='danger'
              onClick={()=> this.props.selectFramework('Angular')}
              block>
              <h2>Angular</h2>
              <Image src ="https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg" className="logo"></Image>
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={6} xsOffset={3} className="choiceButtons">
            <Link to='/server'>
              <Button bsSize='large'>
               Database Selection
              </Button>
            </Link>
          </Col>
          <Col xs={6} xsOffset={3} className="choiceButtons">
            <Link to='/checkout'>
              <Button bsSize='large'>
               Advanced Options
              </Button>
            </Link>
          </Col>
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    options: state.options
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    selectFramework: selectFramework
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(HomePage);