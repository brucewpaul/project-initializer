import React from 'react';
import { Link } from 'react-router';
import { download } from '../utils/cardsDesc';
import Card from '../components/parts/card';
import NavButton from '../components/parts/navButton';
import { connect } from 'react-redux';
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
            if ( card.name !== 'Push to Github' ) {
              return (
                <Col xs={card.xs} key={index}>
                  <Card card={card} key={index}/>
                </Col>
              )
            } else if (this.props.options && this.props.options.user.userName && card.name === 'Push to Github' ) {
              return (
                <Col xs={card.xs} key={index}>
                  <Card card={card} key={index}/>
                </Col>
              )
            }
          })}
        </Row>
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

function mapStateToProps(state) {
  return {
    options: state.options,
    display: state.display
  };
}

export default connect(mapStateToProps)(DownloadContainer);
