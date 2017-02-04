import React from 'react';
import { Link, browserHistory } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { download } from '../utils/cardsDesc';
import Card from '../components/parts/card';
import NavButton from '../components/parts/navButton';
import { connect } from 'react-redux';
import { summaryNav } from '../utils/summaryDesc';
import { Grid, Row, Col, Button } from 'react-bootstrap';

class DownloadContainer extends React.Component {
  componentWillMount() {
    console.log(this.props.options)
    if ( !this.props.options.bundleId ) {
      browserHistory.push('/bundle-error');
    }
  }

  render() {
    return(
      <Grid className='container-wrapper'>
        <div className='guidedHeader'>
          <h4>Your stack has been created</h4>
        </div>
        <Row className='homeButtons flexbox-container'>
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
        <Row className='bottom-row'>
          <Col xs={4}>
            <LinkContainer to ='/'>
              <Button
                className='nav-button final-nav-btn'>
                Home
              </Button>
            </LinkContainer>
          </Col>
        </Row>
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
