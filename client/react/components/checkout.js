import React from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col, Button, Jumbotron, PageHeader, Image, ListGroup, ListGroupItem } from 'react-bootstrap';
import { selectFramework, changeDisplayType, changeCheckoutFormat } from '../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import ProjectCart from './cartview';
import { checkout,  cart } from '../actions/actionhelper';

class Checkout extends React.Component {

  componentDidMount() {
    this.props.changeCheckoutFormat(checkout);
  }

  render() {
    return (
      <Grid>
        <Row>
          <ProjectCart />
        </Row>
        <Row>
          <Col xs={6} xsOffset={3} className="choiceButtons">
            <Link to='/'>
              <Button bsSize='large'>
               Homepage Page
              </Button>
            </Link>
          </Col>
          <Col xs={6} xsOffset={3} className="choiceButtons">
            <Link to='/advanced'>
              <Button bsSize='large'>
               Advanced Options
              </Button>
            </Link>
          </Col>
          <Col xs={6} xsOffset={3} className="choiceButtons">
            <Button
              bsSize='large'
              onClick={()=> sendOptionsToServer(this.props.options)}>
              Download Project
            </Button>
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

function sendOptionsToServer(options) {
  axios.post('/build',options)
  .then((response)=>{
    window.location.assign('/bundle/' + response.data);
  }).catch((err)=>{
    console.log(err);
  })
}

export default connect(mapStateToProps, matchDispatchToProps)(Checkout);