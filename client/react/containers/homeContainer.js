import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Grid, Row, Col, Button, Jumbotron, PageHeader, Image } from 'react-bootstrap';

class HomePage extends React.Component {
  render() {
    return(
      <Grid>
        <Row>
          <Col xs={6} xsOffset={6}>
            <Image src='http://jamiepettisart.com/wp-content/uploads/2014/09/Wolflogo700px.png' className='homeLogo'/>
          </Col>
        </Row>
        <Row>
          <Col xs={6} xsOffset={3} className='tagline' >
            <h4>Project Initializer is a modular Node.js application scaffolding tool</h4>
          </Col>
        </Row>
        <Row className='homeButtons'>
          <Col xs={4} xsOffset={3}>
            <Link to='/guided'>
              <Button bsSize='large' >
               Guided Selection
              </Button>
            </Link>
          </Col>
          <Col xs={4} xsOffset={0}>
            <Link to='/advanced'>
              <Button bsSize='large' disabled>
               Advanced Selection
              </Button>
            </Link>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default HomePage;