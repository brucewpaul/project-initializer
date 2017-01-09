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
      <div>
        <div>
          <h2>Review Your Stack</h2>
          <div>
            <h4>{this.props.options.frontEnd.framework}</h4>
            <FrontendSummary/>
          </div>
          <div>
            <h4>{this.props.options.backEnd.database}</h4>
            <BackendSummary/>
          </div>
        </div>
        <Link to ='/download'>
          <Button>
            download page
          </Button>
        </Link>
      </div>
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