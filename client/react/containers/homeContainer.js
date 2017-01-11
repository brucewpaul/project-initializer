import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Grid, Row, Col, Button, Jumbotron, PageHeader, Image } from 'react-bootstrap';

import Card from '../components/parts/card';

var homepageData = {
  cards: [
    {
      name:'Guided',
      descriptions:['Thing 1', 'Thing 2', 'Thing 3'],
      button: {
        name: 'Get Started',
        link: '/guided',
        shadowType: 'guided'
      },
      xs:3,
      xsOffset: 3,
    },
    {
      name:'Advanced',
      descriptions:['Thing 1', 'Thing 2', 'Thing 3'],
      button: {
        name: 'Advanced',
        link: '/advanced',
        shadowType: 'advanced'
      },
      xs:3,
      xsOffset: 0,
    }

  ]
}

class HomePage extends React.Component {
  render() {
    return(
      <div>
      <Grid className='homepage-header' fluid>
        <h3><span>Stackbear</span> is a modular node.js application scaffolding tool.</h3>
      </Grid>
      <Grid>
        <Row className='homeButtons'>
          <Row className='homeButtons'>
            {homepageData.cards.map((card, index)=>{
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