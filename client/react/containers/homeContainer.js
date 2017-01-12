import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Card from '../components/parts/card';
import { home } from '../utils/cardsDesc';

class HomePage extends React.Component {

  render() {
    return(
      <div>
        <Grid className='homepage-header' fluid>
          <h3><span>Stackbear</span> is a modular node.js application scaffolding tool.</h3>
        </Grid>
        <Grid>
          <Row className='homeButtons'>
            {home.cards.map((card, index)=>{
              return (
                <Col xs={card.xs} xsOffset={card.xsOffset} key={index}>
                  <Card card={card} key={index}/>
                </Col>
              )
            })}
          </Row>
        </Grid>
      </div>
    )
  }
}

export default HomePage;