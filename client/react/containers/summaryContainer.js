import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { selectFramework, changeDisplayType, changeCheckoutFormat } from '../actions/index';

import FrontendSummary from '../components/frontendSummary';
import BackendSummary from '../components/backendSummary';

import { Grid, Row, Col, Button, Jumbotron, PageHeader, Image } from 'react-bootstrap';

class SummaryContainer extends React.Component {
  render() {
    return(
      <Grid>
        <div className='guidedHeader'>
          <h4>Review your stack</h4>
        </div>
        <div>
          <div>
            <FrontendSummary/>
          </div>
          <div>
            <BackendSummary/>
          </div>
        </div>
        <Link to='/download'>
          <Button className='summary-download-btn'>
            Build
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

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    selectFramework: selectFramework,
    changeDisplayType: changeDisplayType,
    changeCheckoutFormat: changeCheckoutFormat
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SummaryContainer);