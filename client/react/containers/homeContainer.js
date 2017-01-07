import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Grid, Row, Col, Button, Jumbotron, PageHeader, Image } from 'react-bootstrap';

class HomePage extends React.Component {
  render() {
    return(
      <div>
      <Grid className='homepage-header' fluid>
        <h3><span>Stackbear</span> is a modular node.js application scaffolding tool.</h3>
      </Grid>
      <Grid>
        <Row className='homeButtons'>
          <Col xs={3} xsOffset={3}>
            <div className='button-description'>
              <h4>Guided</h4>
              <ul>
                <li>Explore our stack creator, step by step</li>
                <li>Web developer nubs start here!</li>
              </ul>
            </div>
            <Link to='/guided'>
              <Button className='selector guided' bsSize='large' >
                Guided Selection
              </Button>
            </Link>
          </Col>
          <Col xs={3}>
            <div className='button-description'>
              <h4>Guided</h4>
              <ul>
                <li>Coming soon!</li>
                <li>Quickly create the application you want</li>
              </ul>
            </div>
            <Link to='/advanced'>
              <Button className='selector advanced' bsSize='large' disabled>
                Advanced Selection
              </Button>
            </Link>
          </Col>
        </Row>
      </Grid>
      </div>
    )
  }
}

export default HomePage;