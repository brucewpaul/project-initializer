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

  render() {
    return(
      <Grid className='container-wrapper'>
        <div className='guidedHeader'>
          <h4>error</h4>
        </div>
        <Row className='bottom-row'>
          <Col xs={12}>
            <p>A stack was not found. Please proceed to the front page and select the different parts of the stack you want.</p>
          </Col>
        </Row>
        <Row className='bottom-row'>
          <Col xs={4}>
            <LinkContainer to='/'>
              <Button
                className='nav-button navButton3'>
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
