import React from 'react';
import { Link } from 'react-router';
import { download } from '../utils/cardsDesc';
import Card from '../components/parts/card';
import NavButton from '../components/parts/navButton';
import { summaryNav } from '../utils/summaryDesc';
import { Grid, Row, Col, Button } from 'react-bootstrap';

class DownloadContainer extends React.Component {
  render() {
    return(
      <Grid>
        <div className='guidedHeader'>
          <h4>Your stack has been created</h4>
        </div>
        <Row className='homeButtons'>
          {download.cards.map((card, index)=>{
            return (
              <Col xs={card.xs} key={index}>
                <Card card={card} key={index}/>
              </Col>
            )
          })}
        </Row>
        <NavButton button={summaryNav.view} />
        <Link to ='/'>
          <Button
            className='final-nav-btn'>
            Home
          </Button>
        </Link>
      </Grid>
    )
  }
}

export default DownloadContainer;
