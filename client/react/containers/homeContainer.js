import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Grid, Row, Col } from 'react-bootstrap';

import Card from '../components/parts/card';
import { home } from '../utils/cardsDesc';

class HomePage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <Grid className='homepage-header' fluid>
          <h3><span>Stackbear</span> is a modular node.js application scaffolding tool.</h3>
        </Grid>
        <Grid>
          <Row className='homeButtons'>
            <Row className='homeButtons'>
              {home.cards.map((card, index)=>{
                return (
                  <Col xs={card.xs} xsOffset={card.xsOffset} key={index}>
                    <Card card={card} key={index}/>
                  </Col>
                )
              })}
            </Row>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default HomePage;