import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectFramework, changeDisplayType, changeCheckoutFormat } from '../actions/index';
import { Grid, Row, Col, Button, Jumbotron, PageHeader, Image } from 'react-bootstrap';

import ProjectCart from './cartview';
import { cart } from '../actions/actionhelper';


class HomePage extends React.Component {

  componentDidMount() {
    this.props.changeCheckoutFormat(cart);
    this.props.changeDisplayType('basic');
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={8} className='choiceDirections'>
            <h4>Select a frontend framework</h4>
          </Col>
        </Row>
        <Row>
          <Col xs={4} className='selector'>
            <Button
              bsStyle='primary'
              onClick={()=> this.props.selectFramework('React')}
              block>
              <h2>React</h2>
              <Image src ="https://upload.wikimedia.org/wikipedia/commons/5/57/React.js_logo.svg" className="logo"></Image>
            </Button>
          </Col>
          <Col xs={4} className='selector'>
            <Button
              bsStyle='danger'
              onClick={()=> this.props.selectFramework('Angular')}
              block>
              <h2>Angular</h2>
              <Image src ="https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg" className="logo"></Image>
            </Button>
          </Col>
          <ProjectCart/>
        </Row>
        <Row>
          <Col xs={4} xsOffset={2} className="choiceButtons">
            <Link to='/server'>
              <Button bsSize='large'>
               Database Selection
              </Button>
            </Link>
          </Col>
          <Col xs={4} xsOffset={2} className="choiceButtons">
            <Link to='/advanced'>
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

export default connect(mapStateToProps, matchDispatchToProps)(HomePage);